/**
 * qa-extract.js — Prototype 量測工具（design QA 用，不是 prototype 的一部分）
 *
 * 用途：在瀏覽器裡直接讀出目前畫面上每個元件的實際位置、尺寸與字級，
 *      換算成 Figma 的 320×693 frame units，拿來跟 Figma node 的座標比對。
 *      HTML prototype 用這種方式量測比截圖像素比對準（誤差為 0）。
 *
 * 用法（DevTools console，或自動化工具的 JS 執行介面）：
 *   eval(await (await fetch('/tools/qa-extract.js')).text());   // 載入，掛在 window.QA
 *   QA.freeze();                 // 凍結動畫再量，否則會量到動畫中的位移
 *   QA.measure();                // 目前最上層畫面的所有元件（frame units）
 *   QA.check([                   // 對照 Figma spec，直接算差值
 *     { label:'Continue', text:'Continue', x:24, y:551, w:272, h:46 },
 *   ]);
 *   QA.unfreeze();               // 量完恢復動畫
 *
 * 為什麼要 freeze / 遮擋測試：
 *   1) 有些元件帶 wiggle / float 動畫，不凍結會量出十幾 units 的假偏差。
 *   2) prototype 把多個 screen 疊在同一份 DOM，`.screen.active` 會抓到底下沒顯示的畫面，
 *      所以要用 elementFromPoint 做遮擋測試，只留真正被看到的那一層。
 */
(function () {
  const FRAME_W = 320;              // Figma artboard 寬度（見 docs/design-guidelines.md 2.1）
  const TOL = { pos: 1.0, size: 1.0, font: 0.5 };  // 量測噪音底線，不要放寬

  // 換算基準取「畫面容器的實際寬度」而不是 window.innerWidth：
  // pane 若把手機框置中在較寬的頁面上，用 innerWidth 會整組算錯。
  let _base = null;                                 // {left, top, scale}
  function base() {
    if (_base) return _base;
    const root = topLayer();
    const r = root.getBoundingClientRect();
    const w = r.width > 0 ? r.width : window.innerWidth;
    _base = { left: r.left, top: r.top, scale: FRAME_W / w };
    return _base;
  }
  const S = () => base().scale;
  const u = px => +(px * S()).toFixed(1);          // CSS px 長度 → frame unit
  const ux = px => +((px - base().left) * S()).toFixed(1);  // 視窗座標 → frame 內 x
  const uy = px => +((px - base().top) * S()).toFixed(1);   // 視窗座標 → frame 內 y

  function visible(el) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 &&
           r.right > 2 && r.left < window.innerWidth - 2 &&
           r.bottom > 2 && r.top < window.innerHeight - 2 &&
           cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
  }

  // 元件是否真的被看得到（沒有被上層畫面蓋住）。
  // 取幾個取樣點，只要有一點打到自己或自己的子孫，就算露出。
  function exposed(el) {
    const r = el.getBoundingClientRect();
    const pts = [
      [r.left + r.width / 2, r.top + r.height / 2],
      [r.left + r.width * 0.15, r.top + r.height * 0.15],
      [r.left + r.width * 0.85, r.top + r.height * 0.15],
      [r.left + r.width * 0.15, r.top + r.height * 0.85],
      [r.left + r.width * 0.85, r.top + r.height * 0.85],
    ];
    for (const [x, y] of pts) {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) continue;
      const hit = document.elementFromPoint(x, y);
      // hit.contains(el)：el 帶 pointer-events:none 時會打到祖先，這仍代表 el 露在最上層那一層裡
      if (hit && (hit === el || el.contains(hit) || hit.contains(el))) return true;
    }
    return false;
  }

  // 目前畫面最上層的容器（prototype 是多層 screen 疊著，取真正顯示的那一層的根）
  function topLayer() {
    const W = window.innerWidth, H = window.innerHeight;
    const samples = [[W / 2, H * 0.25], [W / 2, H * 0.5], [W / 2, H * 0.75]];
    let best = document.body;
    for (const [x, y] of samples) {
      let el = document.elementFromPoint(x, y);
      while (el && el !== document.body) {
        const r = el.getBoundingClientRect();
        if (r.width >= W * 0.9 && r.height >= H * 0.7) best = el;
        el = el.parentElement;
      }
    }
    return best;
  }

  function snap(el, label) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    const own = [...el.childNodes].filter(n => n.nodeType === 3)
      .map(n => n.textContent.trim()).join(' ').slice(0, 40);
    return {
      label: label || own || (el.className ? String(el.className).slice(0, 24) : el.tagName.toLowerCase()),
      tag: el.tagName.toLowerCase(),
      cls: String(el.className || '').slice(0, 32),
      txt: own,
      x: ux(r.x), y: uy(r.y), w: u(r.width), h: u(r.height),
      fs: u(parseFloat(cs.fontSize)),
      fw: cs.fontWeight,
      lh: cs.lineHeight === 'normal' ? null : u(parseFloat(cs.lineHeight)),
      radius: cs.borderRadius,
      color: cs.color,
      bg: cs.backgroundImage !== 'none' ? 'gradient' : cs.backgroundColor,
    };
  }

  const QA = {
    TOL,

    /** 重算換算基準（改過 viewport 或換頁後呼叫；freeze/measure 會自動跑） */
    reset() { _base = null; return 'base reset'; },

    /** 凍結所有動畫與 transition，量測前必跑 */
    freeze() {
      _base = null;
      if (!document.getElementById('qa-freeze')) {
        const st = document.createElement('style');
        st.id = 'qa-freeze';
        st.textContent = '*,*::before,*::after{animation-play-state:paused !important;transition:none !important}';
        document.head.appendChild(st);
      }
      document.getAnimations().forEach(a => { try { a.currentTime = 0; a.pause(); } catch (e) {} });
      return 'frozen';
    },

    /** 量完恢復動畫 */
    unfreeze() {
      const st = document.getElementById('qa-freeze');
      if (st) st.remove();
      document.getAnimations().forEach(a => { try { a.play(); } catch (e) {} });
      return 'unfrozen';
    },

    topLayer,

    /**
     * 目前畫面上所有看得到的元件（座標已換算成 frame units）
     * @param {{root?:Element, depth?:number, all?:boolean}} opts
     *        all=true 連純排版用的 wrapper 也一起列出（預設過濾掉）
     */
    measure(opts = {}) {
      _base = null;
      const root = opts.root || topLayer();
      const depth = opts.depth || 8;
      const out = [];
      (function walk(el, d) {
        if (d > depth) return;
        for (const c of el.children) {
          if (!visible(c) || !exposed(c)) continue;
          out.push(snap(c));
          walk(c, d + 1);
        }
      })(root, 0);
      const keep = opts.all ? out : out.filter(o =>
        o.txt || o.radius !== '0px' || ['img', 'svg', 'button', 'p', 'span', 'a', 'input'].includes(o.tag) || o.cls);
      return {
        root: root.id || String(root.className) || root.tagName,
        viewport: [window.innerWidth, window.innerHeight],
        scale: +S().toFixed(4),
        frozen: !!document.getElementById('qa-freeze'),
        count: keep.length,
        els: keep,
      };
    },

    /**
     * 用 selector 或文字內容抓單一元件（只找看得到的那一層）
     * @param {{sel?:string, text?:string, up?:number, label?:string}} q
     *        text 會抓到最內層那個文字元件；spec 若是外層容器（pill、卡片、標題區塊），用 up:1 / up:2 往上爬
     */
    el(q) {
      const root = topLayer();
      base();
      const bySel = q.sel ? [...root.querySelectorAll(q.sel)] : [];
      const pool = (bySel.length ? bySel : [...root.querySelectorAll('*')])
        .filter(e => visible(e) && exposed(e));
      const hit = q.text
        ? pool.find(e => e.textContent.trim().startsWith(q.text) &&
            ![...e.children].some(c => c.textContent.trim().startsWith(q.text)))
        : pool[0];
      let node = hit;
      for (let i = 0; node && i < (q.up || 0); i++) node = node.parentElement;
      return node ? snap(node, q.label) : null;
    },

    /**
     * 對照 Figma spec 算差值。
     * @param {Array<{label:string, sel?:string, text?:string, up?:number, x?:number, y?:number, w?:number, h?:number, fs?:number}>} specs
     *        座標請用 Figma 的絕對值（frame 內，320×693 座標系）
     */
    check(specs) {
      return specs.map(sp => {
        const got = QA.el(sp);
        if (!got) return { label: sp.label, status: 'NOT FOUND' };
        const row = { label: sp.label, status: 'PASS' };
        const cmp = (key, tol) => {
          if (sp[key] == null) return;
          const d = +(got[key] - sp[key]).toFixed(1);
          row[key] = `${got[key]} / ${sp[key]}`;
          if (Math.abs(d) > tol) { row[key] += ` (Δ${d > 0 ? '+' : ''}${d})`; row.status = 'FAIL'; }
        };
        cmp('x', TOL.pos); cmp('y', TOL.pos);
        cmp('w', TOL.size); cmp('h', TOL.size);
        cmp('fs', TOL.font);
        return row;
      });
    },
  };

  window.QA = QA;
  return 'QA ready — QA.freeze() / QA.measure() / QA.check([...]) / QA.unfreeze()';
})();

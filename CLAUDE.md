# YCMuse App — Claude 工作說明

> 這份檔案現在由 git 追蹤,同步給所有在這個 repo 用 Claude 工作的人(工程、PM 都算)。
> 所有實際的設計/開發規範(Icon、Figma 色彩與字型、Auto Layout、圖層命名、Status Bar 規則、Prototype 開發流程與產出標準)都在 **`docs/design-guidelines.md`**,那份文件才是共同真相來源。這份 `CLAUDE.md` 只放「Claude 在這個 repo 該遵守的協作流程規則」。

## 開始編輯前:確認要不要先讀 changelog

在對這個 repo 做任何實質編輯之前(這個 session 第一次動到這個 repo 的時候),先用 AskUserQuestion 問使用者要不要先讀一下 `docs/YCMuse_Prototype_Update_Log.docx`(最近的異動紀錄),確保接下來的改動跟最近的決定一致——尤其是可能有別人(PM 或工程)同時也在改這個 repo。使用者說要讀,就先讀完再開始做事;說不用,就直接開始,不要重複問。

## 準備 push 前:確認要不要更新 changelog

準備把這個工作階段累積的 commit 一起 push 上去之前(不是每一個 commit 都問,是整批要 push 的時候問一次),用 AskUserQuestion 問使用者:「這批改動要不要記一筆到 `docs/YCMuse_Prototype_Update_Log.docx`?」,並列出這次改到的畫面/檔案幫助使用者判斷。

- 使用者說要記:先草擬一句摘要(格式跟現有 changelog 一致——日期標題 + 畫面/類型/描述的表格),給使用者確認或修改,寫進 docx 後跟其他變更一起 commit,再 push。
- 使用者說不用:直接 push,不用再問。

## 每批 prototype 改動後：自動跑 verification

Prototype 有實質改動後，**不要直接回報「改好了」**。同一個需求的所有編輯做完、要回覆使用者之前，自動跑一次驗證，確認實作真的長成設計的樣子、流程真的走得通。（不是每編輯一個檔案就跑一次，是一批改動收尾時跑一次。）

### 驗證流程（screenshot → compare → identify → iterate）

1. **截圖**：本機 server 開著（`start-server.sh`，port 8080）的前提下，開 `http://localhost:8080/prototype/muse-prototype-vX.html`，切到這次改到的畫面截圖。
   - 優先用 Claude in Chrome（使用者 Mac 上的 Chrome）；沒連線時改用 Claude 內建瀏覽器 pane（第一次會要求授權 `http://localhost:8080`）。
   - Viewport 用手機尺寸；量測與回報一律換算成 **320×693 frame units**（見 `docs/design-guidelines.md` 2.1），不要用 dp 欄位。
   - server 沒開就先請使用者執行 `start-server.sh`，不要改用 `file://` 或把素材搬到雲端硬幹。已 push 的狀態才可以退而求其次驗 Vercel 網址。

2. **UI 比對 Figma**：用 `ui-qa-review` skill（背後 `uiqa.py` 做像素量測，不要用肉眼估）比對截圖與對應的 Figma frame。
   - 檢查四類：typography、spacing & layout、icon/image sizing、color/fill/elevation。
   - Tolerance 維持嚴格：font ±0.5、spacing ±1.0 frame unit、色差 ΔE ≤ 2.3。
   - 忽略：TEST badge 與 build/debug 標記；上游 spacing 誤差造成的下游連鎖位移（只報 size、color 這類 intrinsic 誤差）。
   - Design token 每次從當下這個 Figma 檔案解析，不要沿用別的專案的值。

3. **UX flow 比對**：對照 `docs/user-flows/`（與相關的 `docs/specs/`）實際把流程點過一遍——進入點、每一步導向、返回、狀態切換、空狀態、以及這次改動有沒有讓既有路徑斷掉。文件沒寫到的流程，就以這次需求本身的描述為準。

   - 量測工具用 `tools/qa-extract.js`（不要每次臨時寫 JS）：在頁面上跑
     `eval(await (await fetch('/tools/qa-extract.js')).text())` 載入，然後 `QA.freeze()` →
     `QA.measure()` 列出目前畫面所有元件（已換算成 frame units）或 `QA.check([{label,text|sel,up?,x,y,w,h}])`
     直接對 Figma node 座標算差值 → 量完 `QA.unfreeze()`。它已內建下面兩條前提與 tolerance。
   - 量測前先凍結動畫（注入 `animation-play-state:paused`，並把 `document.getAnimations()` 全部 pause 並歸零），否則會把動畫中的位移當成偏差。
   - 量測範圍要鎖定「畫面上最上層那一層」：prototype 是多個 screen 疊在同一個 DOM，用 `elementFromPoint` 做遮擋測試找出真正被看到的那一層，不要用 `.screen.active` 或全域 querySelector（會抓到底下沒顯示的畫面）。
   - 同一個 pattern 的整段位移（例如整塊內容一致上移 8 units）只報一次根因，不要逐個元件列。

4. **Iterate**：發現差異就直接修，修完重新截圖複驗，收斂後才回報。同一個問題最多來回 3 輪；還收不掉就停下來，把量測結果和卡點講清楚問使用者。

### 回報方式

只在對話裡給摘要：這次驗了哪些畫面、通過幾項、剩下哪些差異（含量測數字）、哪些已經順手修掉。**不要自動產生報告檔或標註圖存進 repo**；使用者明確要求時才輸出完整 markdown 報告或 annotated 截圖。

## 給 Claude 的其他提醒

1. 做任何 UI / Figma / Prototype 相關的工作前,先讀 `docs/design-guidelines.md`,照裡面的規範走,不要自己另外定義色值、字型或 icon 來源。
2. `docs/` 底下是 PM 可能同時在編輯的文件區(`prd/`、`user-flows/`、`specs/`);改動這裡的檔案時要留意是不是跟 PM 正在寫的內容衝突。
3. Prototype 實際檔案在 `/prototype`(`muse-prototype-v1.html`、`muse-prototype-v2.html`),素材在 `/assets`,都是用檔案系統相對路徑互相參照,搬動檔案位置前要確認路徑不會斷掉。網站部署在 Vercel,`vercel.json` 裡有把舊的 root-level 網址(`/muse-prototype-v1.html`、`/muse-prototype-v2.html`)rewrite 到 `/prototype/` 底下,新增/搬動 prototype 檔案時記得檢查這份 rewrite 設定還對不對。
4. `backup/`、`code-snippets/` 是舊版本/片段的暫存區,不是 PM 或設計要看的地方。

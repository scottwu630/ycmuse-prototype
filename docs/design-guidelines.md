# YCMuse App — 設計與開發規範

這份文件是 UI / Figma / Prototype 開發規範的共同真相來源，工程、設計、PM 都可以參考。
（Claude 專屬的工作說明放在 repo 根目錄的 `CLAUDE.md`，該檔案不進版控，只是本機的 Claude 設定，實際規範內容都在這裡。）

---

## 1. Icon 規範

**禁止**在任何 UI 元件（Button、Header、Nav Bar、Tab Bar、List Item、Toast/Snackbar、Alert/Banner、Badge、Notification、Card、Modal/Dialog、Bottom Sheet、Sidebar、Accordion、Input、Select、Checkbox/Radio、Toggle、Breadcrumb、Pagination、Stepper、Status Indicator、Empty State、Tooltip、Chip/Tag、FAB、Avatar、Menu 等）中使用 Emoji 作為圖示。所有圖示必須使用 SVG 或套用 Icon 類別。

**唯一例外**：image / video placeholder 在指定路徑資料夾中找不到可用檔案時，才可用 Emoji 替代。

Icon 庫一律使用 [Supericons](https://supericons.run.tools)。

---

## 2. Figma 設計規範

### 2.1 Mobile UI 尺寸

所有 Figma Mobile Screen Frame 一律使用 **320 × 693 px**，禁止使用 390 × 844（iPhone 14 原始尺寸）或其他尺寸。

### 2.2 Design System 套用原則

若專案已建立 Design System（位於 UI Components 頁面），必須優先套用，不得自行定義數值。

**顏色（Color）— Figma 來源：`Guideline_YCM` 檔案 node `30-2`**

Neutral / Dark 灰階（12 步）：

| Figma Token | 色值 | CSS 變數 | 語意用途 |
|---|---|---|---|
| Neutral/Dark/04 | `#09090B` | `--n04` / `--bg` | 全域背景 |
| Neutral/Dark/09 | `#151519` | `--n09` / `--card` | Card 背景 |
| Neutral/Dark/14 | `#212127` | `--n14` / `--card-2` | 次層 Card / Sheet |
| Neutral/Dark/24 | `#383842` | `--n24` | 分隔線、次要邊框 |
| Neutral/Dark/34 | `#50505E` | `--n34` | Disabled 狀態 |
| Neutral/Dark/44 | `#676779` | `--n44` / `--text-disabled` | 停用文字 |
| Neutral/Dark/54 | `#808093` | `--n54` | 佔位文字 |
| Neutral/Dark/64 | `#9C9CAB` | `--n64` / `--text-muted` | 次要說明文字 |
| Neutral/Dark/74 | `#B7B7C2` | `--n74` | 輔助文字 |
| Neutral/Dark/84 | `#D3D3D9` | `--n84` | 標題輔助 |
| Neutral/Dark/89 | `#E1E1E5` | `--n89` / `--text-2` | 次要標題文字 |
| Neutral/Dark/94 | `#EEEEF1` | `--n94` | |
| Neutral/Dark/100 | `#FFFFFF` | `--n100` / `--text` | 主要文字 |

Accent 強調色：

| Figma Token | 色值 | CSS 變數 |
|---|---|---|
| color/accent/purple | `#A855F7` | `--accent` |
| color/accent/pink | `#EC4899` | `--pink` |
| color/accent/blue | `#38BDF8` | `--blue` |
| color/accent/gold | `#F59E0B` | `--gold` |
| color/accent/orange | `#F97316` | `--orange` |

系統 / 狀態色：

| Figma Token | 色值 | CSS 變數 | 用途 |
|---|---|---|---|
| color/status/error | `#EF4444` | `--red` | 錯誤、危險 |
| YCV_premium | `#FFA614` | `--premium` | Premium 功能標記 |
| — | `#22C55E` | `--green` | 成功狀態 |

Border（透明度疊加）：

| CSS 變數 | 色值 | 用途 |
|---|---|---|
| `--border` | `rgba(255,255,255,0.15)` | 主要邊框（Card、Sheet） |
| `--border-2` | `rgba(255,255,255,0.08)` | 次要邊框 |
| `--border-3` | `rgba(255,255,255,0.06)` | 微妙分隔線 |

Gradient（漸層）：

| CSS 變數 | 定義 | 用途 |
|---|---|---|
| `--mv-grad` | `linear-gradient(135deg, #6D28D9 0%, #A855F7 50%, #EC4899 100%)` | MV 相關元件主色 |
| `--song-grad` | `linear-gradient(135deg, #1E3A5F 0%, #1A6B8A 100%)` | Song 相關元件主色 |

**字型（Typography）— 字體一律使用 Inter**

15 個型別樣式，全部有對應 CSS utility class（prototype 使用 `class="t-xxx"`）：

| Figma 樣式 | 大小 | 字重（數值） | Line Height | Letter Spacing | CSS Class |
|---|---|---|---|---|---|
| Display | 42px | Extra Bold (800) | 50px | -1px | `.t-display` |
| Title/L | 30px | Extra Bold (800) | 36px | -1px | `.t-title-l` |
| Title/M | 26px | Bold (700) | 32px | -1px | `.t-title-m` |
| Headline | 20px | Bold (700) | 26px | -1px | `.t-headline` |
| Section | 17px | Bold (700) | 22px | -1px | `.t-section` |
| Title/S | 17px | Bold (700) | 22px | 0px | `.t-title-s` |
| Body/L | 17px | Medium (500) | 22px | 0px | `.t-body-l` |
| Title/XS | 15px | Bold (700) | 18px | 0px | `.t-title-xs` |
| Body/M | 14px | Medium (500) | 20px | -1px | `.t-body-m` |
| Label/M | 13px | Bold (700) | 18px | -1px | `.t-label-m` |
| Body/S | 12px | Medium (500) | 16px | 0px | `.t-body-s` |
| Label/S | 12px | **Semi Bold (600)** | 15px | -1px | `.t-label-s` |
| Caption/M | 11px | Medium (500) | 16px | -1px | `.t-cap-m` |
| Body/XS | 9px | Medium (500) | 11px | -1px | `.t-body-xs` |
| Caption/S | 9px | Bold (700) | 11px | 0px | `.t-cap-s` |

> 注意：Label/S 字重為 **Semi Bold (600)**，不是 Medium (500)。這是常見錯誤點。

新增頁面或元件時，直接使用 CSS 變數或 utility class，禁止硬編碼色值或字型數值：

```html
<div style="background: var(--card); border: 1px solid var(--border);">
  <p style="color: var(--text-muted);">說明文字</p>
</div>
<h1 class="t-title-l" style="color: var(--text);">標題</h1>
<p class="t-body-m" style="color: var(--text-muted);">內文</p>
<span class="t-label-s" style="color: var(--accent);">標籤</span>
```

UI Components 優先從 Figma Design System 複製/實例化現有元件（Button/Pill、TabBar、NavBar、Card、Badge、List Item 等），勿重新繪製。

### 2.3 Auto Layout

Frame 內的所有圖層必須套用 Auto Layout：容器（NavBar、Card、Row、Sheet 等）一律使用 Auto Layout Frame，不可使用絕對定位子圖層堆疊；設定適當的 direction（Horizontal / Vertical）、spacing、padding；文字與內容尺寸優先使用 Hug contents，可延展區域使用 Fill container。

### 2.4 圖層命名規範

圖層名稱必須有語意，反映元件用途，禁止使用預設名稱（Frame 1、Rectangle 2 等）：

| 類型 | 命名範例 |
|---|---|
| 畫面 | `Explore — Home`、`AI Song — Feature Room` |
| NavBar | `NavBar / Home`、`NavBar / Back + Title` |
| 卡片 | `Card / Song`、`Card / MV Thumbnail` |
| 列表列 | `Row / Song Item`、`Row / MV Item` |
| 按鈕 | `Button / Primary — Create`、`Button / Ghost — Cancel` |
| 圖示 | `Icon / ic_arrow_left`、`Icon / ic_credit` |
| 區塊 | `Section / New MVs`、`Section / Top Picks` |
| 背景 | `BG / Gradient`、`BG / Blur Overlay` |

命名格式：`類別 / 描述`（使用斜線分層），保持英文，首字大寫。

### 2.5 Mobile Prototype — Status Bar 顯示規則

Mobile View（手機預覽）：Status Bar 必須隱藏，不占版面。
Desktop View（桌面預覽）：Status Bar 可顯示，作為設計參考用途。

```css
.status-bar { display: none; }
@media (min-width: 768px) {
  .status-bar { display: flex; }
}
```

Figma 中 Status Bar 圖層命名為 `Status Bar`，設為可選顯示（不影響 Frame 高度），不計入 693px 內容高度。

---

## 3. Prototype 開發流程

實際的 prototype HTML 檔案放在 `/prototype`（例如 `muse-prototype-v1.html`、`muse-prototype-v2.html`），媒體素材放在 `/assets`。

每個 prototype HTML 檔案對應一個獨立的 QR HTML 頁面（放在 repo 根目錄，不將 QR code 嵌入 prototype 本身）。新增 prototype 時，必須同時完成：

1. 建立對應的 `qr-xxx.html` 頁面（放在根目錄，`TARGET` 指向 `prototype/muse-prototype-xxx.html`）
2. 更新 `start-server.sh`，加入新 prototype 的 QR 頁面連結

命名規則：

| Prototype 檔案 | 對應 QR 頁面 |
|---|---|
| `prototype/muse-prototype-v2.html` | `qr-v2.html` |
| `prototype/muse-prototype-v1.html` | `qr-v1.html` |
| `prototype/muse-prototype-xxx.html` | `qr-xxx.html` |

運作原理：QR code 編碼區網 HTTP URL（如 `http://192.168.x.x:8080/...`），手機才能連線，`file://` 路徑無法存取。

1. 執行 `start-server.sh` 啟動本機 HTTP server（port 8080，綁定 `0.0.0.0`，serve 整個 repo 根目錄）
2. Script 用 `ipconfig` 取得 Mac 區網 IP，以 `?host=IP:PORT` 帶入 QR 頁面 URL
3. 桌面瀏覽器開啟對應 QR 頁面（如 `http://localhost:8080/qr-v2.html?host=192.168.x.x:8080`）
4. QR 頁面讀取 `?host=` 參數，組出 `http://IP:PORT/` + `TARGET`（`TARGET` 是相對 repo 根目錄的路徑，例如 `prototype/muse-prototype-v2.html`）產生正確 QR code
5. 手機掃描 QR code，與 Mac 在同一 Wi-Fi 下即可開啟 prototype

QR 頁面標準實作（只需修改 `var TARGET = '...'` 這一行，填入對應的 prototype 相對路徑）：

```html
<script>
var TARGET = 'prototype/muse-prototype-XXXX.html'; // ← 替換為對應的 prototype 檔名
function go(host){
  var url = location.protocol + '//' + host + '/' + TARGET;
  renderQR(url);
}
</script>
```

---

## 4. 產出標準

1. 當需要圖示時，請至 Supericons 找到對應的 SVG icon。
2. 確保視覺風格乾淨、現代化，並符合設計系統規範。
3. 新增 Figma Screen 前，先確認目標頁面既有 Frame 的排列方式，對齊放置。
4. 所有 Figma Frame 在建立後，需截圖確認視覺正確後才算完成。

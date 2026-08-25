# YCMuse App — Component Library

這份文件把 Figma（`Guideline_YCM`,「UI Components - Mobile」頁）裡實際存在的元件與 variant/state 組合列出來，是跨團隊共用的規格參考：PM 寫 PRD/spec 時可以直接引用元件名稱與狀態，RD（目前是 Flutter）實作時對照這份知道要做哪些 variant，維護 prototype 的人也照這份對。

**這份文件記錄的是設計決策（元件、variant、尺寸），不是任何特定技術的實作方式** —— 不會出現 CSS class 或 HTML 結構，Flutter 端請自行用 widget 實作，不用照抄 prototype 的寫法。顏色、字型 token 已經在 [`design-guidelines.md`](./design-guidelines.md) 裡定義過，這裡的元件都是用那份文件的 token，不重複列。

> 每個元件的「用途」是根據 Figma 元件命名與 variant 組合推測出來的，不是設計稿上的官方說明——如果跟實際設計意圖有出入，請以 Figma 或設計師的說明為準，也歡迎直接改這份文件。
> Dimensions 是 Figma 裡該 variant 範例圖層的寬高，不代表元件在所有情境下都固定這個尺寸（例如 List Item 寬度通常會撐滿螢幕寬度）。

---

## Buttons

### Button/Pill
**用途**：主要的文字按鈕元件，依尺寸（Large / Medium / Small）與視覺層級（Primary / Primary - PAYG / Secondary / Tertiary / Ghost）提供多種樣式，並依互動狀態（Active / Disable）呈現對應外觀。「Primary - PAYG」目前只在 Large 尺寸出現，推測是按次付費（Pay-As-You-Go）情境專用的按鈕樣式。

**Variants**：

| Size | Type | State | Dimensions (W×H) |
|---|---|---|---|
| Large | Primary | Active | 180×44 |
| Large | Primary | Disable | 180×44 |
| Large | Primary - PAYG | Active | 180×44 |
| Large | Primary - PAYG | Disable | 180×44 |
| Large | Secondary | Active | 180×44 |
| Large | Secondary | Disable | 180×44 |
| Large | Tertiary | Active | 180×44 |
| Large | Tertiary | Disable | 180×44 |
| Large | Ghost | Active | 180×44 |
| Large | Ghost | Disable | 180×44 |
| Medium | Primary | Active | 109×40 |
| Medium | Primary | Disable | 109×40 |
| Medium | Secondary | Active | 109×40 |
| Medium | Secondary | Disable | 109×40 |
| Medium | Tertiary | Active | 109×40 |
| Medium | Tertiary | Disable | 109×40 |
| Medium | Ghost | Active | 109×40 |
| Medium | Ghost | Disable | 109×40 |
| Small | Primary | Active | 73×27 |
| Small | Primary | Disable | 73×27 |
| Small | Secondary | Active | 73×27 |
| Small | Secondary | Disable | 73×27 |
| Small | Tertiary | Active | 73×27 |
| Small | Tertiary | Disable | 73×27 |
| Small | Ghost | Active | 73×27 |
| Small | Ghost | Disable | 73×27 |

### Button/Circular
**用途**：通用的圓形圖示按鈕，依尺寸（Large / Medium / Small / XSmall）與視覺層級（Primary / Secondary / Tertiary / Ghost）提供多種樣式，並依互動狀態（Active / Hover / Disable）呈現對應外觀，常見於工具列或卡片上的圖示型動作（例如播放、更多選項）。

**Variants**：

| Size | Type | State | Dimensions (W×H) |
|---|---|---|---|
| Large | Primary / Secondary / Tertiary / Ghost | Active / Hover / Disable | 56×56 |
| Medium | Primary / Secondary / Tertiary / Ghost | Active / Hover / Disable | 36×36 |
| Small | Primary / Secondary / Tertiary / Ghost | Active / Hover / Disable | 28×28 |
| XSmall | Primary / Secondary / Tertiary / Ghost | Active / Hover / Disable | 20×20 |

> 四個尺寸 × 四種視覺層級 × 三種狀態，共 48 組合，尺寸只跟 Size 有關，故合併顯示。

---

## Cards

### Card
**用途**：首頁 / 探索頁等列表中呈現單首歌曲或單部影片的縮圖卡片，依內容類型（Video / Song）與是否加入社群曝光（Community）呈現不同版式（Community On 時卡片變高，推測是多顯示了創作者資訊或互動數據列）。

**Variants**：

| Type | Community | Dimensions (W×H) |
|---|---|---|
| Video | Off | 110×147 |
| Video | On | 110×184 |
| Song | Off | 110×146 |
| Song | On | 110×147 |

### Card/Subscription
**用途**：訂閱方案選擇畫面，以清單或卡片兩種形式呈現不同訂閱方案，並依是否被選中呈現對應樣式。

**Variants**：

| Type | State | Dimensions (W×H) |
|---|---|---|
| List | Selected | 288×54 |
| List | Normal | 288×54 |
| Card | Selected | 130×160 |
| Card | Normal | 130×160 |

> Figma 圖層裡 Card/Selected 目前命名為「Selecte」（少了 d），可能是設計檔的打字誤植，值得請設計端確認/修正。

### Card/Credit
**用途**：付款方式（信用卡）選擇畫面，提供兩種卡片外觀樣式（Card A、Card B）以及清單樣式，並依是否被選中呈現對應狀態。

**Variants**：

| Type | State | Dimensions (W×H) |
|---|---|---|
| Card A | Selected | 139×88 |
| Card A | Normal | 139×88 |
| Card B | Selected | 130×160 |
| Card B | Normal | 130×160 |
| List | Selected | 288×54 |
| List | Normal | 288×54 |

---

## Navigation / Bars

### Bar/NavBar
**用途**：畫面頂端的導覽列，依層級（1st Layer＝主頁籤入口、2nd Layer＝次頁返回）與是否結合分頁（+Tab）、是否透明背景呈現不同版式。

**Variants**：

| Type | Dimensions (W×H) |
|---|---|
| 1st Layer | 318×90 |
| 1st Layer + Tab | 318×122 |
| 2nd Layer | 318×90 |
| 2nd Layer - Transparent | 318×90 |
| 2nd Layer +Tab | 318×130 |

### Bar/TabBar
**用途**：畫面底部的分頁導覽列，依目前選中的頁籤（首頁、歷史）切換顯示狀態。

**Variants**：

| State | Dimensions (W×H) |
|---|---|
| Home | 320×66 |
| History | 320×66 |

### Bar/Tabs
**用途**：畫面內的分頁列（水平 Tab），4 個 Tab 版本推測代表分頁數量或目前作用中的分頁位置不同的排列。

**Variants**：

| State | Dimensions (W×H) |
|---|---|
| Tab 1 | 320×26 |
| Tab 2 | 320×26 |
| Tab 3 | 320×26 |
| Tab 4 | 320×26 |

### Bar/song-player
**用途**：音樂播放列元件，推測顯示於畫面底部作為 mini player，依播放狀態（Playing / Pause）切換對應外觀。

**Variants**：

| State | Dimensions (W×H) |
|---|---|
| Playing | 320×43 |
| Pause | 320×43 |

---

## Lists & Inputs

### List/List Item
**用途**：列表中呈現單筆項目，依是否含縮圖、文字行數與是否有操作按鈕組合出不同版式，並可透過 Community 開關控制是否顯示社群相關的額外元素。

**Variants**：

| Type | Community | Dimensions (W×H) |
|---|---|---|
| Thumb + 3 lines | On | 320×77 |
| Thumb + 3 lines | Off | 320×77 |
| Thumb + 2 lines + Button | Off | 320×60 |
| Thumb + 2 lines + Button | On | 320×62 |
| Thumb + 2 lines | Off | 320×60 |
| Thumb + 2 lines | On | 320×60 |
| 2 Lines | Off | 320×60 |
| 1 Line | Off | 320×60 |
| Option | Off | 320×40 |

### List/Section Header
**用途**：列表區塊前方的分區標題，標示各群組內容的區段名稱。

**Variants**：

| Dimensions (W×H) |
|---|
| 320×30 |

### List/Input
**用途**：表單中的文字輸入欄位，依單行或多行區分 Type，並依尚未輸入、聚焦中、輸入中、已輸入、處理中、停用等不同狀態呈現對應外觀。

**Variants**：

| Type | State | Dimensions (W×H) |
|---|---|---|
| Multi-line | Placeholder | 288×158 |
| Multi-line | On Focus | 288×158 |
| Multi-line | Typing | 288×158 |
| Multi-line | Typed | 288×158 |
| Multi-line | Processing | 288×158 |
| Multi-line | Disable | 288×126 |
| 1 Line | Placeholder | 288×92 |
| 1 Line | On Focus | 288×92 |
| 1 Line | Typing | 288×92 |
| 1 Line | Typed | 288×92 |
| 1 Line | Disable | 288×92 |

---

## Selection Controls

### Selection/Toggle
**用途**：各類選取控制元件的集合，依 Control 屬性提供按讚（Like）、開關（Toggle）、單選（Radio）、多選（Checkbox）四種控制型態，並以 State 表示開啟（On）或關閉（Off）狀態。

**Variants**：

| Control | State | Dimensions (W×H) |
|---|---|---|
| Like | On | 24×24 |
| Like | Off | 24×24 |
| Toggle | On | 44×24 |
| Toggle | Off | 44×24 |
| Radio | On | 24×24 |
| Radio | Off | 24×24 |
| Checkbox | On | 24×24 |
| Checkbox | Off | 24×24 |

### Selection/Chip
**用途**：可選取的篩選／標籤晶片（Chip），依是否已選取呈現對應樣式。

**Variants**：

| State | Dimensions (W×H) |
|---|---|
| Selected | 71×27 |
| Enable（未選取） | 59×27 |

---

## Feedback & Overlays

### Badge
**用途**：疊加在內容卡片或列表項目上的狀態標籤，一類是行銷提示（New / Sale / Popular / Hot，還有 Purple / Gold 兩個通用色版），另一類是生成任務的處理狀態（Processing / Done / Failed）。

**Variants**：

| Status | Dimensions (W×H) |
|---|---|
| Purple | 79×20 |
| Gold | 79×20 |
| New | 34×15 |
| Sale | 52×15 |
| Popular | 56×15 |
| Hot | 32×15 |
| Processing | 80×18 |
| Done | 46×18 |
| Failed | 49×18 |

### Popup/Toast
**用途**：任務進度提示的彈出通知，依內容類型（MV / Song / Storyboard / Common）與狀態（In Progress / Completed）呈現對應樣式，通常用於背景生成任務完成/進行中的提示。

**Variants**：

| Type | State | Dimensions (W×H) |
|---|---|---|
| MV | In Progress | 300×58 |
| MV | Completed | 300×58 |
| Song | In Progress | 300×58 |
| Song | Completed | 300×58 |
| Storyboard | In Progress | 300×58 |
| Storyboard | Completed | 300×58 |
| Common | Completed | 134×50 |
| Common | Completed | 300×68 |

### Popup/Tooltips
**用途**：在特定元件旁顯示簡短提示或說明文字，依是否可互動（Interactive / Default）與指標方向（Up / Down）呈現不同外觀。

**Variants**：

| Type | Pointer | Dimensions (W×H) |
|---|---|---|
| Interactive | Down | 200×113 |
| Interactive | Up | 200×113 |
| Default | Down | 200×73 |
| Default | Up | 200×73 |

### Popup/Options Menu
**用途**：底部彈出的選項選單（bottom sheet），內含標題列、CTA 按鈕與可捲動的選項清單（對應 `docs/specs/history-option-menu-spec.md` 裡 History 頁使用的那種選單）。

**Variants**：

| Dimensions (W×H) |
|---|
| 320×318 |

### Popup/Dialog - Fullscreen
**用途**：全螢幕彈出對話框，供使用者設定較複雜的參數後確認建立（例如生成影片前的設定畫面）。

**Variants**：

| Type | Dimensions (W×H) |
|---|---|
| Fullscreen | 320×432 |

### Popup/Dialog - Basic
**用途**：一般用途的彈出對話框（確認、警示、提示訊息），依是否附加圖示分為兩種樣式。

**Variants**：

| Icon | Dimensions (W×H) |
|---|---|
| Off | 288×153 |
| On | 288×225 |

---

## Media & Profile

### Control/Media Controller
**用途**：影音播放的進度條元件，State 目前只記錄了 0% / 50% / 100% 三個進度示意，實際使用時進度應為連續值而非固定檔點。

**Variants**：

| Status | Dimensions (W×H) |
|---|---|
| 0% | 300×36 |
| 50% | 300×36 |
| 100% | 300×36 |

### Profile_img
**用途**：使用者頭像，依是否已上傳圖片、是否顯示姓名縮寫或預設圖示區分為三種狀態。

**Variants**：

| State | Dimensions (W×H) |
|---|---|
| Image | 54×54 |
| Initial（姓名縮寫） | 54×54 |
| Icon（預設圖示） | 54×54 |

---

## 範圍外 / 尚未涵蓋

- Figma「UI Components - Desktop」頁：**刻意不列入**，那一頁是另一個 Web project 用的元件，跟 YCMuse App（手機端）無關。
- 「🎨 Design System」frame 裡個別 icon / spacing token 還沒有逐一列進這份文件；如果之後需要，可以再擴充。

這份文件是某個時間點對 Figma 的快照，Figma 元件如果之後新增/改名，記得回來更新對應章節。

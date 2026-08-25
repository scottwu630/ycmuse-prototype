# YCMuse App — Docs

這個資料夾是 PM / 設計 / 工程共用的文件區，跟 `/prototype`（實際 HTML 原型）和 `/assets`（素材）分開放，方便 PM 直接在這裡編輯，不需要碰到程式碼。

- `prd/` — 功能 PRD。一個功能一個檔案，例如 `mv-generation-v2.md`。
- `user-flows/` — User flow 文件。若該流程在 Figma 也有對應的流程圖，請在檔案開頭附上 Figma 連結，這裡的文字版當作可搜尋、可留評論的版本。
- `specs/` — 詳細功能規格（畫面 × 狀態的行為表，給工程對照實作用），例如 `history-option-menu-spec.md`。
- `design-guidelines.md` — Figma / UI 設計系統規範（顏色、字型、Icon、命名規則、Prototype 開發流程），工程與設計都照這份走。
- `components.md` — 元件庫：Figma 裡實際存在的元件與 variant/state/尺寸列表（Button、Card、NavBar、TabBar、Badge、List Item 等）。寫 PRD/spec 時可以直接引用這裡的元件名稱；RD（Flutter）實作時也照這份對照要做哪些 variant，跟技術/語法無關。
- `YCMuse_Prototype_Update_Log.docx` — 逐日期的 prototype 更新紀錄（Word 檔）。

## 其他資料夾

- `/prototype` — 目前的 HTML 原型（v1、v2）。
- `/assets` — icon、圖片、歌曲、影片等素材。
- `/backup`、`/code-snippets` — 開發過程的舊版本/片段，不影響上述文件區，可以忽略。

## 本機預覽原型

雙擊根目錄的 `🚀 Start Mobile Test.sh`，或執行 `./start-server.sh`，就能在手機上用 QR code 掃描預覽最新原型。

## 跟其他人共同編輯：changelog 對齊習慣

repo 根目錄的 `CLAUDE.md`（有進版控，clone 就會拿到）讓任何人用 Claude 編輯這個 repo 時都會：

1. 開始改東西前，Claude 會先問要不要讀一下 `docs/YCMuse_Prototype_Update_Log.docx`，確認手上要做的事跟別人最近的改動沒有衝突。
2. 準備 push 前，Claude 會問這批改動要不要記一筆進 changelog。

如果沒有用 Claude、直接手動編輯，麻煩照同樣的習慣：開始前看一下 changelog 最新幾筆，改完準備 push 前自己補一筆——這樣不管是誰、用什麼工具編輯，大家看到的異動紀錄都是同一份，才不會兩邊資訊對不齊。

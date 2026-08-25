# YCMuse App — Docs

這個資料夾是 PM / 設計 / 工程共用的文件區，跟 `/prototype`（實際 HTML 原型）和 `/assets`（素材）分開放，方便 PM 直接在這裡編輯，不需要碰到程式碼。

- `prd/` — 功能 PRD。一個功能一個檔案，例如 `mv-generation-v2.md`。
- `user-flows/` — User flow 文件。若該流程在 Figma 也有對應的流程圖，請在檔案開頭附上 Figma 連結，這裡的文字版當作可搜尋、可留評論的版本。
- `specs/` — 詳細功能規格（畫面 × 狀態的行為表，給工程對照實作用），例如 `history-option-menu-spec.md`。
- `design-guidelines.md` — Figma / UI 設計系統規範（顏色、字型、Icon、命名規則、Prototype 開發流程），工程與設計都照這份走。
- `YCMuse_Prototype_Update_Log.docx` — 逐日期的 prototype 更新紀錄（Word 檔）。

## 其他資料夾

- `/prototype` — 目前的 HTML 原型（v1、v2）。
- `/assets` — icon、圖片、歌曲、影片等素材。
- `/backup`、`/code-snippets` — 開發過程的舊版本/片段，不影響上述文件區，可以忽略。

## 本機預覽原型

雙擊根目錄的 `🚀 Start Mobile Test.sh`，或執行 `./start-server.sh`，就能在手機上用 QR code 掃描預覽最新原型。

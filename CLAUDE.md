# YCMuse App — Claude 工作說明

> 這份檔案現在由 git 追蹤,同步給所有在這個 repo 用 Claude 工作的人(工程、PM 都算)。
> 所有實際的設計/開發規範(Icon、Figma 色彩與字型、Auto Layout、圖層命名、Status Bar 規則、Prototype 開發流程與產出標準)都在 **`docs/design-guidelines.md`**,那份文件才是共同真相來源。這份 `CLAUDE.md` 只放「Claude 在這個 repo 該遵守的協作流程規則」。

## 開始編輯前:確認要不要先讀 changelog

在對這個 repo 做任何實質編輯之前(這個 session 第一次動到這個 repo 的時候),先用 AskUserQuestion 問使用者要不要先讀一下 `docs/YCMuse_Prototype_Update_Log.docx`(最近的異動紀錄),確保接下來的改動跟最近的決定一致——尤其是可能有別人(PM 或工程)同時也在改這個 repo。使用者說要讀,就先讀完再開始做事;說不用,就直接開始,不要重複問。

## 準備 push 前:確認要不要更新 changelog

準備把這個工作階段累積的 commit 一起 push 上去之前(不是每一個 commit 都問,是整批要 push 的時候問一次),用 AskUserQuestion 問使用者:「這批改動要不要記一筆到 `docs/YCMuse_Prototype_Update_Log.docx`?」,並列出這次改到的畫面/檔案幫助使用者判斷。

- 使用者說要記:先草擬一句摘要(格式跟現有 changelog 一致——日期標題 + 畫面/類型/描述的表格),給使用者確認或修改,寫進 docx 後跟其他變更一起 commit,再 push。
- 使用者說不用:直接 push,不用再問。

## 給 Claude 的其他提醒

1. 做任何 UI / Figma / Prototype 相關的工作前,先讀 `docs/design-guidelines.md`,照裡面的規範走,不要自己另外定義色值、字型或 icon 來源。
2. `docs/` 底下是 PM 可能同時在編輯的文件區(`prd/`、`user-flows/`、`specs/`);改動這裡的檔案時要留意是不是跟 PM 正在寫的內容衝突。
3. Prototype 實際檔案在 `/prototype`(`muse-prototype-v1.html`、`muse-prototype-v2.html`),素材在 `/assets`,都是用檔案系統相對路徑互相參照,搬動檔案位置前要確認路徑不會斷掉。網站部署在 Vercel,`vercel.json` 裡有把舊的 root-level 網址(`/muse-prototype-v1.html`、`/muse-prototype-v2.html`)rewrite 到 `/prototype/` 底下,新增/搬動 prototype 檔案時記得檢查這份 rewrite 設定還對不對。
4. `backup/`、`code-snippets/` 是舊版本/片段的暫存區,不是 PM 或設計要看的地方。

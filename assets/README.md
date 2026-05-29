# YouCam Muse — Asset Library

把 Figma 匯出的資產放到對應資料夾後，告訴 Claude「幫我把 assets 替換進 prototype」即可自動更新。

---

## 資料夾結構

```
assets/
├── images/
│   ├── onboarding/          # Onboarding 頁面背景圖 / 插圖
│   ├── mv-styles/           # MV 風格卡片縮圖（Singing, Storytelling, Hybrid）
│   ├── character-photos/    # 用戶角色照片
│   │   └── samples/         # 內建示範人臉（Sample Photos）
│   ├── album-art/           # 歌曲封面圖
│   ├── storyboard/          # 分鏡縮圖（Scene 1, 2, 3...）
│   ├── mv-results/          # MV 完成頁的預覽封面
│   └── explore/             # Explore 頁的 Banner / Template 縮圖
│
├── videos/
│   ├── mv-preview/          # MV 結果頁播放用的短片
│   ├── storyboard-clips/    # 每個 Scene 的預覽片段
│   └── sample-mvs/          # New MVs / Top Picks 的示範 MV
│
└── icons/
    ├── app/                 # App Icon（1024×1024 + 各尺寸）
    ├── tab-bar/             # 底部導覽列圖示（Explore, History, Create）
    ├── mv-styles/           # MV 風格圖示（🎤 🎬 ✨ 向量版）
    ├── ui/                  # 通用 UI 圖示（crown, coin, settings...）
    └── social/              # 分享平台圖示（TikTok, IG, YouTube...）
```

---

## 命名規範

### Images
| 用途 | 命名格式 | 範例 |
|------|---------|------|
| MV 風格卡片 | `mv-style-[name].[ext]` | `mv-style-singing.jpg` |
| 分鏡縮圖 | `sb-scene-[n].[ext]` | `sb-scene-1.jpg` |
| 示範人臉 | `sample-face-[n].[ext]` | `sample-face-1.jpg` |
| 封面 / 專輯圖 | `album-[song-slug].[ext]` | `album-golden-hour.jpg` |
| Explore Banner | `banner-[n].[ext]` | `banner-1.jpg` |

### Videos
| 用途 | 命名格式 | 範例 |
|------|---------|------|
| MV 預覽 | `mv-preview-[slug].[ext]` | `mv-preview-cinematic.mp4` |
| 分鏡片段 | `sb-clip-scene-[n].[ext]` | `sb-clip-scene-1.mp4` |
| 示範 MV | `sample-mv-[n].[ext]` | `sample-mv-1.mp4` |

### Icons
| 用途 | 命名格式 | 尺寸 |
|------|---------|------|
| App Icon | `app-icon-[size].png` | 1024, 512, 256, 128 |
| Tab Bar | `tab-[name].[ext]` | 48×48 @2x SVG/PNG |
| MV 風格 | `icon-style-[name].[ext]` | 64×64 SVG |
| UI 通用 | `icon-[name].[ext]` | 24×24 / 48×48 SVG |

---

## 支援格式
- **Images** → `.jpg` `.png` `.webp`
- **Videos** → `.mp4` (H.264, max 720p for prototype)
- **Icons** → `.svg` 優先，`.png` 備用

---

## 使用方式
1. 將 Figma 匯出的資產放到對應資料夾
2. 告訴 Claude：「幫我把 `assets/images/mv-styles/` 裡的圖片替換進 prototype」
3. Claude 會自動更新 `muse-prototype.html` 中對應的 emoji / 漸層 placeholder

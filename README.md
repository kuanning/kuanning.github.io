<!--
# KuanNing Chang — Personal Portfolio

A bilingual (English / Traditional Chinese), responsive personal portfolio built with React, TypeScript, and Vite. It is designed for GitHub Pages and keeps most editable content in JSON files.

## Features

- Minimal academic-style layout
- English / Traditional Chinese language toggle
- Projects, publications, education, and gallery sections
- Responsive desktop and mobile layouts
- Content separated into JSON files
- GitHub Actions workflow for automatic GitHub Pages deployment
- Structure ready to extend with a CMS or upload dashboard later

## 1. Requirements

Install Node.js 20 or newer: https://nodejs.org/

## 2. Run locally

Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

Check the production build before publishing:

```bash
npm run build
npm run preview
```

## 3. Personalize the website

Edit these files:

| File | What it controls |
| --- | --- |
| `src/data/site.json` | Site name and interface labels |
| `src/data/profile.json` | Intro, research focus, portrait, email, GitHub, Google Scholar |
| `src/data/projects.json` | Project cards, descriptions, tags, images, links |
| `src/data/papers.json` | Publications, authors, venue, year, DOI, PDF |
| `src/data/education.json` | Education and experience timeline |
| `src/data/gallery.json` | Gallery images and captions |
| `src/styles.css` | Colors, typography, spacing, and responsive layout |

Text fields support both languages, for example:

```json
"title": {
  "en": "DeskMate",
  "zh": "DeskMate：用於 XR 互動的桌上型移動機器人"
}
```

To hide an item without deleting it, set `"visible": false`. Set it to `true` to show it again.

### Add a project

1. Put the image in `public/images/`, for example `public/images/deskmate.jpg`.
2. Add an object to `src/data/projects.json`.
3. Set the `image` field to `/images/deskmate.jpg`.
4. Fill in the project title, descriptions, tags, and links.
5. Save the file and check the site locally.

Example:

```json
{
  "id": "my-project",
  "visible": true,
  "title": { "en": "My Project", "zh": "我的專案" },
  "category": "INTERACTIVE SYSTEMS",
  "year": "2026",
  "description": {
    "en": "A short project description.",
    "zh": "簡短的專案介紹。"
  },
  "image": "/images/my-project.jpg",
  "imageAlt": { "en": "Project prototype", "zh": "專案原型" },
  "tags": ["XR", "Prototype"],
  "links": {
    "project": "https://example.com",
    "github": "https://github.com/your-account/your-project",
    "paper": ""
  }
}
```

Remember: JSON does not allow comments, and every item except the last property must have a comma.

### Replace images

- Profile portrait: replace `public/images/profile-placeholder.svg`, or change `portrait` in `src/data/profile.json` to another path such as `/images/me.jpg`.
- Project covers: upload your image into `public/images/`, then change the matching `image` in `src/data/projects.json`.
- Gallery: change the `image` path in `src/data/gallery.json`.
- Recommended image formats: `.jpg`, `.png`, or `.webp`.
- Use descriptive, lowercase filenames without spaces, such as `deskmate-demo.webp`.
- Suggested image sizes: portrait around 1000 × 1200 px; project covers around 1400 × 1000 px; gallery images around 1200 px wide. Compress large images before committing.

For GitHub web editing: open the repository → `Add file` → `Upload files` → drag in the image(s) → commit changes. Then edit the corresponding JSON file on GitHub and commit again. The workflow automatically rebuilds the site.

## 4. Publish with GitHub Pages

### A. Create a repository

1. Create or sign in to your GitHub account.
2. Create a new repository, for example `kuanning-chang-portfolio`.
3. Upload this project folder's contents to the repository root. Do not upload the ZIP file itself as the only repository content.
4. Commit the files to the `main` branch.

You can upload files using GitHub's web interface, or use Git:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kuanning-chang-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If the repository already has Git history, do not run `git init`; just add the remote if needed and push.

### B. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or use **Actions → Deploy portfolio to GitHub Pages → Run workflow**).
5. Open the **Actions** tab and wait for the deployment workflow to finish successfully.
6. The public URL will be shown in the deployment job and usually follows this format:

   `https://YOUR-USERNAME.github.io/kuanning-chang-portfolio/`

GitHub Pages may take a few minutes to publish after the first deployment.

## 5. Updating the website

Edit a JSON file or upload an image, then commit the changes to `main`. GitHub Actions will build and publish the updated site automatically.

## 6. Design customization

In `src/styles.css`, edit the CSS variables near the top:

```css
:root {
  --paper: #f8f8f5;
  --ink: #20231f;
  --muted: #72766e;
  --line: #dedfd8;
  --accent: #a2ad91;
  --dark: #28332c;
}
```

- `--paper`: page background
- `--ink`: main text
- `--muted`: secondary text
- `--line`: borders and separators
- `--accent`: accent color
- `--dark`: dark panels and primary buttons

## 7. Adding a CMS later

This version is intentionally a static site. GitHub Pages does not provide a database or a secure admin login by itself. To add a browser-based content editor and image upload, a future version can integrate a CMS such as Decap CMS with a Git-based editorial workflow, or a hosted backend/storage service. Do not put secret API keys or passwords in this repository or in frontend code.

## Notes

- The website currently contains editable sample content and placeholder artwork. Replace them with your verified biography, real project images, publications, and links before sharing it publicly.
- `base: "./"` in `vite.config.ts` is intentional so assets resolve on a repository subpath and a custom domain.
- If you rename the repository, the public URL changes, but no base-path change should be needed with the current relative configuration.

---

# 繁體中文快速指南

## 本機預覽

先安裝 Node.js 20 以上版本，在專案資料夾執行：

```bash
npm install
npm run dev
```

依終端機顯示的網址開啟網站。發布前可執行 `npm run build` 檢查建置是否成功。

## 修改內容

- `src/data/profile.json`：個人介紹、研究方向、照片、Email、GitHub、Google Scholar。
- `src/data/projects.json`：專案名稱、介紹、標籤、圖片與連結。
- `src/data/papers.json`：論文標題、作者、會議／期刊、年份、DOI、PDF。
- `src/data/education.json`：學歷與研究經歷。
- `src/data/gallery.json`：圖片與說明文字。
- `src/data/site.json`：網站名稱與中英文介面文字。
- `src/styles.css`：顏色、字型、間距與版面。

中英文文字請保留 `en` 與 `zh` 兩個欄位。若暫時不想顯示某筆資料，將該筆資料的 `visible` 設為 `false`。

## 更換圖片

1. 將圖片放進 `public/images/`。
2. 在對應 JSON 中修改 `image` 或 `portrait` 路徑，例如 `/images/deskmate-demo.jpg`。
3. 圖片檔名建議使用英文小寫、不要有空格。
4. 在 GitHub 網頁上可用 **Add file → Upload files** 上傳圖片，再提交變更。
5. 推送到 `main` 後，GitHub Actions 會自動重新部署。

## 發布到 GitHub Pages

1. 建立 GitHub repository，將專案中的所有檔案與資料夾放在根目錄。
2. 推送至 `main` 分支。
3. 到 **Settings → Pages → Build and deployment → Source**，選擇 **GitHub Actions**。
4. 到 **Actions** 確認部署工作成功。
5. 網址通常會是 `https://你的GitHub帳號.github.io/專案名稱/`。

目前版本以設定檔管理內容，方便維護且不需要後端。若未來要在網站內登入、編輯作品和直接上傳圖片，可再加上 CMS；不要將密碼或私密 API key 寫進前端程式碼。

-->
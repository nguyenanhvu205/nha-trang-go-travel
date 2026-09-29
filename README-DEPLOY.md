# Deploy GitHub Pages + tạo PDF bản cuối

## 1. Đẩy code lên GitHub
1. Tạo repo **public** trên GitHub, ví dụ `nha-trang-go-travel` (không thêm README/.gitignore).
2. Trong thư mục dự án:
```bash
git init
git add .
git commit -m "Nha Trang Go Travel - static homepage"
git branch -M main
git remote add origin https://github.com/<TEN_GITHUB>/nha-trang-go-travel.git
git push -u origin main
```

## 2. Bật GitHub Pages
Repo → **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)` → **Save**.
Sau 1–2 phút: `https://<TEN_GITHUB>.github.io/nha-trang-go-travel/` (đây là `[LIVE_DEMO_URL]`; repo là `[GITHUB_URL]`).

## 3. Tạo PDF bản cuối (ảnh thật, font thật, QR)
Làm sau khi đã thả ảnh vào `assets/images/`. Cần Node.js và Internet.
```bash
npm i -D playwright && npx playwright install chromium
# macOS / Linux
LIVE_DEMO_URL="https://..." GITHUB_URL="https://github.com/..." YOUR_NAME="Tên bạn" node case-study/build.js
# Windows PowerShell
$env:LIVE_DEMO_URL="https://..."; $env:GITHUB_URL="https://github.com/..."; $env:YOUR_NAME="Tên bạn"; node case-study/build.js
```
Script chụp lại screenshot từ `index.html`, thay placeholder, tạo QR từ `LIVE_DEMO_URL` và xuất `case-study/nha-trang-go-travel-case-study.pdf`.

Không dùng Node: mở `case-study/case-study.html` bằng Chrome → **Print → Save as PDF** (khổ mặc định theo trang, bật *Background graphics*, Margins = None).

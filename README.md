# Nha Trang Go Travel — Static Homepage Demo

Website tĩnh (HTML · CSS · JavaScript), thương hiệu giả định dùng cho bài tập. **Tour, giá, review, số liệu là dữ liệu mẫu.**

## Mở website
M�� `index.html` bằng trình duyệt, hoặc chạy `python3 -m http.server 8000` rồi vào http://localhost:8000. Cần Internet để tải font (Google Fonts) và icon (Font Awesome).

## Cấu trúc
```
index.html · style.css · script.js
assets/images/          ← thả ảnh local vào đây (xem IMAGE-ASSET-MAP.md)
case-study/             ← case-study.html, build.js, screenshots/, PDF
IMAGE-ASSET-MAP.md · README-DEPLOY.md
```

## Hệ thống ảnh & hover
M��i ảnh là `div.image-wrapper > img`. Hover chỉ `scale(1.035)` trên `img`, không đổi layout, flex hay background-size. Overlay gradient là `::after` riêng. Ảnh lỗi sẽ chuyển sang ảnh tạm rồi gradient, không bị xóa.

## Placeholder cần điền
`[LIVE_DEMO_URL]` · `[GITHUB_URL]` · `[YOUR_NAME]` (trong `case-study/case-study.html`; `build.js` tự thay khi có biến môi trường, xem README-DEPLOY.md).

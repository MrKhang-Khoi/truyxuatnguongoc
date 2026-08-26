const fs = require('fs');
const https = require('https');

// URL trực tuyến chính thức
const liveUrl = "https://mrkhang-khoi.github.io/truyxuatnguongoc/";
const encodedUrl = encodeURIComponent(liveUrl);

// Tạo ảnh mã QR chuẩn URL màu Xanh Ngọc Bích và Đỏ C.P
const qrFiles = [
  { file: 'MA_QR_QUET_MO_WEB_EMERALD.png', color: '059669', bg: 'ffffff' },
  { file: 'MA_QR_QUET_MO_WEB_DO_CP.png', color: 'dc2626', bg: 'ffffff' }
];

qrFiles.forEach(item => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&color=${item.color}&bgcolor=${item.bg}&margin=20&qzone=2&charset-source=UTF-8&data=${encodedUrl}`;
  const stream = fs.createWriteStream(item.file);
  https.get(url, res => {
    res.pipe(stream);
    stream.on('finish', () => console.log(`Đã tạo: ${item.file}`));
  });
});

const fs = require('fs');
const https = require('https');

const targetUrl = "https://hoctiengxodang.online/";
const encodedUrl = encodeURIComponent(targetUrl);

const qrList = [
  { file: 'ma_qr_hoctiengxodang_xanh_emerald.png', color: '059669', bg: 'ffffff' },
  { file: 'ma_qr_hoctiengxodang_xanh_navy.png', color: '1e40af', bg: 'ffffff' },
  { file: 'ma_qr_hoctiengxodang_do_taynguyen.png', color: 'b91c1c', bg: 'ffffff' },
  { file: 'ma_qr_hoctiengxodang_vang_gold.png', color: 'd97706', bg: 'ffffff' },
  { file: 'ma_qr_hoctiengxodang_den_trang.png', color: '000000', bg: 'ffffff' }
];

qrList.forEach(item => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=1200x1200&color=${item.color}&bgcolor=${item.bg}&margin=20&qzone=2&charset-source=UTF-8&data=${encodedUrl}`;
  const stream = fs.createWriteStream(item.file);
  https.get(url, res => {
    res.pipe(stream);
    stream.on('finish', () => console.log(`Đã tạo: ${item.file}`));
  });
});

const fs = require('fs');
const https = require('https');

const liveUrl = "https://mrkhang-khoi.github.io/truyxuatnguongoc/";
const encodedUrl = encodeURIComponent(liveUrl);

const themes = [
  { name: 'ma_qr_online_emerald.png', color: '059669', bg: 'ffffff' },
  { name: 'ma_qr_online_do_cp.png', color: 'dc2626', bg: 'ffffff' },
  { name: 'ma_qr_online_navy.png', color: '1e40af', bg: 'ffffff' },
  { name: 'ma_qr_online_gold.png', color: 'd97706', bg: 'ffffff' }
];

themes.forEach(theme => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&color=${theme.color}&bgcolor=${theme.bg}&margin=15&qzone=2&charset-source=UTF-8&data=${encodedUrl}`;
  const file = fs.createWriteStream(theme.name);
  https.get(url, function(res) {
    res.pipe(file);
    file.on('finish', () => file.close(() => console.log(`Đã tạo thành công: ${theme.name}`)));
  });
});

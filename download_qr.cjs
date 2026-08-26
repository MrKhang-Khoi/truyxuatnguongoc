const fs = require('fs');
const https = require('https');

const text = `TRUY XUẤT NGUỒN GỐC THỰC PHẨM
Heo mảnh 3 máu

✅ Nhà cung cấp: Công ty Cổ phần Chăn nuôi C.P. Việt Nam – Chi nhánh Vũng Tàu
🔖 Mã hàng hóa: 22SW2242460001
📄 Số hóa đơn: 17961
📅 Ngày hóa đơn: 23/08/2026
📋 Đơn đặt hàng: 505401001063456
🐖 Ngày giết mổ: 23/08/2026
⚖️ Khối lượng: 37,6 kg
🏪 Đơn vị nhận hàng: Hộ kinh doanh Phan Văn Tính

Mã truy xuất: HEO-20260823-17961`;

const encodedText = encodeURIComponent(text);
const url = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&charset-source=UTF-8&data=${encodedText}`;

const file = fs.createWriteStream("ma_qr_truy_xuat_van_ban.png");
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
      console.log("Đã tải thành công ma_qr_truy_xuat_van_ban.png");
    });
  });
}).on('error', function(err) {
  console.error("Lỗi:", err);
});

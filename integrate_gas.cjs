const fs = require('fs');

const GAS_URL = 'https://script.google.com/macros/s/AKfycbzG0Xsvun05psQGklSnKUCZWfBRE-z8lyl171m3nXq7LpOVaHd0U8IHYzUQgMo7j5Xb/exec';

// Update index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
if (!indexContent.includes('const GAS_URL')) {
  indexContent = indexContent.replace(
    `const STORAGE_KEY = 'CP_VIETNAM_BATCH_LIST_V1';`,
    `const GAS_URL = '${GAS_URL}';\n    const STORAGE_KEY = 'CP_VIETNAM_BATCH_LIST_V1';`
  );
  indexContent = indexContent.replace(
    `function loadCustomerView() {`,
    `async function loadCustomerView() {
      const urlParams = new URLSearchParams(window.location.search);
      const queryId = urlParams.get('id') || urlParams.get('hd');

      // 1. Thử lấy từ Google Sheets
      try {
        const res = await fetch(GAS_URL);
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          let b = queryId ? json.data.find(item => (item['Mã Truy Xuất'] === queryId || String(item['Số Hóa Đơn']) === queryId)) : json.data[0];
          if (!b) b = json.data[0];
          if (b) {
            document.getElementById('viewProdName').innerText = b['Tên Sản Phẩm'] || 'Heo mảnh 3 máu';
            document.getElementById('viewSupplier').innerText = b['Nhà Cung Cấp'] || 'C.P. Việt Nam';
            document.getElementById('viewProdCode').innerText = b['Mã Hàng Hóa'] || '22SW2242460001';
            document.getElementById('viewInvoiceNo').innerText = b['Số Hóa Đơn'] || '17961';
            document.getElementById('viewInvoiceDate').innerText = b['Ngày Hóa Đơn'] || '23/08/2026';
            document.getElementById('viewOrderNo').innerText = b['Đơn Đặt Hàng'] || '505401001063456';
            document.getElementById('viewSlaughterDate').innerText = b['Ngày Giết Mổ'] || '23/08/2026';
            document.getElementById('viewWeight').innerText = b['Khối Lượng'] || '37,6 kg';
            document.getElementById('viewReceiver').innerText = b['Đơn Vị Nhận Hàng'] || 'Hộ kinh doanh Phan Văn Tính';
            document.getElementById('viewTraceCode').innerText = b['Mã Truy Xuất'] || 'HEO-20260823-17961';
            return;
          }
        }
      } catch (err) {
        console.warn('GG Sheets fetch:', err);
      }`
  );
  fs.writeFileSync('index.html', indexContent, 'utf8');
}

// Update admin.html
let adminContent = fs.readFileSync('admin.html', 'utf8');
adminContent = adminContent.replace(
  `let gasUrl = '';`,
  `let gasUrl = '${GAS_URL}';`
);
adminContent = adminContent.replace(
  `gasUrl = localStorage.getItem(GAS_CONFIG_KEY) || '';`,
  `gasUrl = localStorage.getItem(GAS_CONFIG_KEY) || '${GAS_URL}';`
);
fs.writeFileSync('admin.html', adminContent, 'utf8');

console.log('✅ Đã tích hợp thành công link Google Sheets vào cả index.html và admin.html');

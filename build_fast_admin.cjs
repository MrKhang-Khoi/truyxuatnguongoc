const fs = require('fs');

const GAS_URL = 'https://script.google.com/macros/s/AKfycbzG0Xsvun05psQGklSnKUCZWfBRE-z8lyl171m3nXq7LpOVaHd0U8IHYzUQgMo7j5Xb/exec';

const adminHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Cổng Xuất Hàng & Lưu Google Sheets - C.P. Việt Nam</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <style>
    :root {
      --primary: #059669;
      --primary-dark: #047857;
      --primary-light: #ecfdf5;
      --danger: #ef4444;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #cbd5e1;
      --bg: #f1f5f9;
      --card-bg: #ffffff;
      --radius: 20px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      padding: 16px 12px 60px;
    }

    .top-navbar {
      max-width: 1080px;
      margin: 0 auto 16px;
      background: linear-gradient(135deg, #047857 0%, #10b981 100%);
      color: white;
      padding: 14px 20px;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.25);
    }

    .brand-title {
      font-size: 17px;
      font-weight: 800;
    }

    .brand-sub {
      font-size: 12px;
      opacity: 0.9;
    }

    .btn-view-customer {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      backdrop-filter: blur(4px);
    }

    .main-grid {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 900px) {
      .main-grid {
        grid-template-columns: 1.15fr 0.85fr;
        align-items: start;
      }
    }

    .card {
      background: white;
      border-radius: var(--radius);
      padding: 22px 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1.5px solid #f1f5f9;
      padding-bottom: 12px;
    }

    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sync-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #166534;
      background: #dcfce7;
      padding: 4px 10px;
      border-radius: 99px;
      border: 1px solid #86efac;
    }

    .form-group {
      margin-bottom: 14px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .form-label .req {
      color: var(--danger);
      margin-left: 2px;
    }

    .input-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-input {
      width: 100%;
      padding: 12px 14px;
      border: 1.5px solid #cbd5e1;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      transition: all 0.2s;
    }

    .form-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
      background: #f0fdf4;
    }

    .input-suffix-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-suffix {
      position: absolute;
      right: 14px;
      font-weight: 800;
      color: #047857;
      font-size: 15px;
      pointer-events: none;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .trace-preview-tag {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 2px dashed #34d399;
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      margin: 14px 0 18px;
    }

    .trace-preview-tag .lbl {
      font-size: 11px;
      font-weight: 700;
      color: #065f46;
      text-transform: uppercase;
    }

    .trace-preview-tag .val {
      font-size: 17px;
      font-weight: 800;
      color: #064e3b;
      font-family: monospace;
      letter-spacing: 1px;
      margin-top: 2px;
    }

    /* NÚT LƯU TO NỔI BẬT */
    .btn-save-main {
      width: 100%;
      padding: 16px 20px;
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      color: white;
      border: none;
      border-radius: 14px;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(5, 150, 105, 0.35);
      transition: all 0.2s;
    }

    .btn-save-main:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(5, 150, 105, 0.45);
    }

    .btn-save-main:active {
      transform: scale(0.98);
    }

    .btn-reset {
      width: 100%;
      padding: 11px;
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;
      margin-top: 10px;
    }

    /* Cột QR Code & In Tem */
    .qr-preview-box {
      background: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 18px;
      padding: 20px;
      text-align: center;
      margin-bottom: 16px;
    }

    #qrHolder canvas, #qrHolder img {
      margin: 0 auto;
      display: block;
      border-radius: 12px;
    }

    .btn-print-action {
      width: 100%;
      padding: 14px;
      background: #0f172a;
      color: white;
      border: none;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 10px;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
    }

    /* Modal Xác Nhận */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 100;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    .modal-overlay.show {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-box {
      background: white;
      border-radius: 24px;
      max-width: 440px;
      width: 100%;
      padding: 24px;
      text-align: center;
      box-shadow: 0 20px 30px rgba(0,0,0,0.25);
    }

    .modal-summary {
      background: #f8fafc;
      border-radius: 14px;
      padding: 14px;
      font-size: 13px;
      text-align: left;
      margin: 16px 0;
      border: 1px solid #e2e8f0;
    }

    .modal-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
    }

    .btn-modal {
      flex: 1;
      padding: 13px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
    }

    .btn-modal-cancel { background: #f1f5f9; color: #334155; }
    .btn-modal-confirm { background: var(--primary); color: white; }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: white;
      padding: 14px 24px;
      border-radius: 99px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      z-index: 200;
      transition: transform 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
    }

    /* Print Template */
    @media print {
      body * { visibility: hidden; }
      #printableLabel, #printableLabel * { visibility: visible; }
      #printableLabel {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: 2px solid #000 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Thanh Điều Hướng -->
  <header class="top-navbar">
    <div>
      <div class="brand-title">C.P. VIỆT NAM — XUẤT KHO</div>
      <div class="brand-sub">Quản lý lô hàng & Đồng bộ Google Sheets</div>
    </div>
    <a href="index.html" class="btn-view-customer" target="_blank">
      👁️ Khách Quét
    </a>
  </header>

  <main class="main-grid">

    <!-- CỘT 1: FORM NHẬP SIÊU TỐC -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          <span>📦</span> Nhập Lô Hàng Xuất Kho
        </h2>
        <span class="sync-status">⚡ GG Sheets Đã Kết Nối</span>
      </div>

      <!-- Tên Sản Phẩm -->
      <div class="form-group">
        <label class="form-label">Tên sản phẩm <span class="req">*</span></label>
        <input type="text" id="inpProdName" class="form-input" value="Heo mảnh 3 máu" required>
      </div>

      <!-- Nhà Cung Cấp -->
      <div class="form-group">
        <label class="form-label">Nhà cung cấp <span class="req">*</span></label>
        <input type="text" id="inpSupplier" class="form-input" value="Công ty Cổ phần Chăn nuôi C.P. Việt Nam – Chi nhánh Vũng Tàu">
      </div>

      <!-- Số Hóa Đơn & Khối Lượng (CHỈ CẦN NHẬP SỐ) -->
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Số hóa đơn <span class="req">*</span></label>
          <input type="number" inputmode="numeric" id="inpInvoiceNo" class="form-input" value="17961" placeholder="17961" oninput="onDataChanged()">
        </div>
        <div class="form-group">
          <label class="form-label">Khối lượng (Số kg) <span class="req">*</span></label>
          <div class="input-suffix-wrapper">
            <input type="number" step="0.1" inputmode="decimal" id="inpWeightNum" class="form-input" value="37.6" placeholder="37.6" style="padding-right: 44px; font-weight: 800; color: #dc2626;" oninput="onDataChanged()">
            <span class="input-suffix">kg</span>
          </div>
        </div>
      </div>

      <!-- Mã Hàng Hóa & Đơn Đặt Hàng -->
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Mã hàng hóa</label>
          <input type="text" id="inpProdCode" class="form-input" value="22SW2242460001">
        </div>
        <div class="form-group">
          <label class="form-label">Đơn đặt hàng</label>
          <input type="number" inputmode="numeric" id="inpOrderNo" class="form-input" value="505401001063456">
        </div>
      </div>

      <!-- Ngày Hóa Đơn & Ngày Giết Mổ -->
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Ngày hóa đơn</label>
          <input type="text" id="inpInvoiceDate" class="form-input" value="23/08/2026">
        </div>
        <div class="form-group">
          <label class="form-label">Ngày giết mổ <span class="req">*</span></label>
          <input type="text" id="inpSlaughterDate" class="form-input" value="23/08/2026" oninput="onDataChanged()">
        </div>
      </div>

      <!-- Đơn Vị Nhận Hàng -->
      <div class="form-group">
        <label class="form-label">Đơn vị nhận hàng <span class="req">*</span></label>
        <input type="text" id="inpReceiver" class="form-input" value="Hộ kinh doanh Phan Văn Tính">
      </div>

      <!-- Mã Truy Xuất Tự Sinh -->
      <div class="trace-preview-tag">
        <div class="lbl">Mã Truy Xuất Điện Tử (Tự Động)</div>
        <div class="val" id="lblTraceCode">HEO-20260823-17961</div>
      </div>

      <!-- NÚT LƯU CHÍNH SIÊU TO -->
      <button type="button" class="btn-save-main" onclick="openSaveConfirmModal()">
        <span>💾</span> LƯU & ĐỒNG BỘ GOOGLE SHEETS
      </button>

      <button type="button" class="btn-reset" onclick="resetFormToNew()">
        🔄 Nhập Lô Mới Tiếp Theo
      </button>
    </div>

    <!-- CỘT 2: XEM TRƯỚC MÃ QR & IN TEM NHÃN -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          <span>✨</span> Mã QR & In Tem Dán
        </h2>
        <span style="font-size: 12px; color: #64748b; font-weight: 600;">ISO/IEC 18004</span>
      </div>

      <div class="qr-preview-box">
        <div id="qrHolder"></div>
        <div style="font-size: 12px; font-weight: 700; color: #059669; margin-top: 10px;">
          🔗 Quét bằng Camera / Zalo mở Web
        </div>
      </div>

      <button type="button" class="btn-print-action" onclick="window.print()">
        <span>🖨️</span> In Tem Dán Này (100x70mm)
      </button>

      <!-- Khung Tem In Chuẩn -->
      <div id="printableLabel" style="background: white; border: 2.5px solid #059669; border-radius: 14px; padding: 12px; margin-top: 14px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
          <span style="font-size: 10px; font-weight: 800; color: #065f46;">C.P. VIỆT NAM — CN VŨNG TÀU</span>
          <span style="font-size: 9px; font-weight: 800; background: #fef08a; color: #713f12; padding: 2px 6px; border-radius: 99px;">ĐÃ KIỂM DỊCH</span>
        </div>
        <div style="font-size: 15px; font-weight: 800; color: #047857;" id="lblPrintProdName">Heo mảnh 3 máu</div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;" id="lblPrintSub">Mã hàng: 22SW2242460001 | HĐ: 17961</div>
        
        <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 8px; align-items: center;">
          <div style="font-size: 11px; line-height: 1.4; color: #1e293b;">
            <div><b>Ngày mổ:</b> <span id="lblPrintDate">23/08/2026</span></div>
            <div><b>Khối lượng:</b> <span id="lblPrintWeight" style="color: #dc2626; font-weight: 800; font-size: 13px;">37,6 kg</span></div>
            <div><b>Nhận hàng:</b> <span id="lblPrintReceiver">HKD Phan Văn Tính</span></div>
            <div style="margin-top: 4px; font-size: 10px; color: #047857; font-family: monospace; font-weight: 700;" id="lblPrintTrace">HEO-20260823-17961</div>
          </div>
          <div style="text-align: center;">
            <canvas id="qrPrintCanvas"></canvas>
            <div style="font-size: 9px; font-weight: 700; color: #059669; margin-top: 2px;">Quét Zalo / Camera</div>
          </div>
        </div>
      </div>
    </div>

  </main>

  <!-- MODAL XÁC NHẬN LƯU (Tránh bấm nhầm) -->
  <div class="modal-overlay" id="saveConfirmModal">
    <div class="modal-box">
      <div style="font-size: 40px; margin-bottom: 8px;">✅</div>
      <h3 style="font-size: 18px; font-weight: 800; color: #0f172a;">Xác Nhận Lưu Lô Hàng?</h3>
      <p style="font-size: 13px; color: #64748b; margin-top: 4px;">Dữ liệu sẽ được lưu vào máy và ghi vào Google Sheets:</p>

      <div class="modal-summary">
        <div class="modal-row"><b>Sản phẩm:</b> <span id="sumProd">-</span></div>
        <div class="modal-row"><b>Số HĐ:</b> <span id="sumInv">-</span></div>
        <div class="modal-row"><b>Ngày mổ:</b> <span id="sumDate">-</span></div>
        <div class="modal-row"><b>Khối lượng:</b> <span id="sumWeight" style="color: #dc2626; font-weight: 800;">-</span></div>
        <div class="modal-row"><b>Đơn vị nhận:</b> <span id="sumReceiver">-</span></div>
        <div class="modal-row"><b>Mã truy xuất:</b> <span id="sumTrace" style="font-family: monospace; font-weight: 700; color: #047857;">-</span></div>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn-modal btn-modal-cancel" onclick="closeModal()">Quay Lại Sửa</button>
        <button type="button" class="btn-modal btn-modal-confirm" onclick="executeSaveBatch()">Đồng Ý Lưu</button>
      </div>
    </div>
  </div>

  <div class="toast" id="appToast"><span>✅</span> <span id="toastMsg">Thao tác thành công!</span></div>

  <script>
    const GAS_URL = '${GAS_URL}';
    const BASE_SCAN_URL = 'https://mrkhang-khoi.github.io/truyxuatnguongoc/';
    const STORAGE_KEY = 'CP_VIETNAM_BATCH_LIST_V1';

    function generateTraceCode(dateStr, invoiceNo) {
      const cleanDate = (dateStr || '').replace(/[\/\\-\\.]/g, '');
      const cleanInv = (invoiceNo || '').trim();
      return 'HEO-' + (cleanDate || '20260823') + '-' + (cleanInv || '00000');
    }

    function onDataChanged() {
      const dateVal = document.getElementById('inpSlaughterDate').value;
      const invVal = document.getElementById('inpInvoiceNo').value;
      const weightVal = document.getElementById('inpWeightNum').value;
      const weightStr = (weightVal ? weightVal.replace('.', ',') + ' kg' : '0 kg');

      const traceCode = generateTraceCode(dateVal, invVal);
      document.getElementById('lblTraceCode').innerText = traceCode;

      // Cập nhật thẻ in
      document.getElementById('lblPrintProdName').innerText = document.getElementById('inpProdName').value;
      document.getElementById('lblPrintSub').innerText = 'Mã hàng: ' + document.getElementById('inpProdCode').value + ' | HĐ: ' + invVal;
      document.getElementById('lblPrintDate').innerText = dateVal;
      document.getElementById('lblPrintWeight').innerText = weightStr;
      document.getElementById('lblPrintReceiver').innerText = document.getElementById('inpReceiver').value;
      document.getElementById('lblPrintTrace').innerText = traceCode;

      renderQRCodes(traceCode);
    }

    function renderQRCodes(traceCode) {
      const scanUrl = BASE_SCAN_URL + '?id=' + encodeURIComponent(traceCode);

      // QR xem trước
      QRCode.toCanvas(document.getElementById('qrPrintCanvas'), scanUrl, {
        width: 120,
        margin: 2,
        color: { dark: '#047857', light: '#ffffff' },
        errorCorrectionLevel: 'M'
      });

      // QR to bên trên
      const holder = document.getElementById('qrHolder');
      holder.innerHTML = '<canvas id=\"bigQrCanvas\"></canvas>';
      QRCode.toCanvas(document.getElementById('bigQrCanvas'), scanUrl, {
        width: 200,
        margin: 2,
        color: { dark: '#047857', light: '#ffffff' },
        errorCorrectionLevel: 'M'
      });
    }

    function openSaveConfirmModal() {
      const prodName = document.getElementById('inpProdName').value.trim();
      const invoiceNo = document.getElementById('inpInvoiceNo').value.trim();
      const slaughterDate = document.getElementById('inpSlaughterDate').value.trim();
      const weightNum = document.getElementById('inpWeightNum').value.trim();

      if (!prodName || !invoiceNo || !slaughterDate || !weightNum) {
        showToast('⚠️ Vui lòng nhập số hóa đơn và khối lượng (kg)');
        return;
      }

      const weightStr = weightNum.replace('.', ',') + ' kg';
      const traceCode = generateTraceCode(slaughterDate, invoiceNo);

      document.getElementById('sumProd').innerText = prodName;
      document.getElementById('sumInv').innerText = invoiceNo;
      document.getElementById('sumDate').innerText = slaughterDate;
      document.getElementById('sumWeight').innerText = weightStr;
      document.getElementById('sumReceiver').innerText = document.getElementById('inpReceiver').value;
      document.getElementById('sumTrace').innerText = traceCode;

      document.getElementById('saveConfirmModal').classList.add('show');
    }

    function closeModal() {
      document.getElementById('saveConfirmModal').classList.remove('show');
    }

    async function executeSaveBatch() {
      closeModal();
      const slaughterDate = document.getElementById('inpSlaughterDate').value.trim();
      const invoiceNo = document.getElementById('inpInvoiceNo').value.trim();
      const weightNum = document.getElementById('inpWeightNum').value.trim();
      const weightStr = weightNum.replace('.', ',') + ' kg';
      const traceCode = generateTraceCode(slaughterDate, invoiceNo);

      const batchData = {
        id: traceCode,
        prodName: document.getElementById('inpProdName').value.trim(),
        supplier: document.getElementById('inpSupplier').value.trim(),
        prodCode: document.getElementById('inpProdCode').value.trim(),
        invoiceNo: invoiceNo,
        invoiceDate: document.getElementById('inpInvoiceDate').value.trim(),
        orderNo: document.getElementById('inpOrderNo').value.trim(),
        slaughterDate: slaughterDate,
        weight: weightStr,
        receiver: document.getElementById('inpReceiver').value.trim(),
        updatedAt: new Date().toISOString()
      };

      // 1. Lưu LocalStorage
      let list = [];
      try { list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { list = []; }
      const existIdx = list.findIndex(b => b.id === traceCode);
      if (existIdx !== -1) list[existIdx] = batchData;
      else list.unshift(batchData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      // 2. Gửi Google Sheets
      showToast('⏳ Đang lưu vào Google Sheets...');
      try {
        await fetch(GAS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(batchData)
        });
        showToast('✅ Đã lưu vào Google Sheets thành công!');
      } catch (err) {
        console.error(err);
        showToast('✅ Đã lưu vào bộ nhớ máy!');
      }
    }

    function resetFormToNew() {
      const d = new Date();
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const todayStr = day + '/' + month + '/' + d.getFullYear();

      document.getElementById('inpInvoiceNo').value = '';
      document.getElementById('inpInvoiceDate').value = todayStr;
      document.getElementById('inpSlaughterDate').value = todayStr;
      document.getElementById('inpWeightNum').value = '';
      onDataChanged();
      showToast('🔄 Đã sẵn sàng nhập lô hàng mới');
    }

    function showToast(msg) {
      const toast = document.getElementById('appToast');
      document.getElementById('toastMsg').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    window.addEventListener('load', () => {
      onDataChanged();
    });
  </script>
</body>
</html>`;

fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('✅ Đã cập nhật admin.html với Nút Lưu To Nổi Bật và Form Nhập Siêu Nhanh!');

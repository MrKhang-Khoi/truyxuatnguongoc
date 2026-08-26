// =========================================================================
// MÃ GOOGLE APPS SCRIPT KẾT NỐI GOOGLE SHEETS VỚI HỆ THỐNG TRUY XUẤT QR
// Hướng dẫn: Dán toàn bộ mã này vào Google Sheets -> Tiện ích mở rộng -> Apps Script
// =========================================================================

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ status: "empty", data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var headers = data[0];
  var rows = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    rows.push(row);
  }
  
  // Trả về danh sách lô hàng (dòng mới nhất ở đầu)
  rows.reverse();
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success", data: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var body = JSON.parse(e.postData.contents);
    
    // Nếu bảng tính chưa có tiêu đề, tạo dòng tiêu đề
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã Truy Xuất",
        "Tên Sản Phẩm",
        "Nhà Cung Cấp",
        "Mã Hàng Hóa",
        "Số Hóa Đơn",
        "Ngày Hóa Đơn",
        "Đơn Đặt Hàng",
        "Ngày Giết Mổ",
        "Khối Lượng",
        "Đơn Vị Nhận Hàng",
        "Thời Gian Cập Nhật"
      ]);
    }
    
    // Thêm dòng mới vào Google Sheets
    sheet.appendRow([
      body.id || "",
      body.prodName || "",
      body.supplier || "",
      body.prodCode || "",
      body.invoiceNo || "",
      body.invoiceDate || "",
      body.orderNo || "",
      body.slaughterDate || "",
      body.weight || "",
      body.receiver || "",
      new Date().toLocaleString("vi-VN")
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Đã lưu vào Google Sheets thành công!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

<!DOCTYPE html>
<html>
<head>
    <title>Hóa Đơn Thanh Toán</title>
</head>
<body>
    <h1>Hóa Đơn Thanh Toán</h1>
    <p>Mã Hóa Đơn: {{ $invoice->invoice_code }}</p>
    <p>Tổng Tiền: {{ number_format($invoice->total) }} VND</p>
    <p>Ngày Tạo: {{ $invoice->created_at }}</p>
    <p>Phương Thức Thanh Toán: {{ $invoice->payment_method }}</p>
    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
</body>
</html>

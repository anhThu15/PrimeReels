<!DOCTYPE html>
<html>

<head>
    <title>Đặt lại mật khẩu</title>
</head>

<body>
    <h1>Xin chào {{ $user->user_name }}</h1>
    <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Bạn có thể đặt lại mật khẩu của mình bằng
        cách nhấn vào liên kết dưới đây:</p>
    <a href="{{ $url }}">Đặt lại mật khẩu</a>
    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    <p>Cảm ơn!</p>
</body>

</html>

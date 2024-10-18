# Cài đặt JWT (JSON Web Token)

Cài đặt package `tymon/jwt-auth` để thực hiện xác thực API:

```bash
composer require tymon/jwt-auth
```

Xuất bản cấu hình:

```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

Cấu hình JWT:
Mở file `config/jwt.php` và điều chỉnh các cấu hình nếu cần thiết.

Tạo khóa JWT:

```bash
php artisan jwt:secret
```

Kiểm tra file `.env` có dòng `JWT_SECRET=""` chưa.

Khởi chạy Migration:

```bash
php artisan migrate
```

Khởi chạy Seeder:

```bash
php artisan db:seed
```

Khởi chạy Server:

```bash
php artisan serve
```

# API Documentation

### Register

**POST** `localhost:8000/api/register`

```json
{
    "user_name": "Jin Chill",
    "email": "jinchill@example.com",
    "password": "password",
    "password_confirmation": "password",
    "gender": "nam"
}
```

### Test Post User role admin

**POST** `localhost:8000/api/users`

```json
{
    "user_name": "Jin Huynh",
    "email": "jin@example.com",
    "password": "password123",
    "avatar": "link_to_avatar",
    "gender": "nam",
    "role": 100,
    "google_id": "google_id_if_any",
    "access_token": "access_token_if_any",
    "provider": "local"
}
```

### Test Put User

**PUT** `localhost:8000/api/users/{$user_id}`

```json
{
    "user_name": "Jin bede",
    "email": "jinbede@example.com",
    "gender": "nu"
}
```

### Test Delete User

**DELETE** `localhost:8000/api/users/{$user_id}`

### Login Google

**GET** `localhost:8000/api/login/google`

### Login Local

Check role admin là 100
**GET** `localhost:8000/api/login`

```json
{
    "email": "jin@example.com",
    "password": "password123"
}
```

Lấy Token
Header:

-   Key: `Authorization`
-   Value: `Bearer (token đã lấy)`

### Profile

**PUT** `localhost:8000/api/profile/update`

```json
{
    "user_name": "Jin Dep Trai",
    "avatar": "link avatar",
    "gender": "nam" // chỉ có 'nam' or 'nu'
}
```

### Change Password

**PUT** `localhost:8000/api/profile/change-password`

```json
{
    "current_password": "mật khẩu hiện tại",
    "new_password": "mật khẩu mới",
    "new_password_confirmation": "nhập lại mật khẩu mới"
}
```

### Forgot Password

#### Gửi email đặt lại mật khẩu:

**POST** `localhost:8000/api/password/email`

```json
{
    "email": "user@example.com"
}
```

#### Đặt lại mật khẩu:

**POST** `localhost:8000/api/password/reset`

```json
{
    "token": "your-reset-token",
    "password": "newpassword",
    "password_confirmation": "newpassword"
}
```

### Logout

**POST** `127.0.0.1:8000/api/logout`

### Packages

**POST** `localhost:8000/api/packages`

```json
{
    "name": "tên gói",
    "duration": "365", // thời gian gói vd: 1 ngày, 7 ngày, 30 ngày, 1 năm
    "price": "giá tiền của gói"
}
```

**PUT** `localhost:8000/api/packages/{$packages_id}`

```json
{
    "name": "sửa tên gói",
    "duration": "365", // sửa thời gian
    "price": "sửa giá tiền của gói"
}
```

**DELETE** `localhost:8000/api/packages/{$packages_id}`

### Package Purchase mua gói

**POST** `localhost:8000/api/package/purchase`

```json
{
    "package_id": 1, // id gói
    "voucher_name": "lấy tên voucher để giảm giá" // bỏ voucher đã tạo vào
}
```

Sau khi send thì có đường dẫn thanh toán hoá đơn.

### Thẻ Test

-   Ngân hàng: NCB
-   Số thẻ: 9704198526191432198
-   Tên chủ thẻ: NGUYEN VAN A
-   Ngày phát hành: 07/15
-   Mật khẩu OTP: 123456

Status invoices success thì gửi gửi mail hoá đơn cho khách hàng.

### Voucher Types

**POST** `localhost:8000/api/voucher-types`

```json
{
    "name": "Discount 20%", // tên giảm giá
    "discount": 20, // % giảm giá
    "customer_usage_limit": 1, // số lượt sử dụng
    "discount_type": "percentage", // percentage loại giảm giá phần trăm, fixed loại giảm giá theo số tiền cố định
    "min_spend": 50000 // giảm tối thiểu 50000
}
```

**DELETE** `localhost:8000/api/api/voucher-types/{voucher_types_id}`

## Upload Video Local

**POST** `localhost:8000/api/upload-video`
Headers:

-   Key: `Content-Type`
-   Value: `multipart/form-data`

Chọn tab Body.
Chọn form-data.
Thêm một trường mới:

-   Key: `video`
-   Type: `File`
-   Nhấp vào Select Files.

Bước 5: Gửi Request
Nhấn nút Send.

## Movie

### Lấy danh sách Movie Types

**GET** `localhost:8000/api/movie-types`

### Tạo một Movie Type mới

**POST** `localhost:8000/api/movie-types`

```json
{
    "name": "Tên thể loại"
}
```

### Lấy thông tin chi tiết một Movie Type

**GET** `localhost:8000/api/movie-types/{movie_id}`

### Cập nhật một Movie Type

**PUT** `localhost:8000/api/movie-types/{id}`

```json
{
    "name": "Tên thể loại mới"
}
```

### Xóa một Movie Type

**DELETE** `localhost:8000/api/movie-types/{id}`

### Tạo diễn viên

**POST** `localhost:8000/api/actors`

```json
{
    "name": "Leonardo DiCaprio",
    "status": 1,
    "biography": "Famous actor known for Titanic and Inception.",
    "birth_date": "1974-11-11",
    "image_url": "https://example.com/leonardo.jpg"
}
```

### Lấy danh sách diễn viên

**GET** `localhost:8000/api/actors`

### Cập nhật diễn viên

**PUT** `localhost:8000/api/actors/{id}`

```json
{
    "name": "Leonardo DiCaprio",
    "status": 1,
    "biography": "Updated biography.",
    "birth_date": "1974-11-11",
    "image_url": "https://example.com/leonardo-updated.jpg"
}
```

### Xóa diễn viên

**DELETE** `localhost:8000/api/actors/{id}`

### Tạo thể loại phim

**POST** `localhost:8000/api/genres`

```json
{
    "name": "Action",
    "status": 1,
    "description": "Action movies with high intensity."
}
```

### Lấy danh sách thể loại

**GET** `localhost:8000/api/genres`

### Cập nhật thể loại phim

**PUT** `localhost:8000/api/genres/{id}`

```json
{
    "name": "Action Updated",
    "status": 1,
    "description": "Updated description of action movies."
}
```

### Xóa thể loại phim

**DELETE** `localhost:8000/api/genres/{id}`

### Thêm diễn viên vào movie

**POST** `localhost:8000/api/movies/1/actors`

Headers:

-   Content-Type: `application/json`

```json
{
    "actor_ids": [1]
}
```

### Thêm thể loại vào movie

**POST** `localhost:8000/api/movies/1/genres`

Headers:

-   Content-Type: `application/json`

```json
{
    "genre_ids": [3]
}
```

### Upload file video

**POST**
`localhost:8000/api/movies/{movie_id}/episodes`

Chọn tab Body.
Chọn form-data.
Thêm các trường như sau:

-   `status`: 1 (hoặc giá trị khác tùy theo trạng thái).
-   `video`: chọn file video từ máy tính của bạn.
-   `duration`: 45 (hoặc thời gian khác).
-   `episode_number`: 1 (Số tập muốn up).

Đường dẫn video URL:
`localhost:8000/storage/videos/video_url`

### Lọc phim theo quốc gia

**GET** `localhost:8000/api/movies/filter/country/{country}`

### Lọc phim theo thể loại movie type

**GET** `localhost:8000/api/movies-type/{movie_type_id}`

### Lọc phim theo thể loại genre

**GET** `localhost:8000/api/movies-genre/{genreId}`

## Comments

### Bình Luận

**POST** `localhost:8000/api/movies/{movieId}/comments`

```json
{
    "content": "Phim này rất hay",
    "rating": 4
}
```

### Lấy Tất Cả Bình Luận của Một Bộ Phim

**GET** `localhost:8000/api/movies/{movieId}/comments`

### Lấy Bình Luận Theo ID

**GET** `localhost:8000/api/movies/{movieId}/comments/{commentId}`

### Cập Nhật Bình Luận

**PUT** `localhost:8000/api/movies/{movieId}/comments/{commentId}`

```json
{
    "content": "Bình luận đã được cập nhật.",
    "rating": 9
}
```

### Xóa Bình Luận

**DELETE** `localhost:8000/api/movies/{movieId}/comments/{commentId}`

Về phần rating sẽ tự động tính trung bình các comment để cập nhập phần rating bên movie.

## Favourites API

### Thêm phim vào danh sách yêu thích

**POST** `localhost:8000/api/movies/{movieId}/favourites`

### Xem danh sách phim yêu thích của người dùng

**GET** `localhost:8000/api/favourites`

### Xoá phim khỏi danh sách yêu thích

**DELETE** `localhost:8000/api/movies/{movieId}/favourites`

### Lưu lịch sử xem phim

**POST** `localhost:8000/api/movies/{movie_id}/episodes/{episode_id}/history`

### Xem lịch sử xem phim

**GET** `localhost:8000/api/history`

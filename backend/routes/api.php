<?php



use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\VoucherTypeController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\MovieTypeController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\ActorController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\HistoryController;

//______________________________________ADMIN_______________________________________________
Route::middleware(['jwt.verify', 'admin'])->group(function () {
    //______________________________________ADMIN CRUD USER_______________________________________________
    Route::get('users', [UserController::class, 'index']); // Lấy danh sách user
    Route::get('users/{id}', [UserController::class, 'show']); // Lấy thông tin user theo id
    Route::post('users', [UserController::class, 'store']); // Thêm user mới
    Route::put('users/{id}', [UserController::class, 'update']); // Cập nhật user
    Route::delete('users/{id}', [UserController::class, 'destroy']); // Xoá user
});
//______________________________________PROFILE USER_______________________________________________
Route::middleware(['jwt.verify'])->get('profile', [ProfileController::class, 'profile']); // Lấy thông tin user
//______________________________________LOGIN_______________________________________________
Route::post('login', [AuthController::class, 'login']); // Đăng nhập
//______________________________________REGISTER_______________________________________________
Route::post('register', [AuthController::class, 'register']); // Đăng ký
//______________________________________VERIFY MAIL_______________________________________________
Route::get('verify-email/{userId}/{token}', [AuthController::class, 'verifyEmail']); // Xác thực email
//______________________________________LOGIN MAIL_______________________________________________
Route::middleware(['web'])->group(function () {
    Route::get('login/google', [GoogleAuthController::class, 'redirectToGoogle']); // Đăng nhập bằng Google
    Route::get('login/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']); // Xử lý callback
});
//______________________________________LOGOUT_______________________________________________
Route::middleware(['auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']); // Đăng xuất
});
//______________________________________FORGOT PASSWORD_______________________________________________
Route::post('/password/email', [AuthController::class, 'sendResetLink']); // Gửi email đặt lại mật khẩu
Route::post('/password/reset', [AuthController::class, 'resetPassword']); // Đặt lại mật khẩu
//______________________________________USER_______________________________________________
Route::middleware(['jwt.verify'])->group(function () {
    //______________________________________UPDATE PROFILE_______________________________________________
    Route::put('profile/update', [ProfileController::class, 'updateProfile']); // Cập nhật thông tin user
    Route::put('profile/change-password', [ProfileController::class, 'changePassword']); // Đổi mật khẩu
});
//______________________________________PACKAGES_______________________________________________
Route::get('packages', [PackageController::class, 'index']); // Lấy danh sách gói cước
Route::get('packages/{id}', [PackageController::class, 'show']); // Lấy thông tin gói cước

Route::middleware(['jwt.verify', 'admin'])->group(function () {
    Route::post('packages', [PackageController::class, 'createPackage']); // Thêm gói cước
    Route::put('packages/{id}', [PackageController::class, 'update']); // Cập nhật gói cước
    Route::delete('packages/{id}', [PackageController::class, 'destroy']); // Xoá gói cước
});
//______________________________________PAYMENT_______________________________________________
Route::middleware(['jwt.verify'])->group(function () {
    Route::post('/package/purchase', [PaymentController::class, 'createPayment'])->name('payment.create'); // Tạo đơn hàng
});
Route::get('/payment/return', [PaymentController::class, 'paymentReturn'])->name('payment.return'); // Trả về sau khi thanh toán
//______________________________________VOUCHER_______________________________________________
Route::get('vouchers/', [VoucherController::class, 'index']); // Lấy danh sách voucher
Route::get('vouchers/{id}', [VoucherController::class, 'show']); // Lấy thông tin voucher

Route::middleware(['jwt.verify', 'admin'])->group(function () {
    Route::post('vouchers/', [VoucherController::class, 'store']); // Thêm voucher
    Route::put('vouchers/{id}', [VoucherController::class, 'update']); // Cập nhật voucher
    Route::delete('vouchers/{id}', [VoucherController::class, 'destroy']); // Xoá voucher
});

Route::get('voucher-types/', [VoucherTypeController::class, 'index']); // Lấy danh sách loại voucher
Route::get('voucher-types/{id}', [VoucherTypeController::class, 'show']); // Lấy thông tin loại voucher

Route::middleware(['jwt.verify', 'admin'])->group(function () {
    Route::post('voucher-types/', [VoucherTypeController::class, 'store']); // Thêm loại voucher
    Route::put('voucher-types/{id}', [VoucherTypeController::class, 'update']); // Cập nhật loại voucher
    Route::delete('voucher-types/{id}', [VoucherTypeController::class, 'destroy']); // Xoá loại voucher
});
//______________________________________UPLOAD VIDEO_______________________________________________

Route::middleware(['jwt.verify', 'admin'])->post('/upload-video', [VideoController::class, 'uploadVideo']); // Upload video

Route::get('/movies', [MovieController::class, 'index']); // Lấy danh sách phim
Route::get('/movies/{id}', [MovieController::class, 'show']); // Lấy thông tin chi tiết một phim
Route::get('/movie-types', [MovieTypeController::class, 'index']); // Lấy danh sách thể loại phim
Route::get('/movie-types/{id}', [MovieTypeController::class, 'show']); // Lấy thông tin thể loại phim
Route::get('/actors', [ActorController::class, 'index']); // Lấy danh sách diễn viên
Route::get('/actors/{id}', [ActorController::class, 'show']); // Lấy thông tin chi tiết một diễn viên
Route::get('/genres', [GenreController::class, 'index']); // Lấy danh sách thể loại
Route::get('/genres/{id}', [GenreController::class, 'show']); // Lấy thông tin chi tiết một thể loại

Route::middleware(['jwt.verify', 'admin'])->group(function () {
    //______________________________________MOVIE TYPES_______________________________________________
    Route::post('/movie-types', [MovieTypeController::class, 'store']); // Thêm thể loại phim
    Route::put('/movie-types/{id}', [MovieTypeController::class, 'update']); // Cập nhật thể loại phim
    Route::delete('/movie-types/{id}', [MovieTypeController::class, 'destroy']); // Xoá thể loại phim
    //______________________________________MOVIE_______________________________________________
    Route::post('/movies', [MovieController::class, 'store']); // Thêm một phim mới
    Route::put('/movies/{id}', [MovieController::class, 'update']); // Cập nhật một phim
    Route::delete('/movies/{id}', [MovieController::class, 'destroy']); // Xóa một phim
    //______________________________________ACTOR_______________________________________________
    Route::post('/actors', [ActorController::class, 'store']); // Thêm một diễn viên mới
    Route::put('/actors/{id}', [ActorController::class, 'update']); // Cập nhật một diễn viên
    Route::delete('/actors/{id}', [ActorController::class, 'destroy']); // Xóa một diễn viên
    //______________________________________GENRE_______________________________________________
    Route::post('/genres', [GenreController::class, 'store']); // Thêm một thể loại mới
    Route::put('/genres/{id}', [GenreController::class, 'update']); // Cập nhật một thể loại
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']); // Xóa một thể loại
    //______________________________________ATTACH ACTOR AND GENRE_______________________________________________
    Route::post('movies/{id}/actors', [MovieController::class, 'attachActors']); // Thêm diễn viên vào phim
    Route::post('movies/{id}/genres', [MovieController::class, 'attachGenres']); // Thêm thể loại vào phim
});
//______________________________________EPISODE_______________________________________________
Route::middleware(['jwt.verify', 'admin'])->group(function () {
    Route::post('/movies/{movie_id}/episodes', [EpisodeController::class, 'store']); // Thêm một tập phim mới
    Route::put('/movies/{movie_id}/episodes/{episode_id}', [EpisodeController::class, 'update']); // Cập nhật một tập phim
    Route::delete('/movies/{movie_id}/episodes/{episode_id}', [EpisodeController::class, 'destroy']); // Xóa một tập phim
});

    Route::get('/movies/{movie_id}/episodes', [EpisodeController::class, 'index']); // Lấy danh sách các tập phim
    Route::get('/movies/{movie_id}/episodes/{episode_id}', [EpisodeController::class, 'show']); // Lấy thông tin chi tiết một tập phim
    Route::get('/movies/{movie_id}/{episode_id}', [EpisodeController::class, 'showvip']); // Lấy thông tin chi tiết một tập phim

//______________________________________FILTER_______________________________________________
Route::get('/movies/filter/country/{country}', [MovieController::class, 'filterByCountry']); // lọc phim theo quốc gia
Route::get('/movies/filter/director/{director}', [MovieController::class, 'filterByDirector']); // lọc phim theo đạo diễn
Route::get('/movies/filter/actor/{actorId}', [MovieController::class, 'filterByActor']); // lọc phim theo diễn viên
Route::get('/movies-type/{typeId}', [MovieController::class, 'filterByType']); // lọc phim theo thể loại movie type
Route::get('/movies-genre/{genreId}', [MovieController::class, 'filterByGenre']); // lọc phim theo thể loại genre
//______________________________________COMMENT_______________________________________________
Route::middleware(['jwt.verify'])->post('/movies/{movieId}/comment', [CommentController::class, 'store']); // Thêm bình luận
Route::get('/movies/{movieId}/comments', [CommentController::class, 'index']); // Lấy danh sách bình luận
Route::middleware(['jwt.verify', 'admin'])->group(function () {
    Route::get('/movies/{movieId}/comments/{commentId}', [CommentController::class, 'show']); // Lấy thông tin chi tiết một bình luận
    Route::put('/movies/{movieId}/comments/{commentId}', [CommentController::class, 'update']); // Cập nhật một bình luận
    Route::delete('/movies/{movieId}/comments/{commentId}', [CommentController::class, 'destroy']); // Xóa một bình luận
});
//______________________________________FAVOURITE_______________________________________________
Route::middleware(['jwt.verify'])->group(function () {
    Route::post('/movies/{movieId}/favourites', [FavouriteController::class, 'add']); // Thêm phim vào danh sách yêu thích
    Route::get('/favourites', [FavouriteController::class, 'index']); // Xem danh sách phim yêu thích của người dùng
    Route::delete('/movies/{movieId}/favourites', [FavouriteController::class, 'remove']); // Xoá phim khỏi danh sách yêu thích
});
//______________________________________HISTORY_______________________________________________
Route::middleware(['jwt.verify'])->group(function () {
    Route::post('/movies/{movie_id}/episodes/{episode_id}/history', [HistoryController::class, 'store']); // Lưu lịch sử xem phim
    Route::get('/history', [HistoryController::class, 'index']); // Lấy danh sách lịch sử xem phim
});

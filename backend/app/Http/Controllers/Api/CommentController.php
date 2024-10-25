<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth; // để lấy thông tin user đang đăng nhập

class CommentController extends Controller
{
    public function index($movieId)
    {
        // Kiểm tra movie có tồn tại không
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        // Lấy tất cả bình luận của bộ phim
        $comments = $movie->comments()->get();

        // Kiểm tra nếu không có bình luận
        if ($comments->isEmpty()) {
            return response()->json(['message' => 'Không có comment nào ở movie này.'], 200);
        }
        
        return response()->json($comments);
    }

    public function show($movieId, $commentId)
    {
        // Kiểm tra movie có tồn tại không
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        // Lấy bình luận theo ID
        $comment = Comment::where('movie_id', $movieId)->find($commentId);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found.'], 404);
        }

        return response()->json($comment);
    }


    public function store(Request $request, $movieId)
    {
        // Validate dữ liệu
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:10',
        ]);

        // Lấy id người dùng từ JWT
        $userId = Auth::id();

        // Kiểm tra movie có tồn tại không
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        // Tạo comment mới
        $comment = Comment::create([
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'status' => 1, // có thể là 0 nếu cần duyệt
            'user_id' => $userId,
            'movie_id' => $movieId,
        ]);

        // Cập nhật rating cho movie
        $movie->updateRating();

        return response()->json(['message' => 'Comment created successfully.', 'comment' => $comment], 201);
    }


    public function update(Request $request, $movieId, $commentId)
    {
        // Validate dữ liệu
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:10',
        ]);

        // Tìm comment
        $comment = Comment::where('movie_id', $movieId)->where('comment_id', $commentId)->first();

        if (!$comment) {
            return response()->json(['message' => 'Comment not found.'], 404);
        }

        // Cập nhật comment
        $comment->update([
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'status' => 1, // hoặc một giá trị khác tùy thuộc vào logic của bạn
        ]);

        // Cập nhật lại rating cho movie
        $movie = Movie::find($movieId);
        $movie->updateRating();

        return response()->json(['message' => 'Comment updated successfully.', 'comment' => $comment], 200);
    }



    public function destroy($movieId, $commentId)
    {
        // Tìm comment
        $comment = Comment::where('movie_id', $movieId)->where('comment_id', $commentId)->first();

        if (!$comment) {
            return response()->json(['message' => 'Comment not found.'], 404);
        }

        // Xóa comment
        $comment->delete();

        // Cập nhật lại rating cho movie
        $movie = Movie::find($movieId);
        $movie->updateRating();

        return response()->json(['message' => 'Comment deleted successfully.']);
    }
}
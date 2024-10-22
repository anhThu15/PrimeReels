<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\History;
use App\Models\Episode;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    // Lưu lịch sử xem phim
    public function store($movieId, $episodeId)
    {
        // Kiểm tra xem tập phim có tồn tại không
        $episode = Episode::where('episode_id', $episodeId)->where('movie_id', $movieId)->first();
        if (!$episode) {
            return response()->json(['message' => 'Episode not found.'], 404);
        }

        // Tạo mới lịch sử xem
        $history = History::create([
            'watched_at' => now(),
            'user_id' => Auth::id(),
            'episode_id' => $episodeId,
        ]);

        return response()->json(['message' => 'Watch history saved successfully.', 'history' => $history], 201);
    }



    // Xem lịch sử xem phim của người dùng
    public function index()
    {
        // Lấy danh sách lịch sử xem của người dùng hiện tại
        $userId = Auth::id();
        $history = History::where('user_id', $userId)->with('episode')->get();

        return response()->json(['history' => $history]);
    }
}
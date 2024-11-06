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
        $episode = Episode::where('episode_number', $episodeId)->where('movie_id', $movieId)->first();
        if (!$episode) {
            return response()->json(['message' => 'Phim không tồn tại'], 404);
        }
        $history = History::where('user_id', Auth::id())
                ->where('episode_id', $episode->episode_id)  
                ->first();

        if ($history) {
            $history->update([
                'watched_at' => now(),  
            ]);
        } else {
            History::create([
                'watched_at' => now(),
                'user_id' => Auth::id(),
                'episode_id' => $episode->episode_id,  
                ]);
        }
    return response()->json(['message' => 'Lịch sử xem đã được cập nhật'], 200);
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
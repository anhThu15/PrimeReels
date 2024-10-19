<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Movie;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    // Lấy danh sách episodes của một movie
    public function index(Movie $movie)
    {
        return response()->json($movie->episodes);
    }

    // Thêm episode mới
    // Upload video trong phương thức store
    public function store($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required|integer',
            'video' => 'required|file|mimes:mp4,mov,avi,wmv|max:10240', // max 10MB
            'duration' => 'required|integer',
            'episode_number' => 'required|integer',
        ]);
        // Tự động cập nhật thời gian hiện tại cho 'release_date'
        $validatedData['release_date'] = now();
        // Upload the video file
        $videoPath = $request->file('video')->store('videos', 'public'); // Lưu vào thư mục storage/app/public/videos

        // Tạo mới tập phim
        $episode = Episode::create([
            'status' => $validatedData['status'],
            'video_url' => $videoPath, // lưu đường dẫn video
            'duration' => $validatedData['duration'],
            'release_date' => $validatedData['release_date'],
            'episode_number' => $validatedData['episode_number'],
            'movie_id' => $movieId,
        ]);

        return response()->json(['message' => 'Tập phim đã được thêm thành công!', 'episode' => $episode], 201);
    }


    // Lấy thông tin một episode
    public function show($movieId, $episodeId)
    {
        // Tìm tập phim theo ID và kiểm tra thuộc về phim nào
        $episode = Episode::where('episode_id', $episodeId)
            ->where('movie_id', $movieId)
            ->firstOrFail();

        // Lấy URL video (nếu cần)

        // Trả về thông tin tập phim, bao gồm cả đường dẫn video
        return response()->json([
            'episode' => $episode,
            'video_url' => asset('storage/' . $episode->video_url) // Tạo đường dẫn đầy đủ
        ]);
    }

    public function showvip($movieId, $episodeNumber)
    {
        // Tìm tập phim theo movie_id và episode_number
        $episode = Episode::where('movie_id', $movieId)
            ->where('episode_number', $episodeNumber)
            ->first();

        // Kiểm tra nếu tập phim không tồn tại
        if (!$episode) {
            return response()->json(['message' => 'Tập phim này chưa có.'], 404);
        }

        return response()->json([
            'episode' => $episode,
        ]);
    }

    // Cập nhật episode
    public function update(Request $request, Movie $movie, Episode $episode)
    {
        $validatedData = $request->validate([
            'status' => 'sometimes|required|integer',
            'video_url' => 'sometimes|required|string|max:1000',
            'duration' => 'sometimes|required|integer',
            'release_date' => 'sometimes|required|date',
            'episode_number' => 'sometimes|required|integer',
        ]);

        // Cập nhật release_date với thời gian hiện tại
        $validatedData['release_date'] = now();

        $episode->update($validatedData);

        return response()->json($episode);
    }

    // Xóa episode
    public function destroy(Movie $movie, Episode $episode)
    {
        $episode->delete();

        return response()->json(['message' => 'Episode deleted successfully']);
    }
}

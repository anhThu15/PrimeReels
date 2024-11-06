<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Movie;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    // Lấy danh sách episodes của một movie
    public function index(Request $request, $id)
    {
        $episodes =  Episode::where('movie_id', "=", $id)->get();
        return response()->json($episodes);
    }

    // Thêm episode mới
    // Upload video trong phương thức store
    public function store($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required|integer',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv',
            'link' => 'nullable|url',
            'duration' => 'required|integer',
            'episode_number' => 'required|integer',
        ]);
        if (!$request->hasFile('video') && !$request->input('link')) {
            return response()->json(['message' => 'Vui lòng cung cấp tệp video hoặc liên kết video.'], 422);
        }

        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('videos', 'public');
            $validatedData['video_url'] = $videoPath;
        } else {
            $validatedData['video_url'] = $request->input('link');
        }
        // Tự động cập nhật thời gian hiện tại cho 'release_date'
        $validatedData['release_date'] = now();

        // Tạo mới tập phim
        $episode = Episode::create([
            'status' => $validatedData['status'],
            'video_url' => $validatedData['video_url'], 
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
        $episode = Episode::where('episode_number', $episodeId)
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
    public function update($movie_id, $episode_id, Request $request)
    {
        $validatedData = $request->validate([
            'status' => 'required|integer',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv',
            'link' => 'nullable|url',
            'duration' => 'required|integer',
            'episode_number' => 'required|integer',
        ]);
        if (!$request->hasFile('video') && !$request->input('link')) {
            return response()->json(['message' => 'Vui lòng cung cấp tệp video hoặc liên kết video.'], 422);
        }
    
        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('videos', 'public');
            $validatedData['video_url'] = $videoPath;
        } else {
            $validatedData['video_url'] = $request->input('link');
        }
    
        $validatedData['release_date'] = now(); // Cập nhật release_date
    
        $movie = Movie::where('movie_id', $movie_id)->first();
        $episode = Episode::where('episode_number', $episode_id)
            ->where('movie_id', $movie->movie_id)
            ->first();
    
        if (!$episode) {
            return response()->json(['message' => 'Tập phim không tồn tại.'], 404);
        }
    
        $episode->update([
            'status' => $validatedData['status'],
            'video_url' => $validatedData['video_url'],
            'duration' => $validatedData['duration'],
            'release_date' => $validatedData['release_date'],
            'episode_number' => $validatedData['episode_number'],
        ]);
    
        return response()->json($episode);
    }
    

    // Xóa episode
    public function destroy($movie_id, $episode_id)
    {
        $movie = Movie::where('movie_id', "=", $movie_id)->first();
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }
    
        $episode = Episode::where('episode_number', '=', $episode_id)
        ->where('movie_id', '=', $movie->movie_id)
        ->first();
        if (!$episode) {
            return response()->json(['error' => 'Episode not found'], 404);
        }
        $episode->delete();

        return response()->json(['message' => 'Episode deleted successfully']);
    }
}

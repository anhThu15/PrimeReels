<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function uploadVideo(Request $request)
    {
        // Kiểm tra nếu có file được tải lên
        if ($request->hasFile('video')) {
            // Validate file: chỉ chấp nhận file video
            $request->validate([
                'video' => 'required|mimes:mp4,mov,ogg,qt|max:20000' // giới hạn file 20MB
            ]);

            // Lưu file vào thư mục storage/app/public/videos
            $path = $request->file('video')->store('public/videos');

            // Lấy tên file từ đường dẫn
            $fileName = basename($path);

            // Trả về URL để xem video
            $videoUrl = Storage::url($path);

            return response()->json([
                'status' => 'success',
                'message' => 'Video uploaded successfully!',
                'video_url' => $videoUrl,
                'file_name' => $fileName
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No video file uploaded.'
        ], 400);
    }
}
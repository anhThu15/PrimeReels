<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    // Lấy danh sách tất cả các thể loại phim
    public function index()
    {
        return Genre::all();
    }

    // Tạo một thể loại phim mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:1000',
            'status' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $genre = Genre::create($validated);
        return response()->json($genre, 201);
    }

    // Hiển thị thông tin chi tiết của một thể loại phim
    public function show($id)
    {
        return Genre::findOrFail($id);
    }

    // Cập nhật thông tin thể loại phim
    public function update(Request $request, $id)
    {
        $genre = Genre::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:1000',
            'status' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $genre->update($validated);
        return response()->json($genre, 200);
    }

    // Xóa một thể loại phim
    public function destroy($id)
    {
        Genre::destroy($id);
        return response()->json(null, 204);
    }
}
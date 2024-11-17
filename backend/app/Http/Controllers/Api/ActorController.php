<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    // Lấy danh sách tất cả các diễn viên
    public function index()
    {
        return Actor::all();
    }

    // Tạo một diễn viên mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:1000',
            'status' => 'required|integer',
            'biography' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'image_url' => 'nullable|file|max:1000',
        ]);

        $actor = Actor::create($validated);
        return response()->json($actor, 201);
    }

    // Hiển thị thông tin chi tiết của một diễn viên
    public function show($id)
    {
        return Actor::findOrFail($id);
    }

    // Cập nhật thông tin diễn viên
    public function update(Request $request, $id)
    {
        $actor = Actor::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:1000',
            'status' => 'required|integer',
            'biography' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'image_url' => 'nullable|file|max:1000',
        ]);

        $actor->update($validated);
        return response()->json($actor, 200);
    }

    // Xóa một diễn viên
    public function destroy($id)
    {
        Actor::destroy($id);
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\MovieType;
use Illuminate\Http\Request;

class MovieTypeController extends Controller
{
    // Lấy danh sách tất cả Movie Types
    public function index()
    {
        $movieTypes = MovieType::all();
        return response()->json($movieTypes);
    }

    // Tạo một Movie Type mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:1000',
        ]);

        $movieType = MovieType::create($request->all());
        return response()->json($movieType, 201);
    }

    // Lấy thông tin chi tiết một Movie Type
    public function show($id)
    {
        $movieType = MovieType::find($id);

        if (!$movieType) {
            return response()->json(['message' => 'Movie Type not found'], 404);
        }

        return response()->json($movieType);
    }

    // Cập nhật một Movie Type
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:1000',
        ]);

        $movieType = MovieType::find($id);

        if (!$movieType) {
            return response()->json(['message' => 'Movie Type not found'], 404);
        }

        $movieType->update($request->all());
        return response()->json($movieType);
    }

    // Xóa một Movie Type
    public function destroy($id)
    {
        $movieType = MovieType::find($id);

        if (!$movieType) {
            return response()->json(['message' => 'Movie Type not found'], 404);
        }

        $movieType->delete();
        return response()->json(['message' => 'Movie Type deleted']);
    }
}

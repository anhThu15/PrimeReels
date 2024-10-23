<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\MovieType;
use App\Models\Genre;
use App\Models\Movie;
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
    public function show($id, $genreId)
    {
        $movieType = MovieType::find($id);

        if (!$movieType) {
            return response()->json(['message' => 'Movie Type not found'], 404);
        }

        // Kiểm tra genreId có tồn tại không
        $genre = Genre::find($genreId);
        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        // Tìm các movie thuộc movie_type_id và genre_id
        $movies = Movie::where('movie_type_id', $id)
            ->whereHas('genres', function ($query) use ($genreId) {
                $query->where('movies_genres.genre_id', $genreId);
            })->get();

        return response()->json(['movieType' => $movieType, 'movies' => $movies]);
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

    // Lọc movie_types và country
    public function filterByCountry($id, $country)
    {
        // Kiểm tra movie type tồn tại
        $movieType = MovieType::find($id);

        if (!$movieType) {
            return response()->json(['message' => 'Movie Type not found'], 404);
        }

        // Lọc các movie theo movie_type_id và country
        $movies = Movie::where('movie_type_id', $id)
            ->where('country', $country)
            ->get();

        return response()->json(['movieType' => $movieType, 'movies' => $movies]);
    }
}

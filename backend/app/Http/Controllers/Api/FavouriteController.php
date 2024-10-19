<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favourite;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller
{
    // Thêm phim vào danh sách yêu thích
    public function add(Request $request, $movieId)
    {
        // Kiểm tra xem phim có tồn tại không
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        // Kiểm tra xem phim đã có trong danh sách yêu thích chưa
        $existingFavourite = Favourite::where('user_id', Auth::id())
            ->where('movie_id', $movieId)
            ->first();

        if ($existingFavourite) {
            return response()->json(['message' => 'Movie already in favourites.'], 400);
        }

        // Thêm vào danh sách yêu thích
        $favourite = Favourite::create([
            'added_date' => now(),
            'user_id' => Auth::id(),
            'movie_id' => $movieId,
        ]);

        return response()->json(['message' => 'Movie added to favourites.', 'favourite' => $favourite], 201);
    }

    // Xem danh sách phim yêu thích của người dùng
    public function index()
    {
        $userId = Auth::id();
        $favourites = Favourite::with('movie')->where('user_id', $userId)->get();

        return response()->json($favourites);
    }

    // Xoá phim khỏi danh sách yêu thích
    public function remove($movieId)
    {
        // Kiểm tra xem phim có tồn tại không
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['message' => 'Movie not found.'], 404);
        }

        // Tìm kiếm Favourite
        $favourite = Favourite::where('user_id', Auth::id())
            ->where('movie_id', $movieId)
            ->first();

        if (!$favourite) {
            return response()->json(['message' => 'Movie not found in favourites.'], 404);
        }

        // Xoá khỏi danh sách yêu thích
        $favourite->delete();

        return response()->json(['message' => 'Movie removed from favourites.'], 200);
    }
}
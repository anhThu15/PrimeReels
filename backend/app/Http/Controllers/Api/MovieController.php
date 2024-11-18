<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    // Get all movies
    public function index()
    {
        $movies = Movie::with(['movieType', 'genres'])->get();
        return response()->json($movies);
    }

    // Store new movie
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'avatar' => 'nullable|string|max:1000',
            'country' => 'required|string|max:100',
            'director' => 'required|string|max:100',
            'status' => 'required|integer',
            'rating' => 'required|numeric|min:0|max:10',
            'views' => 'required|integer',
            'duration' => 'required|integer',
            'description' => 'nullable|string',
            'banner' => 'nullable|string|max:1000',
            'poster' => 'nullable|string|max:1000',
            'favorites_count' => 'nullable|integer',
            'movie_type_id' => 'required|exists:movie_types,movie_type_id',
        ]);

        $movie = Movie::create($validatedData);
        return response()->json($movie, 201);
    }

    // Get movie details
    public function show($id)
    {
        $movie = Movie::with(['episode','movieType', 'actors', 'genres', 'comments.user'])->find($id);

        if (!$movie) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        // Tăng lượt xem
            $movie->increment('views'); // Tăng số lượt xem lên 1

        return response()->json($movie);
    }

    public function show_admin($id)
    {
        $movie = Movie::with(['episode','movieType', 'actors', 'genres', 'comments.user'])->find($id);

        if (!$movie) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        return response()->json($movie);
    }

    // Update movie
    public function update(Request $request, $movie_id)
    {
        $movie = Movie::find($movie_id);

        if (!$movie) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'avatar' => 'nullable|string|max:1000',
            'country' => 'required|string|max:100',
            'director' => 'required|string|max:100',
            'status' => 'required|integer',
            'rating' => 'required|numeric|min:0|max:10', 
            'views' => 'required|integer',
            'duration' => 'required|integer',
            'description' => 'nullable|string',
            'banner' => 'nullable|string|max:1000',
            'poster' => 'nullable|string|max:1000',
            'favorites_count' => 'nullable|integer',
            'movie_type_id' => 'required|exists:movie_types,movie_type_id',
        ]);

        $movie->update($validatedData);

        return response()->json($movie);
    }

    // Delete movie
    public function destroy($movie_id)
    {
        $movie = Movie::find($movie_id);

        if (!$movie) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Phim được xoá thành công']);
    }

    public function attachActors($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'actor_id' => 'required|array',
            'actor_id.*' => 'exists:actors,actor_id',
        ]);

        // Kiểm tra xem mảng Actor_id có trống sau khi xác thực không
        if (empty($validatedData['actor_id'])) {
            return response()->json(['error' => 'Không có diễn viên nào được tìm thấy.'], 404);
        }

        // Tìm phim theo ID
        $movie = Movie::findOrFail($movieId);

        // thêm diễn viên vào phim
        $movie->actors()->attach($validatedData['actor_id']);

        return response()->json(['message' => 'Phim đã được thêm diễn viên!'], 200);
    }
    public function detachActors($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'actor_id' => 'required|array',
            'actor_id.*' => 'exists:actors,actor_id',
        ]);

        // Kiểm tra xem mảng Actor_id có trống sau khi xác thực không
        if (empty($validatedData['actor_id'])) {
            return response()->json(['error' => 'Không có diễn viên nào được tìm thấy.'], 404);
        }

        // Tìm phim theo ID
        $movie = Movie::findOrFail($movieId);

        // Xoá diễn viên vào phim
        $movie->actors()->detach($validatedData['actor_id']);

        return response()->json(['message' => 'Diễn viên đã được xoá khỏi phim!'], 200);
    }
    public function attachGenres($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'genre_id' => 'required|array',
            'genre_id.*' => 'exists:genres,genre_id',
        ]);

        // Check if the genre_id array is empty after validation
        if (empty($validatedData['genre_id'])) {
            return response()->json(['error' => 'Không có thể loại nào được tìm thấy.'], 404);
        }

        // Find the movie by ID
        $movie = Movie::findOrFail($movieId);

        // Attach genres to the movie
        $movie->genres()->attach($validatedData['genre_id']);

        return response()->json(['message' => 'Phim đã được thêm thể loại!'], 200);
    }
    public function detachGenres($movieId, Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'genre_id' => 'required|array',
            'genre_id.*' => 'exists:genres,genre_id',
        ]);

        // Check if the genre_id array is empty after validation
        if (empty($validatedData['genre_id'])) {
            return response()->json(['error' => 'Không có thể loại nào được tìm thấy.'], 404);
        }

        // Find the movie by ID
        $movie = Movie::findOrFail($movieId);

        // Attach genres to the movie
        $movie->genres()->detach($validatedData['genre_id']);

        return response()->json(['message' => 'Phim đã xoá thể loại!'], 200);
    }   

    public function filterByCountry($country)
    {
        // Lấy danh sách phim theo quốc gia
        $movies = Movie::where('country', $country)->get();

        // Kiểm tra nếu không có phim nào
        if ($movies->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        return response()->json($movies);
    }
    // Phương thức lọc theo đạo diễn
    public function filterByDirector($director)
    {
        // Lấy danh sách phim theo quốc gia
        $movies = Movie::where('director', $director)->get();

        // Kiểm tra nếu không có phim nào
        if ($movies->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
        }

        return response()->json($movies);
    }

    // Phương thức lọc theo diễn viên
    public function filterByActor($actorId)
{
    // Lấy danh sách phim theo diễn viên
    $movies = Movie::whereHas('actors', function ($query) use ($actorId) {
        $query->where('actors.actor_id', $actorId); // Chỉ định rõ bảng actors
    })->get();

    // Kiểm tra nếu không có phim nào
    if ($movies->isEmpty()) {
        return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
    }

    return response()->json($movies);
}

    // Phương thức lọc theo thể loại phim movie type
public function filterByType($typeId)
{
    // Lấy danh sách phim theo loại phim
    $movies = Movie::where('movie_type_id', $typeId)->get();

    // Kiểm tra nếu không có phim nào
    if ($movies->isEmpty()) {
        return response()->json(['message' => 'Phim không tồn tại'], 404);
    }

    return response()->json($movies);
}

// lọc phim theo thể loại genre
public function filterByGenre($genreId)
{
    // Lấy danh sách phim theo genre_id
    $movies = Movie::whereHas('genres', function ($query) use ($genreId) {
        $query->where('movies_genres.genre_id', $genreId); // Chỉ rõ bảng ở đây
    })->get();

    // Kiểm tra nếu không có phim nào
    if ($movies->isEmpty()) {
        return response()->json(['message' => 'Không tìm thấy phim nào'], 404);
    }

    return response()->json($movies);
}


}
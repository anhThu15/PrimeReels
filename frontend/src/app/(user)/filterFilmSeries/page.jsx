"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./filterFilmSeries.css";
import Link from 'next/link';

export default function FilterFilmSeries() {
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [genreId, setGenreId] = useState('');
    const [movieTypeId, setMovieTypeId] = useState(1);
    const [country, setCountry] = useState('');
    const [genreName, setGenreName] = useState('');
    const [movieTypeName, setMovieTypeName] = useState('Phim Bộ');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch genres from the API
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/genres');
                const data = await response.json();
                setGenres(data); // Assuming data is an array of genres
            } catch (err) {
                setError('Không thể tải thể loại phim');
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const genreParam = searchParams.get('genreId');
        const movieTypeParam = searchParams.get('movieTypeId');
        const countryParam = searchParams.get('country');

        if (genreParam) {
            setGenreId(genreParam);
            setGenreName(getGenreName(genreParam));
        }

        if (movieTypeParam) {
            const parsedMovieTypeId = Number(movieTypeParam);
            setMovieTypeId(parsedMovieTypeId);
            setMovieTypeName(getMovieTypeName(parsedMovieTypeId));
        }

        if (countryParam) {
            setCountry(countryParam);
        }
    }, []);

    useEffect(() => {
        if (genreId || country) {
            fetchMovies(genreId, movieTypeId, country);
        }
    }, [genreId, movieTypeId, country]);

    const getGenreName = (id) => {
        const genre = genres.find(g => g.genre_id === Number(id));
        return genre ? genre.name : '';
    };

    const getMovieTypeName = (id) => {
        switch (id) {
            case 1: return 'Phim Bộ';
            case 2: return 'Phim Lẻ';
            case 3: return 'Phim Hoạt Hình';
            default: return '';
        }
    };

    const fetchMovies = async (genreId, movieTypeId, country) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/${genreId || ''}`);
            if (!response.ok) {
                throw new Error('Không tìm thấy phim nào');
            }
            const data = await response.json();
            const filteredMovies = data.filter(movie => {
                return movie.movie_type_id === movieTypeId && (!country || movie.country === country);
            });
            setMovies(filteredMovies);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        setGenreId(selectedGenreId);
        setGenreName(getGenreName(selectedGenreId));

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('genreId', selectedGenreId);
        newUrl.searchParams.set('movieTypeId', movieTypeId);

        if (country) {
            newUrl.searchParams.set('country', country);
        } else {
            newUrl.searchParams.delete('country');
        }
        
        router.push(newUrl.toString());
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);

        const newUrl = new URL(window.location.href);
        
        if (selectedCountry) {
            newUrl.searchParams.set('country', selectedCountry);
        } else {
            newUrl.searchParams.delete('country');
        }

        router.push(newUrl.toString());
    };

    const getTitle = () => {
        const movieType = getMovieTypeName(movieTypeId);
        const genre = genreName;
        const countryText = country ? `> ${country}` : '';

        return `${movieType} ${countryText} > ${genre}`;
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="product-slide">
                <div className="container">
                    <div className="top-page-filter">
                        <div className="header-text">
                            <h1 className="text-light">{getTitle()}</h1>
                        </div>
                        <div className="header-filter">
                            <div className="form-group">
                                <label htmlFor="genreSelect">Chọn thể loại:</label>
                                <select
                                    id="genreSelect"
                                    className="form-select"
                                    onChange={handleGenreChange}
                                >
                                    <option value="">-- Chọn thể loại --</option>
                                    {genres.map(genre => (
                                        <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="countrySelect">Chọn quốc gia:</label>
                                <select
                                    id="countrySelect"
                                    className="form-select"
                                    onChange={handleCountryChange}
                                >
                                    <option value="">-- Chọn quốc gia --</option>
                                    <option value="Phim Mỹ">Phim Mỹ</option>
                                    <option value="Trung Quốc">Trung Quốc</option>
                                    <option value="Hàn Quốc">Hàn Quốc</option>
                                    <option value="Việt Nam">Việt Nam</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading && <div className="text-light">Đang tải...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-flex flex-wrap mt-3">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <div
                                    key={movie.movie_id}
                                    className="card text-bg-dark hover-box"
                                    style={{ width: "23%", margin: "10px" }}
                                >
                                    <div>
                                        <img
                                            src={movie.banner}
                                            className="card-img"
                                            alt={movie.title}
                                            style={{ objectFit: "cover", width: "100%", height: "400px" }}
                                        />
                                    </div>
                                    <div className="play-icon-overlay">
                                        <div
                                            className="rounded-circle bg-black opacity-50 border border-white"
                                            style={{ width: "50px", height: "50px" }}
                                        >
                                            <Link href={`/film/${movie.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && (
                                <div className="alert alert-danger no-movies" role="alert">
                                    Không có thể loại phim này trong phim lẻ
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

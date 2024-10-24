"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./filterFilmSeries.css";

export default function FilterFilmSeries() {
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [genreId, setGenreId] = useState('');
    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const genreParam = searchParams.get('genreId');

        if (genreParam) {
            setGenreId(genreParam);
            switch (genreParam) {
                case '1':
                    setGenreName('Hành động');
                    break;
                case '2':
                    setGenreName('Drama');
                    break;
                case '3':
                    setGenreName('Hài hước');
                    break;
                default:
                    setGenreName('');
                    break;
            }
        }
    }, []);

    useEffect(() => {
        fetchMovies(genreId);
    }, [genreId]);

    const fetchMovies = (genreId) => {
        if (genreId) {
            setLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/${genreId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Không tìm thấy phim nào');
                    }
                    return response.json();
                })
                .then((data) => {
                    const filteredMovies = data.filter(movie => movie.movie_type_id === 1);
                    console.log(filteredMovies);
                    setMovies(filteredMovies);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    };
    
    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        setGenreId(selectedGenreId);

        switch (selectedGenreId) {
            case '1':
                setGenreName('Hành động');
                break;
            case '2':
                setGenreName('Drama');
                break;
            case '3':
                setGenreName('Hài hước');
                break;
            default:
                setGenreName('');
                break;
        }
        const newUrl = new URL(window.location.href);
        if (selectedGenreId) {
            newUrl.searchParams.set('genreId', selectedGenreId);
        } else {
            newUrl.searchParams.delete('genreId');
        }
        router.push(newUrl.toString());
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="product-slide">
                <div className="container">
                    <div className="top-page-filter">
                        <h1 className="text-light">
                            Phim Bộ <span></span> {genreName}
                        </h1>
                        <div className="form-group">
                            <label htmlFor="genreSelect">Chọn thể loại:</label>
                            <select id="genreSelect" className="form-select" onChange={handleGenreChange}>
                                <option value="">-- Chọn thể loại --</option>
                                <option value="1">Hành động</option>
                                <option value="2">Drama</option>
                                <option value="3">Hài hước</option>
                            </select>
                        </div>
                    </div>
                    {loading && <div className="text-light">Đang tải...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="product-slider mt-3">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <div key={movie.movie_id} className="product-slide__item" style={{ width: "285px" }}>
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a className="product-thumb__image" href={`/shop/product-detail.html?id=${movie.movie_id}`} tabIndex="0">
                                                <img src={movie.banner} alt={movie.title} />
                                            </a>
                                            <div className="product-thumb__actions">
                                                <div className="product-btn">
                                                    <a className="btn -white product__actions__item -round product-atc" href="#" tabIndex="0">
                                                        <i className="fas fa-shopping-bag"></i>
                                                    </a>
                                                </div>
                                                <div className="product-btn">
                                                    <a className="btn -white product__actions__item -round product-qv" href="#" tabIndex="0">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                </div>
                                                <div className="product-btn">
                                                    <a className="btn -white product__actions__item -round" href="#" tabIndex="0">
                                                        <i className="fas fa-heart"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-content">
                                            <div className="product-content__header">
                                                <div className="product-category text-white">
                                                    <a className="product-name" href={`/shop/product-detail.html?id=${movie.movie_id}`} tabIndex="0">{movie.title}</a>
                                                </div>
                                                <div className="rate">
                                                    {Array.from({ length: Math.round(movie.rating) }, (_, i) => (
                                                        <i key={i} className="fas fa-star"></i>
                                                    ))}
                                                    {Array.from({ length: 5 - Math.round(movie.rating) }, (_, i) => (
                                                        <i key={i} className="far fa-star"></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && <div className="text-light">Không tìm thấy phim nào phù hợp.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

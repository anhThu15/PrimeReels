"use client";
import Link from "next/link";
import "../../globals.css";
import SlideShow from "../components/slideshow";
import SlideShowAnother from "../components/slideshowAnother";
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/banner";
import SlideShow2 from "../components/slideshow2";
import SlideShow3 from "../components/slideshow3";
import SlideShow4 from "../components/slideshow4";
import SlideShowAnother2 from "../components/slideshowAnother2";
import { useRouter } from "next/navigation";

export default function OddFilm() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [random, setRandom] = useState([]);
  const [better, setBetter] = useState([]);
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
      setGenres(res.data);
    };

    const fetchMovies = async () => {
      const resRandom = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`);
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      setRandom(shuffleArray(resRandom.data));

      const resBetter = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`);
      resBetter.data.sort((a, b) => b.favorites_count - a.favorites_count);
      setBetter(resBetter.data);

      const resCountry = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/1/country/Việt Nam`);
      setCountry(resCountry.data.movies);

      const resDate = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`);
      resDate.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setDate(resDate.data);

      // Fetch movies for each genre and store them in a single state
      const genresFetchPromises = genres.map(async (genre) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/${genre.genre_id}`);
        return { genreId: genre.genre_id, movies: res.data.movies };
      });

      const genresMovies = await Promise.all(genresFetchPromises);
      const moviesMap = genresMovies.reduce((acc, { genreId, movies }) => {
        acc[genreId] = movies;
        return acc;
      }, {});

      setMoviesByGenre(moviesMap);
    };

    fetchGenres();
    fetchMovies();
  }, [genres]);

  useEffect(() => {
    let newFilteredMovies = [];

    if (selectedGenreId) {
      newFilteredMovies = moviesByGenre[selectedGenreId] || [];
      setFilteredMovies(newFilteredMovies);
    } else {
      setFilteredMovies([
        ...Object.values(moviesByGenre).flat(),
        ...random,
        ...better,
        ...country,
        ...date,
      ]);
    }
  }, [selectedGenreId, moviesByGenre, random, better, country, date]);

  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSelectedGenre(selectedGenreId);

    if (selectedGenreId) {
      router.push(`/filterFilmSeries?genreId=${selectedGenreId}&movieTypeId=2`);
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark p-0 text-white">
        <div className="container-fluid p-0">
          <Banner />
          <div className="container">
            <div className="group-select-box">
              <div className="form-group">
                <label htmlFor="genreSelect">Chọn thể loại:</label>
                <select id="genreSelect" value={selectedGenreId} onChange={handleGenreChange} className="form-select">
                  <option value="">-- Chọn thể loại --</option>
                  {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Đề Xuất Hôm Nay</h2>
            <SlideShow data={random} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Cập Nhập Mới Nhất</h2>
            <SlideShowAnother data={date} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Được Quan Tâm Nhất</h2>
            <SlideShow2 data={better} />
          </div>
          <div>
            {Object.keys(moviesByGenre).map((genreId) => (
              <div key={genreId}>
                <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>{genres.find(g => g.genre_id == genreId)?.name}</h2>
                <SlideShow3 data={moviesByGenre[genreId]} />
              </div>
            ))}
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Việt Nam</h2>
            <SlideShowAnother2 data={country} />
          </div>
        </div>
      </div>
    </>
  );
}

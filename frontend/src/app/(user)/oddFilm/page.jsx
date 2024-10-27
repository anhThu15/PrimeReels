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
  const [comedy, setComedy] = useState([]);
  const [drama, setDrama] = useState([]);
  const [action, setAction] = useState([]);
  const [random, setRandom] = useState([]);
  const [better, setBetter] = useState([]);
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState([]);
  const [genres, setGenres] = useState([]); // State for genres
  const [selectedGenreId, setSelectedGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
      setGenres(res.data); // Set the fetched genres
    };

    const fetchMovies = async () => {
      const resAction = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/2`);
      setAction(resAction.data.movies);

      const resComedy = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/3`);
      setComedy(resComedy.data.movies);

      const resDrama = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/1`);
      setDrama(resDrama.data.movies);

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

      const resCountry = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/1/country/Phim Mỹ`);
      setCountry(resCountry.data.movies);

      const resDate = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`);
      resDate.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setDate(resDate.data);
    };

    fetchGenres();
    fetchMovies();
  }, []);

  useEffect(() => {
    let newFilteredMovies = [];

    if (selectedGenreId) {
      // Filter movies based on selected genre ID
      if (selectedGenreId === "1") newFilteredMovies = action;
      else if (selectedGenreId === "2") newFilteredMovies = drama;
      else if (selectedGenreId === "3") newFilteredMovies = comedy;

      setFilteredMovies(newFilteredMovies);
    } else {
      // Show all movies if no genre is selected
      setFilteredMovies([...action, ...comedy, ...drama, ...random, ...better, ...country, ...date]);
    }
  }, [selectedGenreId, action, comedy, drama, random, better, country, date]);

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

              {/* <div className="form-group">
                <label htmlFor="countrySelect">Chọn quốc gia:</label>
                <select id="countrySelect" className="form-select">
                  <option value="">-- Chọn quốc gia --</option>
                  <option value="1">Phim Mỹ</option>
                  <option value="2">Phim Nhật Bản</option>
                  <option value="3">Phim Trung Quốc</option>
                </select>
              </div> */}
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
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Hành Động</h2>
            <SlideShow3 data={action} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Mỹ</h2>
            <SlideShowAnother2 data={country} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Hài Hước</h2>
            <SlideShow4 data={comedy} />
          </div>
        </div>
      </div>
    </>
  );
}

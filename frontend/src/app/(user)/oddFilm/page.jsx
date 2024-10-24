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
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]); // Đã khai báo comedy
  const [drama, setDrama] = useState([]); // Đã khai báo drama
  const [random, setRandom] = useState([]);
  const [better, setBetter] = useState([]);
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState([]);
  const [genre, setGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    const getAction = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/2`, { revalidate: 3600 });
      setAction(res.data.movies);
    };

    const getComedy = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/3`, { revalidate: 3600 });
      setComedy(res.data.movies);
    };

    const getDrama = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/1`, { revalidate: 3600 });
      setDrama(res.data.movies);
    };

    const getRandom = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`, { revalidate: 3600 });
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      setRandom(shuffleArray(res.data));
    };

    const getBetter = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`, { revalidate: 3600 });
      res.data.sort((a, b) => b.favorites_count - a.favorites_count);
      setBetter(res.data);
    };

    const getCountry = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/2/country/Phim Mỹ`, { revalidate: 3600 });
      setCountry(res.data.movies);
    };

    const getDate = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/2`, { revalidate: 3600 });
      res.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setDate(res.data);
    };

    getAction();
    getComedy();
    getDrama();
    getRandom();
    getBetter();
    getCountry();
    getDate();
  }, []);

  useEffect(() => {
    if (genre) {
      let newFilteredMovies = [];
      if (genre === "1") newFilteredMovies = action;  // Hành động
      else if (genre === "2") newFilteredMovies = drama; // Drama
      else if (genre === "3") newFilteredMovies = comedy; // Comedy
      
      setFilteredMovies(newFilteredMovies);
    } else {
      setFilteredMovies([...action, ...comedy, ...drama, ...random, ...better, ...country, ...date]);
    }
  }, [genre, action, comedy, drama, random, better, country, date]);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre);
    if (selectedGenre) {
      router.push(`/filterOddFilm?genreId=${selectedGenre}`); // Chuyển hướng với genreId
    }
  };


  return (
    <>
      <div className="container-fluid bg-dark p-0 font-monospace text-white">
        <div className="container-fluid p-0">
          <Banner />
          <div className="container">
            <div className="form-group">
              <label htmlFor="genreSelect">Chọn thể loại:</label>
              <select id="genreSelect" value={genre} onChange={handleGenreChange} className="form-select">
                <option value="">-- Chọn thể loại --</option>
                <option value="1">Hành động</option>
                <option value="2">Drama</option>
                <option value="3">Comedy</option>
              </select>
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

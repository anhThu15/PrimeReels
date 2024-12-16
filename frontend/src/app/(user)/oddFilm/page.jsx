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
import SlideShowAnother2 from "../components/slideshowAnother2";
import { useRouter } from "next/navigation";

export default function FilmSeries() {
  // Tạo state để lưu trữ dữ liệu phim cho các danh mục khác nhau
  const [moviesData, setMoviesData] = useState({
    random: [],
    better: [],
    country: [],
    date: [],
    moviesByGenre: {},
  });
  const [genres, setGenres] = useState([]); // Tạo state để lưu danh sách thể loại phim
  const [selectedGenreId, setSelectedGenre] = useState(''); // Lưu thể loại được chọn
  const [filteredMovies, setFilteredMovies] = useState([]); // Lưu danh sách phim được lọc theo thể loại
  const [bannerData, setMovieType2] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        // Gọi API để lấy thông tin về thể loại và phim cùng lúc bằng Promise.all
        const [resGenres, resMovies] = await Promise.all([
          axios.get(`/api/genres`), // Lấy danh sách thể loại phim
          axios.get(`/api/movies-type/2`) // Lấy danh sách phim
        ]);
        const bannerData = resMovies.data.slice(0, 3);
        setMovieType2(bannerData)
        const genresData = resGenres.data; // Lưu thể loại phim
        setGenres(genresData); // Cập nhật state cho danh sách thể loại

        const moviesData = resMovies.data.filter(movie => movie.status === 1); // Lọc các phim có trạng thái là 1 (hoạt động)

        // Hàm để xáo trộn danh sách phim cho phần phim ngẫu nhiên
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        // Chuẩn bị dữ liệu cho các phần danh sách phim khác nhau
        const randomMovies = shuffleArray([...moviesData]); // Phim ngẫu nhiên
        const betterMovies = [...moviesData].sort((a, b) => b.favorites_count - a.favorites_count); // Phim được yêu thích nhất
        const dateMovies = [...moviesData].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Phim mới nhất
        const resCountry = await axios.get(`/api/movie-types/2/country/Việt Nam`);
        const countryMovies = resCountry.data.movies.filter(movie => movie.status === 1); // Lấy danh sách phim theo quốc gia (Việt Nam)

        // Phân loại phim theo từng thể loại (để hiển thị mục Phim theo thể loại)
        const genresMovies = {};
        for (let genre of genresData) {
          const genreMovies = moviesData.filter(movie => movie.genre_id === genre.genre_id);
          if (genreMovies.length > 0) { // Chỉ thêm thể loại nếu có phim
            genresMovies[genre.genre_id] = genreMovies;
          }
        }

        // Cập nhật state với các dữ liệu đã xử lý
        setMoviesData({
          random: randomMovies,
          better: betterMovies,
          country: countryMovies,
          date: dateMovies,
          moviesByGenre: genresMovies,
        });
      } catch (error) {
        console.error("Error fetching data:", error); // Xử lý lỗi khi gọi API
      }
    };

    // Gọi hàm để lấy thông tin thể loại và phim
    fetchGenresAndMovies();
  }, []);

  useEffect(() => {
    let newFilteredMovies = [];

    if (selectedGenreId) {
      // Nếu người dùng chọn một thể loại, lọc danh sách phim theo thể loại
      newFilteredMovies = moviesData.moviesByGenre[selectedGenreId] || [];
      setFilteredMovies(newFilteredMovies);
    } else {
      // Nếu không chọn thể loại, hiển thị tất cả phim từ các danh mục
      setFilteredMovies([
        ...Object.values(moviesData.moviesByGenre).flat(), // Tất cả phim theo thể loại
        ...moviesData.random, // Phim ngẫu nhiên
        ...moviesData.better, // Phim được yêu thích nhất
        ...moviesData.country, // Phim theo quốc gia (Việt Nam)
        ...moviesData.date, // Phim mới cập nhật
      ]);
    }
  }, [selectedGenreId, moviesData]);

  // Hàm xử lý khi người dùng thay đổi thể loại phim (trên giao diện)
  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSelectedGenre(selectedGenreId);

    if (selectedGenreId) {
      router.push(`/filterFilmSeries?genreId=${selectedGenreId}&movieTypeId=2`); // Điều hướng đến trang lọc phim theo thể loại
    }
  };

  // Giao diện trang
  return (
    <>
      <div className="container-fluid bg-nenVipPro p-0 text-white">
        <div className="container-fluid p-0">
          <Banner bannerData={bannerData}
            genres={genres}
            onGenreChange={(genreId) => {
              setSelectedGenre(genreId); // Cập nhật state thể loại
              if (genreId) {
                router.push(`/filterFilmSeries?genreId=${genreId}&movieTypeId=2`); // Điều hướng
              }
            }}
          />
          {/* <div className="container">
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
          </div> */}
          {/* Hiển thị các danh mục phim */}
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Đề Xuất Hôm Nay</h2>
            <SlideShow data={moviesData.random} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Cập Nhập Mới Nhất</h2>
            <SlideShowAnother data={moviesData.date} />
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ Được Quan Tâm Nhất</h2>
            <SlideShow2 data={moviesData.better} />
          </div>
          <div>
            {Object.keys(moviesData.moviesByGenre).map((genreId) => (
              <div key={genreId}>
                <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>
                  {genres.find(g => g.genre_id == genreId)?.name}
                </h2>
                <SlideShow3 data={moviesData.moviesByGenre[genreId]} />
              </div>
            ))}
          </div>
          <div>
            <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Phim Lẻ  Việt Nam</h2>
            {/* <SlideShowAnother2 data={moviesData.country} /> */}
            <SlideShowAnother data={moviesData.country}></SlideShowAnother>
          </div>
        </div>
      </div>
    </>
  );
}

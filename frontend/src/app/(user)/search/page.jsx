// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function SearchPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query");
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     //fetch danh sách phim theo query
//     async function fetchMovies() {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
//         const data = await response.json();
//         let filteredMovies = data;

//         if (query) {
//           filteredMovies = filteredMovies.filter((movie) =>
//             movie.title.toLowerCase().includes(query.toLowerCase())
//           );
//         }
//         setMovies(filteredMovies);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         setError("Đã xảy ra lỗi khi lấy dữ liệu phim.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMovies();
//   }, [query]);

//   return (
//     <div className="container-fluid bg-dark">
//       <div className="product-slide">
//         <div className="container">
//           <div className="top-page-filter">
//             <div className="header-text">
//               <h1 className="text-light">Kết quả tìm kiếm cho phim với từ khóa: "{query}"</h1>
//               {!loading && (
//                 <p className="text-light">
//                   {movies.length > 0
//                     ? `Tìm thấy ${movies.length} bộ phim`
//                     : "Không có phim nào phù hợp với từ khóa tìm kiếm."}
//                 </p>
//               )}
//             </div>
//           </div>

//           {loading && <div className="text-light">Đang tải...</div>}
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="d-flex flex-wrap mt-3">
//             {movies.length > 0 ? (
//               movies.map((movie) => (
//                 <div
//                   key={movie.movie_id}
//                   className="card text-bg-dark hover-box"
//                   style={{ width: "23%", margin: "10px" }}
//                 >
//                   <div>
//                     <img
//                       src={movie.banner}
//                       className="card-img"
//                       alt={movie.title}
//                       style={{ objectFit: "cover", width: "100%", height: "400px" }}
//                     />
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div
//                       className="rounded-circle bg-black opacity-50 border border-white"
//                       style={{ width: "50px", height: "50px" }}
//                     >
//                       <Link
//                         href={`/film/${movie.movie_id}`}
//                         className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"
//                       ></Link>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               !loading && (
//                 <div className="alert alert-danger no-movies" role="alert">
//                   Không có phim nào phù hợp với từ khóa tìm kiếm.
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// >>>>>>> main

//////////////////////////fix để deploy có lỗi 
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function MovieList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`/api/movies`);
        const data = await response.json();
        let filteredMovies = data;

        if (query) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          );
        }
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Đã xảy ra lỗi khi lấy dữ liệu phim.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <div className="header-text">
        <h1 className="text-light">Kết quả tìm kiếm cho phim với từ khóa: "{query}"</h1>
        {!loading && (
          <p className="text-light">
            {movies.length > 0
              ? `Tìm thấy ${movies.length} bộ phim`
              : "Không có phim nào phù hợp với từ khóa tìm kiếm."}
          </p>
        )}
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
                  <Link
                    href={`/film/${movie.movie_id}`}
                    className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"
                  ></Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="alert alert-danger no-movies" role="alert">
              Không có phim nào phù hợp với từ khóa tìm kiếm.
            </div>
          )
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container-fluid bg-dark">
      <div className="product-slide">
        <div className="container">
          <Suspense fallback={<div>Đang tải...</div>}>
            <MovieList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

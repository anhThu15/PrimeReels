// 'use client'
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import useSWR from "swr";
// const fetcher = (...args) => fetch(...args).then((res) => res.json())


// export default function Banner() {
//     const router = useRouter()
//     const { data, error, isLoading } = useSWR(
//         `${process.env.NEXT_PUBLIC_API_URL}/movies`,
//         fetcher
//     );

//     const [filteredData, setFilteredData] = useState(null);

//     useEffect(() => {
//         if (data) {
//             const topBanner = data
//                 .sort((a, b) => b.favorites_count - a.favorites_count)
//                 .slice(0, 3)
//                 .filter((item) => item.status === 1);
//             setFilteredData(topBanner);
//         }
//     }, [data]);

//     if (error) return router.push('/404');

//     if (isLoading || !filteredData) {
//         return (
//             <>
//                 <div className="spinner-border text-danger" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </>
//         );
//     }


//     return (
//         <>
//             <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
//                 <div className="carousel-inner">
//                     <div className="carousel-item active">

//                         <div className="" data-bs-theme="dark" >
//                             <div className="gradient-overlay"></div>
//                             <div className=" position-relative">
//                                 <img src={filteredData[0].banner} width={"100%"} style={{ height: "100vh" }} alt="..." />
//                                 <div className=" position-absolute  " style={{ top: 180, left: 110, width: "600px" }}>
//                                     <h1 className=" fw-bold text-with-shadow">{filteredData[0].title}</h1>
//                                     <div className=" row text-with-shadow" style={{ width: 400 }}>
//                                         <div className="col"><i className="fa-regular fa-star"></i> {filteredData[0].rating}</div>
//                                         <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
//                                         <div className="col"><i className="fa-solid fa-calendar-days"></i> {new Date(filteredData[0].updated_at).getFullYear()}</div>

//                                     </div>
//                                     <div className="col mt-2 text-with-shadow overflow-auto" style={{ textAlign: "justify" }} >
//                                         {filteredData[0].description}
//                                     </div>
//                                     <Link href={`/film/${filteredData[0].movie_id}`} className="btn btn-light rounded-pill mt-3">
//                                         <i className="fa-solid fa-circle-play"></i> Xem Ngay
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="carousel-item">

//                         <div className="" data-bs-theme="dark" >
//                             <div className="gradient-overlay"></div>
//                             <div className=" position-relative">
//                                 <img src={filteredData[1].banner} width={"100%"} style={{ height: "100vh" }} alt="..." />
//                                 <div className=" position-absolute " style={{ top: 180, left: 110, width: "600px" }}>
//                                     <h1 className=" fw-bold  text-with-shadow">{filteredData[1].title}</h1>
//                                     <div className=" row  text-with-shadow" style={{ width: 400 }}>
//                                         <div className="col"><i className="fa-regular fa-star"></i> {filteredData[1].rating}</div>
//                                         <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
//                                         <div className="col"><i className="fa-solid fa-calendar-days"></i> {new Date(filteredData[0].updated_at).getFullYear()}</div>


//                                     </div>
//                                     <div className="col mt-2  text-with-shadow overflow-auto" style={{ textAlign: "justify" }} >
//                                         {filteredData[1].description}
//                                     </div>
//                                     <Link href={`/film/${filteredData[1].movie_id}`} className="btn btn-light rounded-pill mt-3">
//                                         <i className="fa-solid fa-circle-play"></i> Xem Ngay
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="carousel-item">

//                         <div className="" data-bs-theme="dark" >
//                             <div className="gradient-overlay"></div>
//                             <div className=" position-relative">
//                                 <img src={filteredData[2].banner} width={"100%"} style={{ height: "100vh" }} alt="..." />
//                                 <div className=" position-absolute " style={{ top: 180, left: 110, width: "600px" }}>
//                                     <h1 className=" fw-bold text-with-shadow"> {filteredData[2].title}</h1>
//                                     <div className=" row text-with-shadow" style={{ width: 400 }}>
//                                         <div className="col"><i className="fa-regular fa-star"></i>{filteredData[2].rating}</div>
//                                         <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
//                                         <div className="col"><i className="fa-solid fa-calendar-days"></i> {new Date(filteredData[0].updated_at).getFullYear()}</div>


//                                     </div>
//                                     <div className="col mt-2 text-with-shadow overflow-auto" style={{ textAlign: "justify" }} >
//                                         {filteredData[2].description}
//                                     </div>
//                                     <Link href={`/film/${filteredData[2].movie_id}`} className="btn btn-light rounded-pill mt-3">
//                                         <i className="fa-solid fa-circle-play"></i> Xem Ngay
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" style={{ width: "100px" }} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" style={{ width: "100px" }} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>

//         </>
//     )
// }



import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner({ bannerData, genres, onGenreChange }) {

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  // Kiểm tra nếu là trang phim bộ hoặc phim lẻ
  const showSelect = currentPath === "/filmSeries" || currentPath === "/oddFilm" || currentPath === "/animeFilm";
  if (!bannerData || bannerData.length === 0) {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {bannerData.map((item, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={item.movie_id}
          >
            <div className="gradient-overlay"></div>
            <div className="position-relative image-banner-slide">
              <img
                className="image-banner"
                src={item.banner}
                width={"100%"}
                height={"600px"}
                alt={item.title}

              />
              <div className="item-title-carousel">
                <h1 className="fw-bold text-with-shadow">{item.title}</h1>
                <div className="row text-with-shadow" style={{ width: 400 }}>
                  <div className="col"><i className="fa-regular fa-star"></i> {item.rating}</div>
                  <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
                  <div className="col"><i className="fa-solid fa-calendar-days"></i> {new Date(item.updated_at).getFullYear()}</div>
                </div>
                {/* <div className="col mt-2 text-with-shadow overflow-auto" style={{ textAlign: "justify", }}>
                    {item.description}
                  </div> */}
                <div
                  className="col mt-2 text-with-shadow"
                  style={{
                    textAlign: "justify",
                    display: "-webkit-box", // Sử dụng flexbox cho cắt dòng
                    WebkitBoxOrient: "vertical", // Định hướng dọc
                    overflow: "hidden", // Ẩn nội dung dư
                    textOverflow: "ellipsis", // Hiển thị dấu "..."
                    WebkitLineClamp: 3, // Số dòng hiển thị
                  }}
                >
                  {item.description}
                </div>



                <Link href={`/film/${item.movie_id}`} className="btn btn-light rounded-pill mt-3">
                  <i className="fa-solid fa-circle-play"></i> Xem Ngay
                </Link>
              </div>
              {showSelect && (
                <div
                  className="select-dropdown sl-dropdown select-film-byMovieType"
                // style={{ position: "absolute", top: 200, right: 100 }}
                >
                  <select onChange={(e) => onGenreChange(e.target.value)}>
                    <option value="">Chọn thể loại</option>
                    {genres.map((genre) => (
                      <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" style={{ width: "100px" }} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" style={{ width: "100px" }} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

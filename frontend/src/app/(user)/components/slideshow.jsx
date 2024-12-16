// import Link from "next/link";
// import Card from "./cards";


// export default function SlideShow(props){
//     return (
//         <>
//          <div className="pb-3 mt-3"   data-bs-theme="dark" >
//             <div id="carouselExample" className="carousel slide">
//               <div className="carousel-inner">
//                 <div className="carousel-item active">
//                     <div className=" d-flex justify-content-around flex-wrap">
//                       {props.data.slice(0,6).map((action) => {
//                         return (
//                           <>
//                               <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
//                                   <div>
//                                       <img src={action.poster} height={350} className="card-img" alt="..."/>
//                                   </div>
//                                   <div className="play-icon-overlay">
//                                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                                        <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
//                                     </div>
//                                   </div>
//                               </div>
//                           </>
//                         )
//                       })}
//                     </div>
//                 </div>
//                 <div className="carousel-item">
//                 <div className=" d-flex justify-content-around flex-wrap">
//                       {props.data.slice(6,12).map((action) => {
//                         return (
//                           <>
//                               <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
//                                   <div>
//                                       <img src={action.poster} height={350} className="card-img" alt="..."/>
//                                   </div>
//                                   <div className="play-icon-overlay">
//                                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                                        <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
//                                     </div>
//                                   </div>
//                               </div>
//                           </>
//                         )
//                       })}
//                     </div>
//                 </div>
//                 <div className="carousel-item">
//                     <div className=" d-flex justify-content-around flex-wrap">
//                       {props.data.slice(12,18).map((action) => {
//                         return (
//                           <>
//                               <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
//                                   <div>
//                                       <img src={action.poster} height={350} className="card-img" alt="..."/>
//                                   </div>
//                                   <div className="play-icon-overlay">
//                                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                                        <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
//                                     </div>
//                                   </div>
//                               </div>
//                           </>
//                         )
//                       })}
//                     </div>
//                 </div>
//               </div>
//               <button className="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//               </button>
//               <button className="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//               </button>
//             </div>
//          </div>
//         </>
//     )
// }

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlideShow(props) {
  // slick settings slide
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(Math.max(props.data.length, 1), 6), // Đảm bảo slidesToShow >= 1
    slidesToScroll: Math.min(props.data.length, 6), // Điều chỉnh khi ít dữ liệu
    arrows: props.data.length > 6,
    swipe: props.data.length > 6,
    prevArrow: (
      <button className="slick-prev slick-arrow">
        <i className="fas fa-chevron-left text-white"></i>
      </button>
    ),
    nextArrow: (
      <button className="slick-next slick-arrow">
        <i className="fas fa-chevron-right text-white"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows:true
        },
      },
    ],
  };

  return (
    <div className="pb-3 mt-3" data-bs-theme="dark">
      <div className="container-fluid px-3 box-slider3 slideShow">
        <Slider {...settings}>
          {props.data.map((action, index) => (
            <div key={index} style={{ margin: "0 10px" }}>
              <div
                className="card text-bg-dark hover-box"
                style={{
                  width: "200px",
                  borderRadius: "0",
                  border: "none",
                  "--bs-card-inner-border-radius": "0",
                }}
              >
                <div>
                  <img
                    src={action.poster}
                    height={350}
                    className="card-img"
                    alt={`Poster of ${action.title}`}
                  />
                </div>
                <div className="play-icon-overlay">
                  <div
                    className="rounded-circle bg-black opacity-50 border border-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      position: "relative",
                      top: "2px",
                      right: "-4px",
                    }}
                  >
                    <Link
                      href={`/film/${action.movie_id}`}
                      className="nav-link fa-solid fa-play fa-2xl text-white"
                      style={{ position: "relative", top: "0px", right: "-2px" }}
                    ></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

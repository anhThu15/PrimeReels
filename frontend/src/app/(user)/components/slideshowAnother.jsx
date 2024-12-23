import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlideShowAnother(props) {
  const dataLength = props.data.length;

  // Dynamically adjust the number of slides to show and scroll
  const slidesToShow = dataLength < 3 ? dataLength : 3;
  const slidesToScroll = dataLength < 3 ? dataLength : 3;
  
  // Adjust the infinite scrolling behavior when there are fewer slides
  const infiniteScroll = dataLength > slidesToShow;

  const settings = {
    dots: false,
    infinite: infiniteScroll,  // Disable infinite scrolling if there are fewer than the number of slides to show
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    arrows: dataLength > 3, // Show arrows only if more than 3 items
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
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll,
        },
      },
      {
        breakpoint: 480, // Dành cho thiết bị di động
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="pb-3 mt-3" data-bs-theme="dark">
        <div className="container-fluid px-3 box-slider3">
          <Slider {...settings}>
            {props.data.map((country, index) => (
              <div key={index}>
                <div
                  className="card text-bg-dark hover-box me-5"
                  style={{ width: "480px",borderRadius: "0", border:"none","--bs-card-inner-border-radius": "0"  }}
                >
                  <div className="bg-black opacity-75">
                    <img
                      src={country.banner}
                      height={250}
                      className="card-img w-full"
                      alt={`Banner of ${country.title}`}
                      // style={{ objectFit: "fill" }}
                      style={{
                        objectFit: "cover", // Giữ tỉ lệ hình ảnh
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="card-img-overlay"></div>
                  <div className="play-icon-overlay">
                    <div
                      className="rounded-circle bg-black opacity-50 border border-white d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <Link
                        href={`/film/${country.movie_id}`}
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
    </>
  );
}



import Link from "next/link";
import CardSlide from "./cardslide";

export default function BannerAnother(props) {
  console.log(props.data[0]);
  
  return (
    <>
      <div className="banner-container text-center position-relative">
        <div className="background-image opacity-50">
          <img
            src={props.data[0]?.banner}
            className="w-100"
            alt="Background"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>


        <div className="content-overlay container text-light py-4">
          <div className="row align-items-center">

            <div className="col-lg-6 col-md-6 col-12 mb-3 mb-lg-0 text-center">
              <img
                src={props.data[0]?.banner}
                className="img-fluid"
                alt="Main Content"
              />
            </div>


            <div className="col-lg-6 col-md-6 col-12 text-start">
              <div className="mb-3">
                <p className=" fs-1 fw-bold">{props.data[0]?.title}</p>
              </div>


              <div className="d-flex align-items-center gap-3 mb-3">
                <div>
                  <i className="fa-regular fa-star"></i> {props.data[0]?.rating}
                </div>
                {/* <div>
                  <i className="fa-regular fa-clock"></i> 20/25
                </div> */}
                <div>
                  <i className="fa-solid fa-calendar-days"></i> 2024
                </div>
                <div
                  className="bg-danger text-light rounded-pill text-center px-2"
                  style={{ width: "40px" }}
                >
                  HD
                </div>
              </div>

              <div className="description">
                <p>
                {props.data[0]?.description}
                </p>
                <Link href={`/film/${props.data[0]?.movie_id}`} className="btn btn-light rounded-pill">
                  <i className="fa-solid fa-circle-play"></i> Xem Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        .banner-container {
          position: relative;
          overflow: hidden;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .content-overlay {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .content-overlay {
            text-align: center;
          }
          .row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  );
}

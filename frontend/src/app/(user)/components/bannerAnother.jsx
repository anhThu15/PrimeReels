// import CardSlide from "./cardslide";

// export default function BannerAnother(){
//     return (
//         <>
//           <div className=" position-relative text-center">
//             <img src="/images/image 22.png" className="w-100" height={550} alt="" />
//             <div className=" position-absolute" style={{top:"60px", left:"50px"}}>
//                <div className="row w-100" >
//                   <div className="col" >
//                     <img src="/images/image 21.png" width={"100%"} alt="" />
//                   </div>
//                   <div className="col">
//                      <div className="row">
//                           <img src="/images/image 20.png" height={100} alt="" />
//                          <div className="col mt-5">
//                             <div className=" row row-cols-4" style={{width:400}}>
//                                <div className="col"><i className="fa-regular fa-star"></i> 5.2</div>
//                                <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
//                                <div className="col"><i className="fa-solid fa-calendar-days"></i> 2024</div>
//                                <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
//                             </div>
//                             <div className="col mt-2 text-start">
//                                 Câu chuyện về số phận lắm chông gai của Liệt Như Ca vì những ân oán tình thù của thế hệ trước. 
//                                 Có ba chàng trai xuất hiện trong cuộc đời của Như Ca, đem lòng yêu thương cô. Vượt qua bao sóng gió, 
//                                 họ đã tìm được lời đáp cho số phận của mình và chấm dứt chuỗi bi kịch.     <br />                                            
//                                 <div className="btn btn-light rounded-pill mt-3">
//                                     <i className="fa-solid fa-circle-play"></i> Xem Ngay
//                                 </div>
//                             </div>
//                          </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//           </div>
//         </>
//     )
// }


import CardSlide from "./cardslide";

export default function BannerAnother() {
  return (
    <>
      <div className="banner-container text-center position-relative">
        {/* Hình nền chính */}
        <div className="background-image">
          <img
            src="/images/image 22.png"
            className="w-100"
            alt="Background"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Nội dung trên hình nền */}
        <div className="content-overlay container text-light py-4">
          <div className="row align-items-center">
            {/* Cột hình ảnh */}
            <div className="col-lg-6 col-md-6 col-12 mb-3 mb-lg-0 text-center">
              <img
                src="/images/image 21.png"
                className="img-fluid"
                alt="Main Content"
              />
            </div>

            {/* Cột thông tin */}
            <div className="col-lg-6 col-md-6 col-12 text-start">
              <div className="mb-3">
                <img
                  src="/images/image 20.png"
                  className="img-fluid"
                  style={{ height: "100px" }}
                  alt="Thumbnail"
                />
              </div>

              {/* Thông tin chi tiết */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <div>
                  <i className="fa-regular fa-star"></i> 5.2
                </div>
                <div>
                  <i className="fa-regular fa-clock"></i> 20/25
                </div>
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
                  Câu chuyện về số phận lắm chông gai của Liệt Như Ca vì những
                  ân oán tình thù của thế hệ trước. Có ba chàng trai xuất hiện
                  trong cuộc đời của Như Ca, đem lòng yêu thương cô. Vượt qua
                  bao sóng gió, họ đã tìm được lời đáp cho số phận của mình và
                  chấm dứt chuỗi bi kịch.
                </p>
                <button className="btn btn-light rounded-pill mt-3">
                  <i className="fa-solid fa-circle-play"></i> Xem Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
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
          z-index: 1; /* Đẩy hình nền ra sau */
        }

        .content-overlay {
          position: relative;
          z-index: 2; /* Đặt nội dung phía trên hình nền */
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

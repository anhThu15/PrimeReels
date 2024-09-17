import CardSlide from "./cardslide";

export default function SlideShow(){
    return (
        <>
         <div className="containerVipPro font-monospace pb-3 mt-3"  data-bs-theme="dark" >
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active ms-5">
                  <CardSlide></CardSlide>
                </div>
                <div class="carousel-item">
                  <CardSlide></CardSlide>
                </div>
                <div class="carousel-item">
                  <CardSlide></CardSlide>
                </div>
              </div>
              <button class="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
         </div>
        </>
    )
}
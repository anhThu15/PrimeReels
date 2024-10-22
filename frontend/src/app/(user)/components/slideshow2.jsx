import Card from "./cards";


export default function SlideShow2(props){
    return (
        <>
         <div className="font-monospace pb-3 mt-3"   data-bs-theme="dark" >
            <div id="carouselExample2" class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active">
                    <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(0,6).map((action) => {
                        return (
                          <>
                              <div class="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} class="card-img" alt="..."/>
                                  </div>
                                  <div class="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
                <div class="carousel-item">
                <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(6,12).map((action) => {
                        return (
                          <>
                              <div class="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} class="card-img" alt="..."/>
                                  </div>
                                  <div class="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
                <div class="carousel-item">
                    <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(12,18).map((action) => {
                        return (
                          <>
                              <div class="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} class="card-img" alt="..."/>
                                  </div>
                                  <div class="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
              </div>
              <button class="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
         </div>
        </>
    )
}
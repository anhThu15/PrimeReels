import Link from "next/link";
import Card from "./cards";


export default function SlideShow(props){
    return (
        <>
         <div className="font-monospace pb-3 mt-3"   data-bs-theme="dark" >
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(0,6).map((action) => {
                        return (
                          <>
                              <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} className="card-img" alt="..."/>
                                  </div>
                                  <div className="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                       <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
                <div className="carousel-item">
                <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(6,12).map((action) => {
                        return (
                          <>
                              <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} className="card-img" alt="..."/>
                                  </div>
                                  <div className="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                       <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className=" d-flex justify-content-around flex-wrap">
                      {props.data.slice(12,18).map((action) => {
                        return (
                          <>
                              <div className="card text-bg-dark hover-box" style={{width:"200px"}}>
                                  <div>
                                      <img src={action.poster} height={350} className="card-img" alt="..."/>
                                  </div>
                                  <div className="play-icon-overlay">
                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                       <Link href={`/film/${action.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                    </div>
                                  </div>
                              </div>
                          </>
                        )
                      })}
                    </div>
                </div>
              </div>
              <button className="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
         </div>
        </>
    )
}
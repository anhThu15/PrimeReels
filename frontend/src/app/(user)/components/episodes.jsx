import Link from "next/link"


export default function Episodes(props){
    return (
        <>
         <div className="font-monospace pb-3 mt-3"   data-bs-theme="dark" >
            <div id="carouselExample6" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active ms-5">
                    <div className=" row-cols-3 row">
                    {props.data.slice(0,3).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} className="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} className="card-img" alt="..."/>
                                </div>
                                <div className="card-img-overlay ">
                                </div>
                                <div className="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
                <div className="carousel-item">
                <div className=" row-cols-3 row">
                    {props.data.slice(3,6).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} className="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} className="card-img" alt="..."/>
                                </div>
                                <div className="card-img-overlay ">
                                </div>
                                <div className="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
                <div className="carousel-item">
                <div className=" row-cols-3 row">
                    {props.data.slice(6,9).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} className="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} className="card-img" alt="..."/>
                                </div>
                                <div className="card-img-overlay ">
                                </div>
                                <div className="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
              </div>
              <button className="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample6" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample6" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
         </div>
        </>
    )
}
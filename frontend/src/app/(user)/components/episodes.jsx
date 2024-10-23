import Link from "next/link"


export default function Episodes(props){
    return (
        <>
         <div className="font-monospace pb-3 mt-3"   data-bs-theme="dark" >
            <div id="carouselExample6" class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active ms-5">
                    <div className=" row-cols-3 row">
                    {props.data.slice(0,3).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} class="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} class="card-img" alt="..."/>
                                </div>
                                <div class="card-img-overlay ">
                                </div>
                                <div class="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} class="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
                <div class="carousel-item">
                <div className=" row-cols-3 row">
                    {props.data.slice(3,6).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} class="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} class="card-img" alt="..."/>
                                </div>
                                <div class="card-img-overlay ">
                                </div>
                                <div class="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} class="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
                <div class="carousel-item">
                <div className=" row-cols-3 row">
                    {props.data.slice(6,9).map((episodes) => {
                      return(
                        <>
                            <div key={episodes.episode_id} class="card text-bg-dark hover-box me-5" style={{width:"450px", marginRight:"7.9px"}}>
                                <div className="bg-black opacity-75">
                                    <video src={episodes.video_url} height={220} class="card-img" alt="..."/>
                                </div>
                                <div class="card-img-overlay ">
                                </div>
                                <div class="play-icon-overlay">
                                  <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                                     <Link href={`/watch/${episodes.episode_id}`} class="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                  </div>
                                </div>
                            </div>
                        </>
                      )
                    })}
                    </div>
                </div>
              </div>
              <button class="carousel-control-prev bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample6" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next bg-white" style={{width:"50px"}} type="button" data-bs-target="#carouselExample6" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
         </div>
        </>
    )
}
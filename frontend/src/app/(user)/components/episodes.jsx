import Link from "next/link"
import ReactPlayer from "react-player"
import Cookies from 'js-cookie';


export default function Episodes(props){
  const token = Cookies.get('token');
    return (
        <>
            <div className="pb-3 mt-3" data-bs-theme="dark">
              <div id="carouselExample6" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {/* Tính toán số lượng nhóm */}
                  {Array.from({ length: Math.ceil(props.data.length / 3) }).map((_, index) => {
                    const start = index * 3; // Vị trí bắt đầu của nhóm
                    const end = start + 3; // Vị trí kết thúc của nhóm (sẽ tính từ start đến start + 3)
                    const chunk = props.data.slice(start, end); // Cắt mảng thành nhóm 3 phần tử
            
                    return (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <div className="row-cols-3 row">
                          {chunk.map((episode) => (
                            <div key={episode.episode_id} className="col-4 mb-4">
                              <div className="card text-bg-dark hover-box">
                                <div className="bg-black opacity-75">
                                  <ReactPlayer
                                    width="100%"
                                    height={220}
                                    style={{ marginTop: "-18px" }}
                                    url={episode.video_url}
                                    light={true}
                                  />
                                </div>
                                <div className="play-icon-overlay">
                                  <div className="rounded-circle bg-black opacity-50 border border-white" style={{ width: "50px", height: "50px" }}>
                                    {/* {token? (*/}
                                      <Link href={`/watch/${episode.movie_id}/${episode.episode_number}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                    {/* ) : (
                                      <div className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></div>
                                    )} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
            
                {/* Điều khiển chuyển slide */}
                <button className="carousel-control-prev bg-white" style={{ width: "50px" }} type="button" data-bs-target="#carouselExample6" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next bg-white" style={{ width: "50px" }} type="button" data-bs-target="#carouselExample6" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

        </>
    )
}
'use client'
import ReactPlayer from 'react-player/lazy';
import { React ,useState, useEffect } from 'react'
import SlideShowAnother from "../../components/slideshowAnother";
import Comment from "../../components/coment";
import SlideShow from "../../components/slideshow";
import axios from 'axios';
import Episodes from '../../components/episodes';


export default function Watch({params}){
  const id = params.id
  const [isClient, setIsClient] = useState(false)
  const [watch, setWatch] = useState([])
  const [film, setFilm] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [random, setRandom] = useState([])


  useEffect(() => {
    setIsClient(true)

    const getWatch = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes/1`,{ revalidate: 3600 }).then((res) => res.data)
      setWatch(res)
    }

    const getFilm = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,{ revalidate: 3600 }).then((res) => res.data)
      setFilm(res)
    }

    const getEpisodes = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`,{ revalidate: 3600 }).then((res) => res.data)
      setEpisodes(res)
    }

    const getRandom = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
      // Hàm xáo trộn mảng
      const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        // Chọn chỉ số ngẫu nhiên
        const j = Math.floor(Math.random() * (i + 1));
        // Hoán đổi các phần tử
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
      };
      setRandom(shuffleArray(res))
    }

    getWatch();
    getFilm();
    getEpisodes();
    getRandom()

  }, [])

    return(
        <>
                <div className="container-fluid bg-black p-0 font-monospace text-white">

                      {/* video phim */}
                      <div className="container font-monospace text-white">
                          {isClient ? <ReactPlayer className="w-100" height={550} style={{marginTop:"-18px"}} url={watch.video_url} controls /> : 'Load...'}
                          <div className="mt-3 d-flex">
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-forward"></i> Tập Tiếp Theo</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-bookmark"></i> Thêm Vào Thư Viện</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-rotate-left"></i> Lịch Sử Xem</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-comment"></i> Bình Luận</button>
                          </div>
                      </div>
                      {/* video phim */}

                      {/* Tập Phim */}
                      <div className="fs-2 mt-5">Danh Sách Tập Phim</div>
                          <Episodes data={episodes}></Episodes>
                      {/* Tập Phim */}

                      {/* Card phim */}
                       <div className="row m-0 mt-5" style={{paddingLeft:"110px"}}>
                          <div className="col-3">
                            <img width={250} height={350} src={film.poster} alt="" />
                          </div>
                          <div className="col">
                              <h1 className=" fw-bold text-danger">{film.title}</h1>
                              <div className=" row " style={{width:380}}>
                                 <div className="col"><i class="fa-regular fa-star"></i> {film.rating}</div>
                                 <div className="col"><i class="fa-regular fa-clock"></i> <span className=" text-secondary">20</span>/25</div>
                                 <div className="col"><i class="fa-solid fa-calendar-days"></i> {film.updated_at}</div>
                                 {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                              </div>
                              {/* <div className="col"> <span className=" text-secondary">Thể Loại: </span>{film.genres.map((g) =>  { render(<>{g.name}, </>)})}</div>
                              <div className="col"> <span className=" text-secondary">Đạo Diễn: </span>{film.director}</div>
                              <div className="col"> <span className=" text-secondary">Diễn Viên: </span>{film.actors.map((g) =>  { render(<>{g.name}, </>)})}</div> */}
                              <div className="col mt-2">
                                  {film.description}                                                
                              </div>
                          </div>
                       </div>
                      {/* Card phim */}


                      {/* cmt */}
                      <div className="container mt-5 ">
                          {/* <Comment></Comment> */}
                      </div>
                      {/* cmt */}

                      {/* Có thể bạn sẽ thích */}
                      <div className="container">
                        <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Có thể bạn sẽ thích</h2>
                            <SlideShow data={random}></SlideShow>
                      </div>
                      {/* Có thể bạn sẽ thích */}



                </div>

        </>
    )
}
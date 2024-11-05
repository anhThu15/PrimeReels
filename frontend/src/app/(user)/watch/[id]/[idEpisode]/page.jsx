'use client'
import ReactPlayer from 'react-player/lazy';
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Video from '@/app/(user)/components/video';
import Episodes from '@/app/(user)/components/episodes';
import SlideShow from '@/app/(user)/components/slideshow';
import Comment from '@/app/(user)/components/coment';


export default function Watch({ params }) {
  const id = params.id
  const idEpisode = params.idEpisode
  // console.log(id, idEpisode);
  const [watch, setWatch] = useState([])
  const [film, setFilm] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [random, setRandom] = useState([])

// console.log(watch);

  useEffect(() => {

    const getWatch = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes/${idEpisode}`, { revalidate: 3600 }).then((res) => res.data)
      setWatch(res)
    }

    const getFilm = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, { revalidate: 3600 }).then((res) => res.data)
      setFilm(res)
    }

    const getEpisodes = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`, { revalidate: 3600 }).then((res) => res.data)
      setEpisodes(res)
    }

    const getRandom = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { revalidate: 3600 }).then((res) => res.data)
      const filteredData = res.filter(item => item.status === 1);
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
      setRandom(shuffleArray(filteredData))
    }

    getWatch();
    getFilm();
    getEpisodes();
    getRandom()

  }, [])
  
  


  // console.log(watch);
  

  return (
    <>
      <div className="container-fluid bg-black p-0 text-white">
        {/* video phim */}
        <div className="container text-white">
          <Video data={watch}></Video>
        </div>
        {/* video phim */}

        {/* Tập Phim */}
        {film.movie_type_id == 2 ? (<></>):(
                <div style={{backgroundColor:"#808080"}}>
                <div className=" ms-5 fs-2 mt-5">Danh Sách Tập Phim - Tập {watch.episode?.episode_number} </div>
                  <Episodes data={episodes}></Episodes></div>)}
        {/* <div className="fs-2 mt-5">Danh Sách Tập Phim</div>
        <Episodes data={episodes}></Episodes> */}
        {/* Tập Phim */}

        {/* Card phim */}
        <div className="row m-0 mt-5" style={{ paddingLeft: "110px" }}>
          <div className="col-3">
            <img width={250} height={350} src={film.poster} alt="" />
          </div>
          <div className="col">
            <h1 className=" fw-bold text-danger">{film.title}</h1>
            <div className=" row " style={{ width: 380 }}>
              <div className="col"><i class="fa-regular fa-star"></i> {film.rating}</div>
              <div className="col"><i class="fa-regular fa-clock"></i> <span className=" text-secondary">20</span>/25</div>
              <div className="col"><i class="fa-solid fa-calendar-days"></i> {film.updated_at}</div>
              {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
            </div>
            <div className="col"> <span className=" text-secondary">Thể Loại: </span>{film?.genres?.map((g) => { return (<>{g.name}, </>) })}</div>
            <div className="col"> <span className=" text-secondary">Đạo Diễn: </span>{film.director}</div>
            <div className="col"> <span className=" text-secondary">Diễn Viên: </span>{film?.actors?.map((g) => { return (<>{g.name}, </>) })}</div>
            <div className="col mt-2">
              {film.description}
            </div>
          </div>
        </div>
        {/* Card phim */}


        {/* cmt */}
        <div className="container mt-5 " id='target-section'>
          <Comment data={film.comments}></Comment>
        </div>
        {/* cmt */}

        {/* Có thể bạn sẽ thích */}
        <div className="container">
          <h2 className="fw-bold mt-5" style={{ marginLeft: "50px" }}>Có thể bạn sẽ thích</h2>
          <SlideShow data={random}></SlideShow>
        </div>
        {/* Có thể bạn sẽ thích */}



      </div>

    </>
  )
}
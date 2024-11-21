'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Episodes from "../../components/episodes";
import Comment from "../../components/coment";
import SlideShow from "../../components/slideshow";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function film({params}){
  const id = params.id
  const [film, setFilm] = useState([])
  const [cmts, setCmts] = useState([])
  const idEpisode = film.episode?.[0].episode_number
  const [episodes, setEpisodes] = useState([])
  const [random, setRandom] = useState([])
  const token = Cookies.get('token');
  const router = useRouter();

  // useEffect(() => {
  //   const getFilm = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,{ revalidate: 3600 }).then((res) => res.data)
  //       setFilm(res)
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }

  //   const getEpisodes = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`,{ revalidate: 3600 }).then((res) => res.data)
  //       const episodes = res.filter(episode => episode.status === 1);
  //       setEpisodes(episodes)
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }

  //   const getRandom = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
  //       const filteredData = res.filter(item => item.status === 1);
  //       // Hàm xáo trộn mảng
  //       const shuffleArray = (array) => {
  //       for (let i = array.length - 1; i > 0; i--) {
  //         // Chọn chỉ số ngẫu nhiên
  //         const j = Math.floor(Math.random() * (i + 1));
  //         // Hoán đổi các phần tử
  //         [array[i], array[j]] = [array[j], array[i]];
  //       }
  //       return array;
  //       };
  //       setRandom(shuffleArray(filteredData))
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   const getCmt = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments/movies/${id}`,{ revalidate: 3600 }).then((res) => res.data)
  //       setCmts(res)
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }

  //   getFilm()
  //   getEpisodes()
  //   getRandom()
  //   getCmt()
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
        // Hàm gọi API đơn giản
        const fetchAPI = async (url) => {
          const response = await axios.get(url, { revalidate: 3600 });
          return response.data;
        };
  
        // Gọi tất cả API song song
        const [filmRes, episodesRes, randomRes, cmtRes] = await Promise.all([
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/comments/movies/${id}`),
        ]);
  
        // Thêm delay trước khi xử lý dữ liệu
        await delay(2000);
  
        // Xử lý dữ liệu
        setFilm(filmRes);
  
        const episodes = episodesRes.filter((episode) => episode.status === 1);
        setEpisodes(episodes);
  
        const filteredData = randomRes.filter((item) => item.status === 1);
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };
        setRandom(shuffleArray(filteredData));
  
        setCmts(cmtRes);
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load data. Please try again.");
      }
    };
  
    fetchData();
  }, [id]);
  
  

  const handleLove = async () => {
    try {
      if(!token){
        toast.error(
          <div>Chưa Có Đăng Nhập, Đăng Nhập Đi Bà {' '}
              <Link href="/login" style={{ textDecoration: 'underline' }}>
                  Đăng Nhập
              </Link>
          </div>           
        );
      }else{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/favourites`,{},{        
            headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then((res) => res.data)
        
        if(!res){
            toast.error('Đã Được Thêm Vào Danh Sách Yêu Thích');
        }else{
            toast.success("Thêm Thành Công Vào Danh Sách Yêu Thích");
        }
      }
            
    } catch (error) {
        // console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
            return error.response.data.message; // Trả về hoặc xử lý message từ lỗi
          } else {
            console.error('An unexpected error occurred:', error);
            return 'An unexpected error occurred';
          }
    }
  }
  

  // console.log(cmts)

    return(
        <>
          <div className="container-fluid bg-black p-0 text-white">

            {/*  banner */}
              <div className="row container-fluid p-0 m-0 position-relative" >
                <div className="col-4  text-start">
                    <div className=" position-absolute " style={{top:100, left:110, width:"430px"}}>
                          <h1 className=" fw-bold">{film.title}</h1>
                          <div className=" row" style={{width:400}}>
                             <div className="col"><i className="fa-regular fa-star"></i> {film.rating}</div>
                             <div className="col"><i className="fa-regular fa-clock"></i> {film?.episode?.length}/{film.duration}</div>
                             <div className="col"><i className="fa-solid fa-calendar-days"></i> {new Date(film.updated_at).toLocaleString()}</div>
                             {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                          </div>
                          <div className="col mt-2 overflow-auto" style={{height:"100px"}}>
                              {film.description}                                                
                          </div>
                          <div className="row mt-2">
                              <div className="col-1">
                                <button className="btn btn-outline-light rounded-circle" onClick={() => handleLove()}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <div className="col mt-2 ms-2 fw-bold">Yêu Thích</div>
                          </div>
                    </div>
                </div>
                <div className="col">
                  <img width={"100%"} height={"400px"} className=" bg-black opacity-75" src={film.banner} alt="" />
                  <Link href={`/watch/${id}/${idEpisode}`} className=" btn btn-outline-light rounded-circle position-absolute" style={{right:"440px", top:"150px", width:"70px", height:"70px"}}>
                    <i className="fa-solid fa-play fs-1 ms-1 mt-2"></i>
                  </Link>

                </div>                 
              </div>
            {/*  banner */}
            
            {/* quốc gia & diễn viên, đạo diển  */}
              <div className="row container p-0 row-cols-3" style={{marginLeft:"90px"}}  >
                <div className="col-1 fw-bold"><p className=" text-secondary">Quốc Gia:</p> {film.country}</div>
                <div className="col-1 fw-bold"><p className=" text-secondary">Đạo Diễn:</p> {film.director}</div>
                <div className="col-4 fw-bold">
                  <p className="text-secondary">Diễn Viên:</p> 
                  <div className="row">
                    {film?.actors?.map((actor) => {
                      return (
                        <>
                            <div key={actor.actor_id} className="col-3">{actor.name}</div>
                        </>
                      ) 
                    })}

                  </div>
                </div>
                  <div className=" col d-flex flex-wrap mt-4">
                  {film?.actors?.map((actor) => {
                      return (
                        <>
                          <img className="rounded-circle ms-3 mt-3" width={100} height={100} src={actor.image_url} alt="" />
                      </>
                      ) 
                    })}
                  </div>
              </div>
            {/* quốc gia & diễn viên, đạo diển  */}

            {/* tập phim */}
            
              {film.movie_type_id == 2 ? (<></>):(
                <div style={{backgroundColor:"#808080"}}>
                <div className=" ms-5 fs-2 mt-5">Danh Sách Tập Phim</div>
                  <Episodes data={episodes}></Episodes></div>)}

            {/* tập phim */}

            {/* cmt */}
            <div className=" mt-5 container " style={{marginLeft:"90px" }}>
                <Comment data={film}></Comment>
            </div>
            {/* cmt */}


            {/* Có thể bạn sẽ thích */}
            <div style={{marginLeft:"90px"}} className="container">
              <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Có thể bạn sẽ thích</h2>
              <SlideShow data={random}></SlideShow>
            </div>
            {/* Có thể bạn sẽ thích */}
          </div>   
        </>
    )
}
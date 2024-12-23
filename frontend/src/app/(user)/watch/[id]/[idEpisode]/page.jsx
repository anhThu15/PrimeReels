'use client'
import ReactPlayer from 'react-player/lazy';
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Video from '@/app/(user)/components/video';
import Episodes from '@/app/(user)/components/episodes';
import SlideShow from '@/app/(user)/components/slideshow';
import Comment from '@/app/(user)/components/coment';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Watch({ params }) {
  const token = Cookies.get('token');
  const [user, setUser] = useState([])
  // const userCookie = Cookies.get('user');
  // const user = userCookie ? JSON.parse(userCookie) : null;
  const id = params.id
  const idEpisode = params.idEpisode
  // console.log(id, idEpisode);
  const [watch, setWatch] = useState([])
  const [film, setFilm] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [random, setRandom] = useState([])
  const [cmts, setCmts] = useState([])
  const [count, setCount] = useState(0)
  const router = useRouter()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
        // Hàm gọi API cơ bản
        const fetchAPI = async (url) => {
          const response = await axios.get(url, { revalidate: 3600 });
          return response.data;
        };
  
        // Thêm thời gian delay
        await delay(1000);
  
        // Thực hiện các API song song
        const [watchRes, filmRes, episodesRes, randomRes, cmtRes] = await Promise.all([
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes/${idEpisode}`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/movies`),
          fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/comments/movies/${id}`),
        ]);
  
        // Xử lý dữ liệu
        setWatch(watchRes);
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
        // router.push('/404')
        // alert("Failed to load data. Please try again.");
      }
    };
  
    fetchData();
  }, [id, idEpisode]);
  
  

  useEffect(() => {
    const getToken = () => {
      if (token) {
        axios.get(`/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => setUser(res.data.user))
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
      }
    }
    setTimeout(() => {
      getToken()
    }, 2000);
  }, [token]);

  // console.log(user);

  const {
    seconds,
    minutes,
    restart,
    isRunning,
  } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      setCount(429); // Khi hết thời gian, setCount là 10
    },
  });

  useEffect(() => {
    const checkUserInvoice = async () => {
      try {
        const res = await axios.get(`/api/invoices`, { revalidate: 3600 });
        // console.log(res.data);
        const userInvoices = res.data
                            .filter(invoice => invoice.user_id === user.user_id) 
                            .sort((a, b) => b.invoice_id - a.invoice_id);
              // console.log(userInvoices);
              
        // hàm tính giây cho thgian dc phép xem 
        const calculateSecondsBetweenDates = (startDate, endDate) => {
                const formatDate = (dateStr) => {
                    if (dateStr.includes("/")) {
                        const [time, date] = dateStr.split(" ");
                        const [day, month, year] = date.split("/");
                        return new Date(`${year}-${month}-${day}T${time}`);
                    } else {
                        const [date, time] = dateStr.split(" ");
                        return new Date(`${date}T${time}`);
                    }
                };
              
                const start = formatDate(startDate);
                const end = formatDate(endDate);
              
                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    return NaN;
                }
              
                const differenceInMilliseconds = end - start;
                const differenceInSeconds = differenceInMilliseconds / 1000;
              
                return differenceInSeconds;
        };
        // hàm tính giây cho thgian dc phép xem 

        if(userInvoices && userInvoices[0] && userInvoices[0].status){
          // console.log(userInvoices[0].status === 'success');
            if(userInvoices[0].status === 'success'){
              const currentDate = new Date();
              const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Định dạng 24 giờ
              };
              const formattedDateTimeVN = currentDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', ...options })
              const startDate = formattedDateTimeVN;
              const endDate = userInvoices[0].end_date;
              const seconds = calculateSecondsBetweenDates(startDate, endDate);
              console.log(startDate, endDate, seconds);
              // console.log('xử  lý coi theo ngày')
              // console.log(seconds);
              
                if(seconds > 0){
                  setCount(seconds + 86400 ); 
                  // console.log(count);
                }else if(seconds < 0 ){
                  toast.error(
                    <div>
                      <strong>Gói Đã Hết Hạn</strong> trên{' '}
                      <em>PrimeReels</em>. Mời Bạn{' '}
                      <Link href="/user-buy-package" style={{ textDecoration: 'underline' }}>
                        Mua Gói
                      </Link>{' '}
                      để Được Xem Phim Mượt Mà Hơn.
                    </div>
                  );
                  setCount(429)
                }
            }
            if (userInvoices[0].status === 'pending') {
              toast.error('Bạn Chưa Thanh Toán Vui Lòng Thanh Toán');
              setCount(429);  // Đặt giá trị đếm cho trạng thái pending
            } else if (userInvoices[0].status === 'fail') {
              toast.error('Thanh Toán Thất Bại. Vui Lòng Thử Lại');
              setCount(429);  // Đặt giá trị đếm cho trạng thái fail
            }
        }else if(userInvoices.length === 0){
          setCount(10); 
          console.log('hahah', count);
        }

      } catch (error) {
        setCount(10); 
        console.log(error, count);
      }
    }

    checkUserInvoice();

  }, [user.user_id]);
  

  useEffect(() => {
    // const storedTimeLeft = localStorage.getItem('timeLeft');
    const now = Date.now();
    
    // if (storedTimeLeft) {
    //   const parsedTimeLeft = JSON.parse(storedTimeLeft);
    //   const remainingTime = parsedTimeLeft.expiry - now;
  
    //   if (remainingTime > 0) {
    //     const newExpiryTimestamp = new Date(now + remainingTime);
    //     restart(newExpiryTimestamp, true);
    //   } else {
    //     localStorage.removeItem('timeLeft');
    //   }
    // } else 
    if (count > 0) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + count); // Thêm số giây từ count
      restart(time);
      // localStorage.setItem(
      //   'timeLeft',
      //   JSON.stringify({ expiry: time.getTime() })
      // );
    }
  }, [count, restart]);
  

  // useEffect(() => {
  //   const handleUnload = () => {
  //     if (isRunning) {
  //       const expiry = new Date();
  //       expiry.setMinutes(expiry.getMinutes() + minutes);
  //       expiry.setSeconds(expiry.getSeconds() + seconds);
  //       localStorage.setItem(
  //         'timeLeft',
  //         JSON.stringify({ expiry: expiry.getTime() })
  //       );
  //     }
  //   };
  //   window.addEventListener('beforeunload', handleUnload);
  //   return () => window.removeEventListener('beforeunload', handleUnload);
  // }, [isRunning, minutes, seconds]);


  useEffect(() => {
    if (count === 429) {
      toast.error(
        <div>
          Đã hết <strong>Thời Gian Trải Nghiệm</strong> trên{' '}
          <em>PrimeReels</em>. Mời Bạn{' '}
          <Link href="/user-buy-package" style={{ textDecoration: 'underline' }}>
            Mua Gói
          </Link>{' '}
          để Được Trải Nghiệm Mượt Mà Hơn.
        </div>
      );
    }
  }, [count]);

  // console.log(minutes, seconds);
  

  return (
    <>
      <div className="container-fluid bg-black p-0 text-white">
        {/* video phim */}
        <div className="container text-white">
          {count === 429 ? (<div className="w-100 d-flex justify-content-around " style={{height:"550px"}} >
                            <div className='text-center fw-bold' style={{marginTop:"200px"}} >
                                Hết Lượt Hạn Xem Phim Mời Bạn Gia Hạn <br />
                                <Link href="/user-buy-package" style={{ textDecoration: 'underline', color:"red",  fontSize:"25px"}}>
                                    Gia Hạn
                                </Link>
                            </div>
                        </div>):(<Video data={watch}></Video>)}
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
              <div className="col"><i class="fa-regular fa-clock"></i> <span className=" text-secondary">{film?.episode?.length}</span>/{film.duration}</div>
              <div className="col"><i class="fa-solid fa-calendar-days"></i>  {new Date(film.updated_at).toLocaleString()}</div>
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
          <Comment data={film}></Comment>
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
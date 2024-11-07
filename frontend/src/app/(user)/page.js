'use client'
import Image from "next/image";
import Banner from "./components/banner";
import BannerAnother from "./components/bannerAnother";
import CardSlide from "./components/cardslide";
import SlideShow from "./components/slideshow";
import SlideShowAnother from "./components/slideshowAnother";
import { useEffect, useState } from "react";
import SlideShow2 from "./components/slideshow2";
import SlideShow3 from "./components/slideshow3";
import SlideShow4 from "./components/slideshow4";
import SlideShowAnother2 from "./components/slideshowAnother2";
import axios from "axios";
import axiosRetry from "axios-retry";
import axiosRateLimit from 'axios-rate-limit';


export default function Home() {
  const [action, setAction] = useState([]);
  const [comendy, setComendy] = useState([]);
  const [random, setRandom] = useState([]);
  const [better, setBetter] = useState([]);
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    // Cấu hình retry cho axios
    axiosRetry(axios, {
      retries: 3, // Retry tối đa 3 lần
      retryDelay: axiosRetry.exponentialDelay, // Delay theo số mũ
      retryCondition: (error) => {
        return error.response?.status === 429 || error.response?.status >= 500; // Retry khi gặp lỗi 429 hoặc 5xx
      },
    });

    // Cấu hình rate limit cho axios
    const http = axiosRateLimit(axios.create(), {
      maxRequests: 5, // Số lượng tối đa yêu cầu mỗi giây
      perMilliseconds: 1000, // Tính trên mỗi giây
      maxRPS: 5 // Tối đa 5 yêu cầu mỗi giây
    });

    const fetchMovies = async (url, filterFavorites = false, sortByDate = false) => {
      try {
        const res = await http.get(url); // Sử dụng axios đã được rate-limited
        const filteredData = res.data.filter(item => item.status === 1);

        if (filterFavorites) {
          filteredData.sort((a, b) => b.favorites_count - a.favorites_count);
        }
        if (sortByDate) {
          filteredData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        }
        return filteredData;
      } catch (error) {
        console.log('Error fetching movies:', error);
        return [];
      }
    };

    const loadData = async () => {
      // Sử dụng Promise.all để gọi API đồng thời
      const urls = [
        `${process.env.NEXT_PUBLIC_API_URL}/movies-genre/1`,
        `${process.env.NEXT_PUBLIC_API_URL}/movies-genre/3`,
        `${process.env.NEXT_PUBLIC_API_URL}/movies`,
        `${process.env.NEXT_PUBLIC_API_URL}/movies`,
        `${process.env.NEXT_PUBLIC_API_URL}/movies/filter/country/Việt Nam`,
        `${process.env.NEXT_PUBLIC_API_URL}/movies`
      ];

      try {
        const [
          actionData,
          comedyData,
          randomData,
          betterData,
          countryData,
          dateData
        ] = await Promise.all(urls.map(url => fetchMovies(url)));
        
        // Xáo trộn mảng randomData
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        setAction(actionData);
        setComendy(comedyData);
        setRandom(shuffleArray(randomData));
        setBetter(betterData);
        setCountry(countryData);
        setDate(dateData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);
  
  // console.log(country);
  

  return (
    <>
     <div className="container-fluid bg-black p-0 text-white">
        <div className=" container-fluid p-0">
          <div>
            <Banner></Banner> 
          </div>
          <div className=" position-relative" style={{bottom:40}}>
              <CardSlide></CardSlide>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Đề Xuất Hôm Nay</h2>
            <SlideShow3 data={random}></SlideShow3>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Cập Nhập Mới Nhất </h2>
            <SlideShowAnother2 data={date}></SlideShowAnother2>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>PrimeReels Phim hay mỗi ngày</h2>
            <SlideShow4 data={better}></SlideShow4>
          </div>
          <div>
            <BannerAnother></BannerAnother>
          </div>
          <div >
            <h2 className="fw-bold mb-3" style={{marginLeft:"50px"}}>Phim Hành Động</h2>
            <SlideShow data={action}></SlideShow>
          </div>
          <div className="mt-5 img-banner">
            <Image 
                src="/images/image 23.png" 
                layout="responsive"
                width={1920} 
                height={1080} 
                alt="Description of the image" 
            />
          </div> 
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Việt Nam</h2>
            <SlideShowAnother data={country}></SlideShowAnother>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Hài Hước</h2>
            <SlideShow2 data={comendy}></SlideShow2>
          </div>
        </div>

     </div>
    </>
  );
}

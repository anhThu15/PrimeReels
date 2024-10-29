'use client'
import Image from "next/image";
import Banner from "./components/banner";
import BannerAnother from "./components/bannerAnother";
import CardSlide from "./components/cardslide";
import SlideShow from "./components/slideshow";
import SlideShowAnother from "./components/slideshowAnother";
import { useEffect, useState } from "react";
import axios from "axios";
import SlideShow2 from "./components/slideshow2";
import SlideShow3 from "./components/slideshow3";
import SlideShow4 from "./components/slideshow4";
import SlideShowAnother2 from "./components/slideshowAnother2";

export default function Home() {
  const [action, setAction] = useState([])
  const [comendy, setComendy] = useState([])
  const [random, setRandom] = useState([])
  const [better, setBetter] = useState([])
  const [country, setCountry] = useState([])
  const [date, setDate] = useState([])

  useEffect(() => {
    const getAction = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/1`,{ revalidate: 3600 }).then((res) => res.data)
        setAction(res)
      } catch (error) {
        console.log(error);
      }
    }
    const getComendy = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/3`,{ revalidate: 3600 }).then((res) => res.data)
        setComendy(res)
      } catch (error) {
        console.log(error);
      }
    }
    const getRandom = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
    const getBetter = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
  
        res.sort((a,b) => b.favorites_count - a.favorites_count )
  
        setBetter(res)
      } catch (error) {
        console.log(error);
      }
    }
    const getCountry = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/filter/country/Việt Nam`,{ revalidate: 3600 }).then((res) => res.data)
        setCountry(res)
      } catch (error) {
        console.log(error);
      }
    }
    const getDate = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
              res.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setDate(res)
      } catch (error) {
        console.log(error);
      }
    }


    getAction()
    getComendy()
    getRandom()
    getBetter()
    getCountry()
    getDate()
  },[])
  
  // console.log(country);
  

  return (
    <>
     <div className="container-fluid bg-dark p-0 text-white">
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
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Mỹ</h2>
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

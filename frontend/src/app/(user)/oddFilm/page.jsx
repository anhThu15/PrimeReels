"use client"
import Link from "next/link";
import "../../globals.css";
import SlideShow from "../components/slideshow";
import SlideShowAnother from "../components/slideshowAnother";
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/banner";
import SlideShow2 from "../components/slideshow2";
import SlideShow3 from "../components/slideshow3";

export default function oddFilm() {

  const [action, setAction] = useState([])
  const [comendy, setComendy] = useState([])
  const [random, setRandom] = useState([])
  const [better, setBetter] = useState([])
  const [country, setCountry] = useState([])


  useEffect(() => {
    const getAction = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/1`,{ revalidate: 3600 }).then((res) => res.data)
      setAction(res)
    }
    const getComendy = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-genre/3`,{ revalidate: 3600 }).then((res) => res.data)
      setComendy(res)
    }
    const getRandom = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/1`,{ revalidate: 3600 }).then((res) => res.data)
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
    const getBetter = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/1`,{ revalidate: 3600 }).then((res) => res.data)

      res.sort((a,b) => b.favorites_count - a.favorites_count )

      setBetter(res)
    }
    const getCountry = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/filter/country/Phim Mỹ`,{ revalidate: 3600 }).then((res) => res.data)
      
      setCountry(res)
    }

    getAction()
    getComendy()
    getRandom()
    getBetter()
    getCountry()
  },[])

    return (
        <>
            <div className="container-fluid bg-dark p-0 font-monospace text-white">
                <div className=" container-fluid p-0">
                    <div>
                        <Banner></Banner>
                    </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Bộ Đề Xuất Hôm Nay </h2>
                    <SlideShow data={random}></SlideShow>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Bộ Được Quan Tâm Nhất  </h2>
                    <SlideShow2 data={better}></SlideShow2>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Bộ Hành Động </h2>
                    <SlideShow3 data={action}></SlideShow3>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    {/* <SlideShow></SlideShow> */}
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    {/* <SlideShowAnother></SlideShowAnother> */}
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    {/* <SlideShow></SlideShow> */}
                  </div>
                </div>  
            </div>
        </>
    )
}
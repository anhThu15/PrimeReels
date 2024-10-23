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
import SlideShow4 from "../components/slideshow4";
import SlideShowAnother2 from "../components/slideshowAnother2";

export default function animeFilm() {

  const [action, setAction] = useState([])
  const [comendy, setComendy] = useState([])
  const [random, setRandom] = useState([])
  const [better, setBetter] = useState([])
  const [country, setCountry] = useState([])
  const [date, setDate] = useState([])


  useEffect(() => {
    const getAction = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/3/2`,{ revalidate: 3600 }).then((res) => res.data)
      setAction(res.movies)
    }
    const getComendy = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/3/3`,{ revalidate: 3600 }).then((res) => res.data)
      setComendy(res.movies)
    }
    const getRandom = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/3`,{ revalidate: 3600 }).then((res) => res.data)
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
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/3`,{ revalidate: 3600 }).then((res) => res.data)

      res.sort((a,b) => b.favorites_count - a.favorites_count )

      setBetter(res)
    }
    const getCountry = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types/3/country/Phim Mỹ`,{ revalidate: 3600 }).then((res) => res.data)
      setCountry(res.movies)
    }
    const getDate = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies-type/3`,{ revalidate: 3600 }).then((res) => res.data)
            res.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setDate(res)
    }

    getAction()
    getComendy()
    getRandom()
    getBetter()
    getCountry()
    getDate()
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
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Cập Nhập Mới Nhất </h2>
                    <SlideShowAnother data={date}></SlideShowAnother>
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
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Bộ Mỹ </h2>
                    <SlideShowAnother2 data={country}></SlideShowAnother2>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Phim Bộ Hài Hước</h2>
                    <SlideShow4 data={comendy}></SlideShow4>
                  </div>
                </div>  
            </div>
        </>
    )
}
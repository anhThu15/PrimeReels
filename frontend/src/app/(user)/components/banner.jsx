'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Banner(){
  
  const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/movies`,
      fetcher
  );
  
  const [filteredData, setFilteredData] = useState(null);
  
  useEffect(() => {
      if (data) {
          // Thêm độ trễ 2 giây
          const timeout = setTimeout(() => {
              const topBanner = data
                  .sort((a, b) => b.favorites_count - a.favorites_count)
                  .slice(0, 3)
                  .filter((item) => item.status === 1);
              setFilteredData(topBanner);
          }, 2000); // Độ trễ 2 giây
  
          // Dọn dẹp timeout khi component unmount
          return () => clearTimeout(timeout);
      }
  }, [data]);
  
  if (error) return <div>Lỗi tải dữ liệu</div>;
  
  if (isLoading || !filteredData) {
      return (
          <>
              <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          </>
      );
  }

  // console.log(topBanner);


    return (
        <>
<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">

        <div className=""  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={filteredData[0].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute  " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold text-with-shadow">{filteredData[0].title}</h1>
                    <div className=" row text-with-shadow" style={{width:400}}>
                       <div className="col"><i className="fa-regular fa-star"></i>{filteredData[0].rating}</div>
                       <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i className="fa-solid fa-calendar-days"></i> {filteredData[0].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2 text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {filteredData[0].description}                                                
                    </div>
                    <Link href={`/film/${filteredData[0].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i className="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
    <div className="carousel-item">
      
    <div className=""  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={filteredData[1].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold  text-with-shadow">{filteredData[1].title}</h1>
                    <div className=" row  text-with-shadow" style={{width:400}}>
                       <div className="col"><i className="fa-regular fa-star"></i>{filteredData[1].rating}</div>
                       <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i className="fa-solid fa-calendar-days"></i> {filteredData[1].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2  text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {filteredData[1].description}                                                
                    </div>
                    <Link href={`/film/${filteredData[1].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i className="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
    <div className="carousel-item">
      
    <div className=""  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={filteredData[2].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold text-with-shadow">{filteredData[2].title}</h1>
                    <div className=" row text-with-shadow" style={{width:400}}>
                       <div className="col"><i className="fa-regular fa-star"></i>{filteredData[2].rating}</div>
                       <div className="col"><i className="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i className="fa-solid fa-calendar-days"></i> {filteredData[2].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2 text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {filteredData[2].description}                                                
                    </div>
                    <Link href={`/film/${filteredData[2].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i className="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
  </div>
  <button className="carousel-control-prev" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        
        </>
    )
}
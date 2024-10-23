'use client'
import Link from "next/link";
import useSWR from "swr";

export default function Banner(){
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/movies`, fetcher)
  if (error) return <div>Lỗi tải dữ liệu</div>
  if (isLoading) return (
  <>
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
  </>
  );

  const topBanner = data.sort((a,b) => b.favorites_count - a.favorites_count ).slice(0,3)

  // console.log(topBanner);


    return (
        <>
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">

        <div className="font-monospace "  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={topBanner[0].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute  " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold text-with-shadow">{topBanner[0].title}</h1>
                    <div className=" row text-with-shadow" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i>{topBanner[0].rating}</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> {topBanner[0].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2 text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {topBanner[0].description}                                                
                    </div>
                    <Link href={`/film/${topBanner[0].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
    <div class="carousel-item">
      
    <div className="font-monospace"  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={topBanner[1].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold  text-with-shadow">{topBanner[1].title}</h1>
                    <div className=" row  text-with-shadow" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i>{topBanner[1].rating}</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> {topBanner[1].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2  text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {topBanner[1].description}                                                
                    </div>
                    <Link href={`/film/${topBanner[1].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
    <div class="carousel-item">
      
    <div className="font-monospace "  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src={topBanner[2].banner}   width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold text-with-shadow">{topBanner[2].title}</h1>
                    <div className=" row text-with-shadow" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i>{topBanner[2].rating}</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> {topBanner[2].updated_at}</div>
                       {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                    </div>
                    <div className="col mt-2 text-with-shadow overflow-auto" style={{height:"200px"}} >
                        {topBanner[2].description}                                                
                    </div>
                    <Link href={`/film/${topBanner[2].movie_id}`} className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
  </div>
  <button class="carousel-control-prev" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
        </>
    )
}
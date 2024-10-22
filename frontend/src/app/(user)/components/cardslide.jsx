'use client'
import "../../../app/globals.css"
import Link from "next/link";
import useSWR from "swr";

export default function CardSlide(){
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/movies`, fetcher)
  if (error) return <div>Lỗi tải dữ liệu</div>
  if (isLoading) return (
  <>
      {/* <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> */}
  </>
  );

  const top5 = data.sort((a,b) => b.views - a.views ).slice(0,5)

  // console.log(top5);


    return (
        <>
        <h2 className="fw-bold mb-3 text-with-shadow" style={{marginLeft:"80px"}}>Top 5 PrimeReels</h2>
        <div className=" row row-cols-5 m-0 ">
          
          <div className="row row-cols-2 mb-3">
            <div className="col-5">
                <img src="/images/image 19.png" className="mt-5" height={200} width={200} alt="" />
            </div>
            <div className="col">
                <div class="card text-bg-dark me-3" style={{width:"180px"}}>
                  <div>
                      <img src={top5[0].poster} height={300} class="card-img" alt="..."/>
                  </div>
                  <div class="play-icon-overlay">
                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="row row-cols-2 mb-3">
            <div className="col-5">
                <img src="/images/2.png" className="mt-5" height={200} width={200} alt="" />
            </div>
            <div className="col">
                <div class="card text-bg-dark me-3" style={{width:"180px"}}>
                  <div>
                      <img src={top5[1].poster} height={300} class="card-img" alt="..."/>
                  </div>
                  <div class="play-icon-overlay">
                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="row row-cols-2 mb-3">
            <div className="col-5">
                <img src="/images/3.png" className="mt-5" height={200} width={200} alt="" />
            </div>
            <div className="col">
                <div class="card text-bg-dark me-3" style={{width:"180px"}}>
                  <div>
                      <img src={top5[2].poster} height={300} class="card-img" alt="..."/>
                  </div>
                  <div class="play-icon-overlay">
                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="row row-cols-2 mb-3">
            <div className="col-5">
                <img src="/images/4.png" className="mt-5" height={200} width={200} alt="" />
            </div>
            <div className="col">
                <div class="card text-bg-dark me-3" style={{width:"180px"}}>
                  <div>
                      <img src={top5[3].poster} height={300} class="card-img" alt="..."/>
                  </div>
                  <div class="play-icon-overlay">
                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="row row-cols-2 mb-3">
            <div className="col-5">
                <img src="/images/5.png" className="mt-5" height={200} width={200} alt="" />
            </div>
            <div className="col">
                <div class="card text-bg-dark me-3" style={{width:"180px"}}>
                  <div>
                      <img src={top5[4].poster} height={300} class="card-img" alt="..."/>
                  </div>
                  <div class="play-icon-overlay">
                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                      <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>


        </div>
        </>
    )
}
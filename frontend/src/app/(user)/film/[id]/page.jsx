'use client'
import Link from "next/link";
import SlideShowAnother from "../../components/slideshowAnother";
import Comment from "../../components/coment";
import SlideShow from "../../components/slideshow";
import useSWR from "swr";

export default function film({params}){
  const id = params.id
  const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
  const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, fetcher)
  if (error) return <div>Lỗi tải dữ liệu</div>
  if (isLoading) return (
  <>
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
  </>
  );

    return(
        <>
          <div className="container-fluid bg-black p-0 font-monospace text-white">

            {/*  banner */}
              <div className="row container-fluid p-0 m-0 position-relative" >
                <div className="col-4  text-start">
                    <div className=" position-absolute " style={{top:100, left:110, width:"430px"}}>
                          <h1 className=" fw-bold">{data.title}</h1>
                          <div className=" row" style={{width:400}}>
                             <div className="col"><i class="fa-regular fa-star"></i> {data.rating}</div>
                             <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                             <div className="col"><i class="fa-solid fa-calendar-days"></i> {data.updated_at}</div>
                             {/* <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div> */}
                          </div>
                          <div className="col mt-2 overflow-auto" style={{height:"100px"}}>
                              {data.description}                                                
                          </div>
                          <div className="row mt-2">
                              <div className="col-1">
                                <button className="btn btn-outline-light rounded-circle">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                              </div>
                              <div className="col mt-2 ms-2 fw-bold">Yêu Thích</div>
                          </div>
                    </div>
                </div>
                <div className="col">
                  <img width={"100%"} height={"400px"} className=" bg-black opacity-75" src={data.banner} alt="" />
                  <Link href="/watch" className=" btn btn-outline-light rounded-circle position-absolute" style={{right:"440px", top:"150px", width:"70px", height:"70px"}}>
                    <i class="fa-solid fa-play fs-1 ms-1 mt-2"></i>
                  </Link>
                </div>                 
              </div>
            {/*  banner */}
            
            {/* quốc gia & diễn viên, đạo diển  */}
              <div className="row container p-0 row-cols-3" style={{marginLeft:"90px"}}  >
                <div className="col-1 fw-bold"><p className=" text-secondary">Quốc Gia:</p> {data.country}</div>
                <div className="col-1 fw-bold"><p className=" text-secondary">Đạo Diễn:</p> {data.director}</div>
                <div className="col-4 fw-bold">
                  <p className="text-secondary">Diễn Viên:</p> 
                  <div className="row">
                    {data.actors.map((actor) => {
                      return (
                        <>
                            <div key={actor.actor_id} className="col-3">{actor.name}</div>
                        </>
                      ) 
                    })}

                  </div>
                </div>
                  <div className=" col d-flex flex-wrap mt-4">
                  {data.actors.map((actor) => {
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
            <div style={{backgroundColor:"#808080"}}>
            <div className=" ms-5 fs-2 mt-5">Danh Sách Tập Phim</div>
            {/* <SlideShowAnother></SlideShowAnother> */}
            </div>
            {/* tập phim */}

            {/* cmt */}
            <div className=" mt-5 container " style={{marginLeft:"90px" }}>
                <Comment></Comment>
            </div>
            {/* cmt */}


            {/* Có thể bạn sẽ thích */}
            <div style={{marginLeft:"90px"}} className="container">
              <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Có thể bạn sẽ thích</h2>
              {/* <SlideShow></SlideShow> */}
            </div>
            {/* Có thể bạn sẽ thích */}
          </div>   
        </>
    )
}
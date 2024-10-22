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
  console.log(data);


    return (
        <>
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">

        <div className="font-monospace text-white"  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src="/images/33178 1.png"  style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold">Tây Du Ký Tiền Truyện</h1>
                    <div className=" row row-cols-4" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                       <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                    </div>
                    <div className="col mt-2">
                        Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                    </div>
                    <Link href="/film/1" className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </Link>
              </div>
          </div>
        </div>

    </div>
    <div class="carousel-item">
      
        <div className="font-monospace text-white"  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg" width={"100%"} style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold">One Pice</h1>
                    <div className=" row row-cols-4" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/1300</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                       <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                    </div>
                    <div className="col mt-2">
                        Phim là câu chuyện hài về thầy trò Luffy khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                    </div>
                    <div className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </div>
              </div>
          </div>
        </div>

    </div>
    <div class="carousel-item">
      
        <div className="font-monospace text-white"  data-bs-theme="dark" >
          <div className=" position-relative">
              <img width={"100%"} src="https://static.bandainamcoent.eu/high/spyxfamily/spyxanya-operation-memories/01-news/movie-crunchyroll-collab/spyxfamily-movie-thumbnail.jpg"  style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
                    <h1 className=" fw-bold">Spy x Family: Code White</h1>
                    <div className=" row row-cols-4" style={{width:400}}>
                       <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                       <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                       <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                       <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                    </div>
                    <div className="col mt-2">
                        Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                    </div>
                    <div className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </div>
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
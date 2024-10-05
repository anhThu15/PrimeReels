import Link from "next/link";
import SlideShowAnother from "../../components/slideshowAnother";
import Comment from "../../components/coment";
import SlideShow from "../../components/slideshow";

export default function film({params}){
  // const id = params.id

    return(
        <>
          <div className="container-fluid bg-black p-0 font-monospace text-white">

            {/*  banner */}
              <div className="row container-fluid p-0 m-0 position-relative" >
                <div className="col-4  text-start">
                    <div className=" position-absolute " style={{top:100, left:110, width:"430px"}}>
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
                  <img width={"100%"} height={"400px"} className=" bg-black opacity-75" src="/images/33178 1.png" alt="" />
                  <Link href="/watch" className=" btn btn-outline-light rounded-circle position-absolute" style={{right:"440px", top:"150px", width:"70px", height:"70px"}}>
                    <i class="fa-solid fa-play fs-1 ms-1 mt-2"></i>
                  </Link>
                </div>                 
              </div>
            {/*  banner */}
            
            {/* quốc gia & diễn viên, đạo diển  */}
              <div className="row container p-0 row-cols-3" style={{marginLeft:"90px"}}  >
                <div className="col-1 fw-bold"><p className=" text-secondary">Quốc Gia:</p> Việt Nam</div>
                <div className="col-1 fw-bold"><p className=" text-secondary">Đạo Diễn:</p> Anh Thư</div>
                <div className="col-4 fw-bold">
                  <p className="text-secondary">Diễn Viên:</p> 
                  <div className="row">
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>
                    <div className="col-3">Anh Thư</div>

                  </div>
                </div>
                  <div className=" col d-flex flex-wrap mt-4">
                      <img className="rounded-circle ms-3 mt-3" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsQhR6JWWhb68Nz_vLkh-tip454BNgEKocgg&s" alt="" />
                      <img className="rounded-circle ms-3 mt-3" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01YdOXA8nYkxTFcY2Qj-yq-1raQNUnIk9rNyWrXPLEnTvsRTYW75so9IAUx6shol_ViY&usqp=CAU" alt="" />
                      <img className="rounded-circle ms-3 mt-3" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM63cmNP0ltQ6b-q4PJFMsXB6P0aptMxu6D1f5QizvIuyhcq9NQXvFxtdq5WS3Q-umij8&usqp=CAU" alt="" />
                      <img className="rounded-circle ms-3 mt-3" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgYj3wmgKDT0uxK9jRSQpGHTxjJLRGoDjaqsYvA6dXeMIOZRpCcmJxL1qRJpyhywn4LCs&usqp=CAU" alt="" />
                      <img className="rounded-circle ms-3 mt-3" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpZ7HAiUsTmjmzAFxUZKQaVYSDK3j3OWhLkXfC_di4nVVKrl25gWAC_Fk__Uu4kol3k8&usqp=CAU" alt="" />
                      <img className="rounded-circle ms-3 mt-3 bg-black opacity-25" width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpZ7HAiUsTmjmzAFxUZKQaVYSDK3j3OWhLkXfC_di4nVVKrl25gWAC_Fk__Uu4kol3k8&usqp=CAU" alt="" />
                  </div>
              </div>
            {/* quốc gia & diễn viên, đạo diển  */}

            {/* tập phim */}
            <div style={{backgroundColor:"#808080"}}>
            <div className=" ms-5 fs-2 mt-5">Danh Sách Tập Phim</div>
            <SlideShowAnother></SlideShowAnother>
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
              <SlideShow></SlideShow>
            </div>
            {/* Có thể bạn sẽ thích */}
          </div>   
        </>
    )
}
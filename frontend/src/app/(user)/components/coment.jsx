import CardSlide from "./cardslide";

export default function Comment(){
    return (
        <>
          <div className="font-monospace text-white" >
                <p className="ms-3 pt-2">Bình luận tại đây</p>
                <div className="col mb-3" style={{backgroundColor:"white", height:"1px"}}></div>
                <div className="row mb-3">
                    <div className="col-2 ps-5">
                        <img className=" rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <form class="">
                          <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Viết Bình Luận ..." rows="3"></textarea>
                        </form>
                    </div>
                </div>
                {/* load bình luận */}
                <div className="row rounded-pill bg-dark mt-3">
                    <div className="col-2 mt-3 ps-5">
                        <img className="rounded-pill" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <div className="fs-4 text-danger fw-bold">Anh Thư</div>
                        <p style={{fontSize:"12px"}}>Thời gian ....</p>
                        <div>Phim này hay vá ~~</div>
                    </div>
                    <div className="col-2 text-warning mt-2">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <div className="row rounded-pill bg-dark mt-3">
                    <div className="col-2 mt-3 ps-5">
                        <img className="rounded-pill" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <div className="fs-4 text-danger fw-bold">Anh Thư</div>
                        <p style={{fontSize:"12px"}}>Thời gian ....</p>
                        <div>Phim này hay vá ~~</div>
                    </div>
                    <div className="col-2 text-warning">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>

                <div className="row rounded-pill bg-dark mt-3">
                    <div className="col-2 mt-3 ps-5">
                        <img className="rounded-pill" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <div className="fs-4 text-danger fw-bold">Anh Thư</div>
                        <p style={{fontSize:"12px"}}>Thời gian ....</p>
                        <div>Phim này hay vá ~~</div>
                    </div>
                    <div className="col-2 text-warning">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                {/* load bình luận */}


          </div>
        </>
    )
}
import CardSlide from "./cardslide";

export default function Comment(){
    return (
        <>
          <div className="font-monospace text-white" style={{backgroundColor:"#283237"}}>
                <p className="ms-3 pt-2">Bình luận tại đây</p>
                <div className="col mb-3" style={{backgroundColor:"white", height:"1px"}}></div>
                <div className="row mb-3">
                    <div className="col-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-50px"}}>
                        <form class="">
                          <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Viết Bình Luận ..." rows="3"></textarea>
                        </form>
                    </div>
                </div>
                {/* load bình luận */}
                <div className="row">
                    <div className="col-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-50px"}}>
                        <div className="fs-4">Anh Thư</div>
                        <div>Phim này hay vá ~~</div>
                        <p style={{fontSize:"12px"}}>Thời gian ....</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                    </div>
                    <div className="col" style={{marginLeft:"-50px"}}>
                        <div className="fs-4">Anh Thư</div>
                        <div>Phim này hay vá ~~</div>
                        <p style={{fontSize:"12px"}}>Thời gian ....</p>
                    </div>
                </div>
                {/* load bình luận */}


          </div>
        </>
    )
}
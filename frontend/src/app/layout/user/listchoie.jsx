export default function ListChoie(){
    return(
        <>
            <div className="card">
              <div className="card-body">
                <p className="card-subtitle">Hôm nay xem gì ? </p>
                <div className="row">
                    <div className=" col-4 homnayxemgi mb-3 mt-3"></div>
                    <div className=" col mb-3 mt-3 homnayxemgi2"></div>
                </div>
                <p className="card-subtitle mb-2" style={{color:"#758792"}}>Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho bạn</p>
                <button class="btn btn-danger font-monospace" type="submit"><i class="fa-solid fa-play text-white"></i> Xem Phim <b>Ngẫu Nhiên</b> </button>
              </div>
            </div>
            <div className="card mt-3">
                <img src="/images/gif.gif" width={"100%"} alt="" />
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <p className="card-subtitle">PHIM MỚI CÂP NHẬT </p>
                    <div className="row">
                        <div className=" col-4 homnayxemgi mb-3 mt-3"></div>
                        <div className=" col mb-3 mt-3 homnayxemgi2"></div>
                    </div>
                    <div>
                        <div className="row">
                            <div className=" col mb-3 mt-3">
                                <p className="card-subtitle mb-2" style={{color:"#c49290"}}>one pice</p>
                            </div>
                            <div className=" col-3 mb-3 mt-3">
                                <i>Tập 15</i>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" col mb-3 mt-3">
                                <p className="card-subtitle mb-2" style={{color:"#c49290"}}>two pice</p>
                            </div>
                            <div className=" col-3 mb-3 mt-3">
                                <i>Tập 15</i>
                            </div>
                        </div>
                        <div className="col">        
                            <p className="card-subtitle mb-2">Xem Thêm ...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Film(){

    return (
        <>
        <div className="">
          <div class="card text-bg-dark " style={{width:"450px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row position-relative">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white me-3" style={{width:"80px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white position-absolute" style={{width:"47px", height:"47px", right:"0px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"  style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
        </div>
        </>
    )
}
import "../../../app/globals.css"

export default function CardSlide(){
    return (
        <>
        <div className=" d-flex justify-content-between">

          <div class="card text-bg-dark me-3" style={{width:"140px"}}>
            <div className="bg-black opacity-75">
                <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={200} class="card-img" alt="..."/>
            </div>
            <div class="card-img-overlay ">
              <div className="row">
                  <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                    <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                  </div>
                  <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                    <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                  </div>
              </div>
              <h5 class="card-title ten fw-bold mt-3">One Pice</h5>
            </div>
            <div class="play-icon-overlay">
              <i class="fa-solid fa-play fa-2xl text-white"></i>
            </div>
          </div>


        </div>
        </>
    )
}
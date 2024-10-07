import CardSlide from "./cardslide";

export default function BannerAnother(){
    return (
        <>
          <div className=" position-relative text-center">
            <img src="/images/image 22.png" className="w-100" height={550} alt="" />
            <div className=" position-absolute" style={{top:"60px", left:"50px"}}>
               <div className="row w-100" >
                  <div className="col" >
                    <img src="/images/image 21.png" width={"100%"} alt="" />
                  </div>
                  <div className="col">
                     <div className="row">
                          <img src="/images/image 20.png" height={100} alt="" />
                         <div className="col mt-5">
                            <div className=" row row-cols-4" style={{width:400}}>
                               <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                               <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                               <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                               <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                            </div>
                            <div className="col mt-2 text-start">
                                Câu chuyện về số phận lắm chông gai của Liệt Như Ca vì những ân oán tình thù của thế hệ trước. 
                                Có ba chàng trai xuất hiện trong cuộc đời của Như Ca, đem lòng yêu thương cô. Vượt qua bao sóng gió, 
                                họ đã tìm được lời đáp cho số phận của mình và chấm dứt chuỗi bi kịch.     <br />                                            
                                <div className="btn btn-light rounded-pill mt-3">
                                    <i class="fa-solid fa-circle-play"></i> Xem Ngay
                                </div>
                            </div>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </>
    )
}
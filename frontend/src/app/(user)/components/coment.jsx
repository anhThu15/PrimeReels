import Link from "next/link";
import CardSlide from "./cardslide";

export default function Comment( props){
    return (
        <>
          <div className="text-white" >
                { localStorage.getItem("token") ? (
                    <>
                    <p className="ms-3 pt-2">Bình luận tại đây</p>
                    <div className="col mb-3" style={{backgroundColor:"white", height:"1px"}}></div>
                    <div className="row mb-3">
                        <div className="col-2 ps-5">
                            <img className=" rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                        </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <form className="">
                          <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Viết Bình Luận ..." rows="3"></textarea>
                        </form>
                    </div>
                    </div>
                    </>
                ) : (<p className="alert alert-danger text-center" role="alert " >Chưa Đăng Nhập, Mời Bạn <Link href={'/login'} className="nav-link fw-bold">Đăng Nhập Để Được Bình Luận</Link></p>)}


                
                {/* load bình luận */}
                { props.data?.map((cmt) => {
                    return(
                        <>
                            <div className="row d-flex flex-wrap rounded-pill bg-dark mt-3" >
                                <div className="col-1 mt-3 ps-4 me-5">
                                    <img className="rounded-pill" src={cmt.user.avatar} width={60} height={60} alt="" />
                                </div>
                                <div className="col"  >
                                    <div className="fs-4 text-danger fw-bold">{cmt.user.user_name}</div>
                                    <p style={{fontSize:"12px"}}>{cmt.updated_at}</p>
                                    <div>{cmt.content}</div>
                                </div>
                                <div className="col-2 text-warning mt-2">
                                    {cmt.rating}
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </>
                    )
                })}

                {/* load bình luận */}


          </div>
        </>
    )
}
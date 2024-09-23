'use client'
import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import React from 'react'
import ReactPlayer from 'react-player'


export default function Watch(){
  // const id = params.id

    return(
        <>
             <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%"}}>
                <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark" >
                    
                      <div className=" col font-monospace text-white">
                        
                        {/* breakcum */}
                        <div className="col font-monospace text-white">
                            <div className="col mt-2">
                                <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                  <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a className="text-white" href="#">Trang Chủ</a></li>
                                    <li class="breadcrumb-item" aria-current="page">Xem Phim</li>
                                    <li class="breadcrumb-item" aria-current="page">Phim gì đó</li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}


                      {/* video phim */}
                      <div className="col font-monospace text-white">
                          <ReactPlayer url='https://youtu.be/ZfjOUs6AwM8?si=6b3yvgwgg12aOUId' controls/>
                      </div>
                      {/* video phim */}



                      </div>


                      <div className=" mt-5 col-4 font-monospace text-white">
                          <ListChoie></ListChoie>
                      </div>



                </div>
             </div>
        </>
    )
}
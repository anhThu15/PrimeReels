'use client'
import ReactPlayer from 'react-player/lazy';
import { React, useState, useEffect } from 'react'
import Link from 'next/link';

export default function Video(props){
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    })

    return (
        <>  
             {localStorage.getItem("token") ? (
                    <>
                    {isClient ? <ReactPlayer className="w-100" height={550} style={{ marginTop: "-18px" }} url={props.data?.video_url} controls /> : 'Load...'}
                    </>
                ) : (
                    <>
                        <div className="w-100 d-flex justify-content-around " style={{height:"550px"}} >
                            <div className='text-center fw-bold' style={{marginTop:"200px"}} >
                                Vui lòng đăng nhập để xem nội dung <br />
                                <Link href={'/register'} className='btn btn-danger me-2 mt-3'>Đăng Ký Trãi Nghiệm Tốn Phí</Link>
                                <Link href={'/login'} className='btn btn-secondary mt-3'>Đăng Nhập</Link>
                            </div>
                        </div>
                    </>
                )}

        </>
    )
}
'use client'
import ReactPlayer from 'react-player/lazy';
import { React, useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Video(props){
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [episodes, setEpisodes] = useState([])
    useEffect(() => {
        setIsClient(true)
    })

    const handleNext = async () => {
        try {
            // console.log(props.data.episode);
            const id = props.data.episode.movie_id
            const idEpisode = props.data.episode.episode_id
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`, { revalidate: 3600 }).then((res) => res.data)

                // tìm vị trí trong mãng 0 là có -1 là xủi
                const findEp = res.findIndex(episode => episode.episode_id === idEpisode);

                let nextEpisodeId = idEpisode; // Giá trị mặc định nếu không tìm thấy episode tiếp theo

                if (findEp !== -1 && findEp + 1 < res.length) {
                  nextEpisodeId = res[findEp + 1].episode_id; // Lấy episode_id tiếp theo
                }

                // console.log(nextEpisodeId);
                
                router.push(`/watch/${id}/${nextEpisodeId}`)
        } catch (error) {
            console.log(error);
        }
      }
    // console.log(episodes);
    

    return (
        <>  
             {localStorage.getItem("token") ? (
                    <>
                    {isClient ? <ReactPlayer className="w-100" height={550} url={props.data.video_url} controls /> : 'Load...'}
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
            <div className="mt-3 d-flex">
                <button className="me-3 btn btn-outline-light" onClick={() => handleNext()}><i class="fa-solid fa-forward"></i> Tập Tiếp Theo</button>
                <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-bookmark"></i> Thêm Vào Thư Viện</button>
                <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-rotate-left"></i> Lịch Sử Xem</button>
                <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-comment"></i> Bình Luận</button>
            </div>

        </>
    )
}
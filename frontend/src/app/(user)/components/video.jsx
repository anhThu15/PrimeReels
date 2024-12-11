'use client'
import ReactPlayer from 'react-player/lazy';
import { React, useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Video(props) {
    const token = Cookies.get('token');
    const id = props.data.episode?.movie_id
    const idEpisode = props.data.episode?.episode_number
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    })

    useEffect(() => {
        const addHistory = async () => {
            // const token = localStorage.getItem('token');
            try {
                const Check = await axios.get(`/api/history`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).then((res) => res.data)

                const CheckArr = Array.isArray(Check.data) ? Check.data : [];

                const episodeIndex = CheckArr.findIndex(item => item.episode_id === idEpisode);

                if (episodeIndex === -1) {
                    const res = await axios.post(`/api/movies/${id}/episodes/${idEpisode}/history`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }).then((res) => res.data)
                    // console.log(episodeExists);
                } else {
                    console.log('có rồi');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        setTimeout(() => {
            addHistory();
        }, 1500);
    }, [id, idEpisode]);

    const handleNext = async () => {
        try {
            const res = await axios.get(`/api/movies/${props.data?.episode?.movie_id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.data)

            // console.log(res.episode.length);

            
            if(res.episode.length === 1){
                toast.error('Phim này là phim lẻ, chỉ có 1 tập')
            }else{
                let nextEpisodeId = idEpisode + 1; 
                router.push(`/watch/${id}/${nextEpisodeId}`)
            }
            


        } catch (error) {
            console.log(error);
        }
    }
    // console.log(episodes);

    const handleLove = async () => {
        try {
            // console.log(props.data.episode);
            // const token = localStorage.getItem('token');
            const id = props.data.episode.movie_id
            // console.log(id);
            const res = await axios.post(`/api/movies/${id}/favourites`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.data)

            if (!res) {
                toast.error('Đã Được Thêm Vào Danh Sách Yêu Thích');
            } else {
                toast.success("Thêm Thành Công Vào Danh Sách Yêu Thích");
            }

        } catch (error) {
            // console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                return error.response.data.message; // Trả về hoặc xử lý message từ lỗi
            } else {
                console.error('An unexpected error occurred:', error);
                return 'An unexpected error occurred';
            }
        }
    }


    const hanldeScrooll = () => {
        const section = document.getElementById('target-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            {token ? (
                <>
                    {isClient ?
                        (
                            <>
                                <ReactPlayer className="w-100" height={550} url={props.data.video_url} controls />
                                <div className="mt-3 d-flex">
                                    <button className="me-3 btn btn-outline-light" onClick={() => handleNext()}><i class="fa-solid fa-forward"></i> Tập Tiếp Theo</button>
                                    <button className="me-3 btn btn-outline-light" onClick={() => handleLove()}><i class="fa-solid fa-bookmark"></i> Thêm Vào Thư Viện</button>
                                    <Link href={'/in4'} className="me-3 btn btn-outline-light"><i class="fa-solid fa-rotate-left"></i> Lịch Sử Xem</Link>
                                    <button className="me-3 btn btn-outline-light" onClick={() => hanldeScrooll()}><i class="fa-solid fa-comment"></i> Bình Luận</button>
                                </div>
                            </>
                        )
                        : 'Load...'}
                </>
            ) : (
                <>
                    <div className="w-100 d-flex justify-content-around " style={{ height: "550px" }} >
                        <div className='text-center fw-bold' style={{ marginTop: "200px" }} >
                            Vui lòng đăng nhập để xem nội dung <br />
                            <Link href={'/register'} className='btn btn-danger me-2 mt-3'>Đăng Ký Trải Nghiệm Tốn Phí</Link>
                            <Link href={'/login'} className='btn btn-secondary mt-3'>Đăng Nhập</Link>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
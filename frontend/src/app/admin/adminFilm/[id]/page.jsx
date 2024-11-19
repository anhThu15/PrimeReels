"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function AddNewFilm({ params }) {
    const token = Cookies.get('token');
    const id = params.id
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();
    const { register: registerForm3, handleSubmit: handleSubmitForm3, formState: { errors: errorsForm3 } } = useForm();
    const { register: registerForm4, handleSubmit: handleSubmitForm4, formState: { errors: errorsForm4 } } = useForm();
    const [activeTab, setActiveTab] = useState('info');
    const [genres, setGenres] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [film, setFilm] = useState([]);
    const [types, setTypes] = useState([])

    const [actors, setActors] = useState([])
    const [TLS, setTLS] = useState([])

    const [episodes, setEpisodes] = useState([])
    const [filteredEpisodes, setFilteredEpisodes] = useState([]);

    const [actorSearchTerm, setActorSearchTerm] = useState('');
    const [filteredActors, setFilteredActors] = useState([]);

    const [filteredGenres, setFilteredGenres] = useState([]);

    const [filteredCmt, setFilteredCmt] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');

    useEffect(() => {
        const getFilm = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`)
                .then((res) => res.data)
            setFilm(res)
            setValue('title', res.title);
            setValue('poster', res.poster);
            setValue('banner', res.banner)
            setValue('description', res.description)
            setValue('director', res.director)
            setValue('duration', res.duration)
            setValue('country', res.country)
            setValue('status', res.status)
            setValue('movie_type_id', res.movie_type_id)
            setValue('views', res.views)
            setValue('rating', res.rating)
            setValue('favorites_count', res.favorites_count)
        }
        if (id) {
            getFilm();
        }
    }, [id, setValue])

    useEffect(() => {
        const getTypes = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types`).then((res) => res.data)
            setTypes(res)
        }
        const getEpisodes = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`).then((res) => res.data)
            setEpisodes(res);
            setFilteredEpisodes(res);
        }
        const getActors = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actors`).then((res) => res.data)
            setActors(res)
        }
        const getGenres = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres`).then((res) => res.data)
            setTLS(res)
        }

        getTypes()
        getEpisodes()
        getActors()
        getGenres()
    }, [])

    // xử l1y form
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            console.log(data);

            // const token = localStorage.getItem('token');
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.data);
            if (res) {
                // alert('thành công ròi đi chữa lãnh hoy ~~~')
                toast.success("Thao tác thành công")
                router.push('/admin/adminFilm')
            } else {
                // Xử lý hiển thị lỗi
                toast.error("Thao tác thất bại hãy kiểm tra lại!")
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    //  xử lý tập phim 
    const onAddEpisode = async (data) => {
        try {
            //   console.log(data);
            // const token = localStorage.getItem('token');

            const formData = new FormData(); // Tạo FormData mới

            // Thêm các trường dữ liệu vào FormData
            formData.append('episode_number', data.episode_number);
            formData.append('duration', data.duration);
            formData.append('link', data.video);
            formData.append('status', data.status);

            // Gửi yêu cầu POST với FormData
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Đảm bảo kiểu nội dung là multipart/form-data
                    "Accept": "application/json"
                }
            }).then((res) => res.data);
            if (res) {
                // alert('thành công ròi đi chữa lãnh hoy ~~~')
                toast.success("Thao tác thành công")
                window.location.reload();
            } else {
                // Xử lý hiển thị lỗi
                toast.error("Thao tác thất bại hãy kiểm tra lại!")
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }


    }

    const deleteEpisode = async (data) => {
        try {
            // const token = localStorage.getItem('token');
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/episodes/${data}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.data);
            if (res) {
                // alert('thành công ròi đi chữa lãnh hoy ~~~')
                toast.success("Thao tác thành công")
                window.location.reload()
            } else {
                // Xử lý hiển thị lỗi
                toast.error("Thao tác thất bại hãy kiểm tra lại")
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    }
    //  xử lý tập phim 

    //  xử lý form diễn viên
    const onAddActors = async (data) => {
        try {
            //   console.log(data);
            // const token = localStorage.getItem('token');

            // Gửi yêu cầu POST với FormData
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/actors`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Đảm bảo kiểu nội dung là multipart/form-data
                    "Accept": "application/json"
                }
            }).then((res) => res.data);
            if (res) {
                toast.success("Thao tác thành công")
                window.location.reload();
            } else {
                // Xử lý hiển thị lỗi
                toast.error("Thao tác thất bại hãy kiểm tra lại")
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    }
    //  xử lý form diễn viên

    //  xử lý form thể loại
    const onAddGenres = async (data) => {
        try {
            console.log(data);
            // const token = localStorage.getItem('token');

            // Gửi yêu cầu POST với FormData
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/genres`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Đảm bảo kiểu nội dung là multipart/form-data
                    "Accept": "application/json"
                }
            }).then((res) => res.data);
            if (res) {
                // alert('thành công ròi đi chữa lãnh hoy ~~~')
                toast.success("Thao tác thành công")
                window.location.reload();
            } else {
                // Xử lý hiển thị lỗi
                toast.error("Thao tác thất bại hãy kiểm tra lại")
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    }
    //  xử lý form thể loại

    // tempelate
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            event.preventDefault();
            setGenres([...genres, inputValue]);
            setInputValue('');
        }
    };
    const handleRemove = (index) => {
        const newGenres = genres.filter((_, i) => i !== index);
        setGenres(newGenres);
    };
    // tempelate

    const handleDeleteCmt = async (data) => {
        try {
            // const token = localStorage.getItem('token');http://127.0.0.1:8000/api/movies/{movieId}/comments/{commentId}
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/comments/${data}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert('Thành công ròi đi chữa lãnh hoy ~~~');
            // toast.success("Xóa phim thành công",data)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteActors = async (data) => {
        // console.log([data]);
        const actor_id = [data]
        // http://127.0.0.1:8000/api/movies/{movieId}/actors
        try {
            const query = actor_id.map(id => `actor_id[]=${id}`).join('&');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/actors?${query}` ,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // alert('Thành công ròi đi chữa lãnh hoy ~~~');
            toast.success("Xóa phim thành công")
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteGenre = async (data) => {
        const genre_id= [data]
        try {
            const query = genre_id.map(id => `genre_id[]=${id}`).join('&');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/genres?${query}` ,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // alert('Thành công ròi đi chữa lãnh hoy ~~~' + data);
            toast.success("Xóa phim thành công")
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (episodes.length > 0) {
            let filtered = episodes.filter(episode => {
                return episode.episode_number.toString().includes(searchTerm);
            });

            // Sắp xếp theo yêu cầu
            if (sortOrder === 'asc') {
                filtered.sort((a, b) => a.episode_number - b.episode_number);
            } else if (sortOrder === 'desc') {
                filtered.sort((a, b) => b.episode_number - a.episode_number);
            }

            setFilteredEpisodes(filtered);
        }
    }, [searchTerm, sortOrder, episodes]);

    useEffect(() => {
        if (film && film.actors) {
            const filtered = film.actors.filter(actor =>
                actor.name.toLowerCase().includes(actorSearchTerm.toLowerCase())
            );
            if (sortOrder === 'asc') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOrder === 'desc') {
                filtered.sort((a, b) => b.name.localeCompare(a.name));
            }
            setFilteredActors(filtered);
        }
    }, [actorSearchTerm, sortOrder, film]);

    useEffect(() => {
        if (film && film.genres) {
            // Sử dụng searchTerm để lọc các thể loại
            const filtered = film.genres.filter(genre =>
                genre.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Sắp xếp theo thứ tự nếu có sortOrder
            if (sortOrder === 'asc') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOrder === 'desc') {
                filtered.sort((a, b) => b.name.localeCompare(a.name));
            }

            setFilteredGenres(filtered);
        }
    }, [searchTerm, sortOrder, film]);

    useEffect(() => {
        if (film && film.comments) {
            // Lọc bình luận theo nội dung
            const filtered = film.comments.filter(comment =>
                comment.content.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Sắp xếp theo thứ tự nếu có sortOrder
            if (sortOrder === 'asc') {
                filtered.sort((a, b) => a.content.localeCompare(b.content));
            } else if (sortOrder === 'desc') {
                filtered.sort((a, b) => b.content.localeCompare(a.content));
            }

            setFilteredCmt(filtered);
        }
    }, [searchTerm, sortOrder, film]);

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow mt-2 rounded">
                            <button className="btn btn-primary mb-3">Lưu</button>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Tên Phim</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim"
                                            {...register('title', { required: 'Tiêu Đề Phim là bắt buộc' })} />
                                        {errors.title && <div className="text-danger">{errors.title.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Poster Phim</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập Poster bộ phim"
                                            {...register('poster', { required: 'Poster Phim là bắt buộc' })} />
                                        {errors.poster && <div className="text-danger">{errors.poster.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Banner Phim</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập banner bộ phim"
                                            {...register('banner', { required: 'Banner Phim là bắt buộc' })} />
                                        {errors.banner && <div className="text-danger">{errors.banner.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorBio" className="form-label">Mô tả</label>
                                        <textarea className="form-control rounded" id="actorBio" rows="10" placeholder="Mô tả bộ phim"
                                            {...register('description', { required: 'Mô Tả Phim là bắt buộc' })} />
                                        {errors.description && <div className="text-danger">{errors.description.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Đạo diễn</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim"
                                            {...register('director', { required: 'Đạo diễn Phim là bắt buộc' })} />
                                        {errors.director && <div className="text-danger">{errors.director.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Thời Gian</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim"
                                            {...register('duration', { required: 'Thời Gian Phim là bắt buộc' })} />
                                        {errors.duration && <div className="text-danger">{errors.duration.message}</div>}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Quốc Gia</label>
                                        <input type="text" className="form-control rounded" id="countryFilm" placeholder="Nhập quốc gia"
                                            {...register('country', { required: 'Đất Nước là bắt buộc' })} />
                                        {errors.country && <div className="text-danger">{errors.country.message}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Trạng thái</label>
                                        <select class="form-select" aria-label="Default select example"
                                            {...register('status', { required: 'Trạng Thái là bắt buộc' })} >
                                            <option selected value="1">Công khai</option>
                                            <option value="0">Không công khai</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Loại phim</label>
                                        <select class="form-select" aria-label="Default select example"
                                            {...register('movie_type_id', { required: 'Trạng Thái là bắt buộc' })}>
                                            {types.map((type) => {
                                                return (
                                                    <>
                                                        <option value={type.movie_type_id}>{type.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <input type="hidden" value={Number(1)}{...register('views')} />
                                        <input type="hidden" value={Number(1)}{...register('rating')} />
                                        <input type="hidden" value={Number(1)}{...register('favorites_count')} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            case 'episodes':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <h2 className=" col fw-bold">Danh Sách Phim</h2>
                            <div className="col-2 mb-3">

                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    + Thêm Tập Phim
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Mới Tập Phim</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form onSubmit={handleSubmitForm2(onAddEpisode)}>
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên Tập Phim</label>
                                                        <input type="number" class="form-control rounded"
                                                            {...registerForm2('episode_number', { required: 'Tên Tập Phim là bắt buộc' })} />
                                                        {errorsForm2.episode_number && <div className="text-danger">{errorsForm2.episode_number.message}</div>}
                                                    </div>
                                                    {/* <div class="mb-3">
                                                        <label class="form-label">Video</label>
                                                        <input type="file" class="form-control  rounded" 
                                                            {...registerForm2('video', { required: 'Tên Tập Phim là bắt buộc' })} />
                                                            {errorsForm2.video && <div className="text-danger">{errorsForm2.video.message}</div>}
                                                    </div> */}
                                                    <div class="mb-3">
                                                        <label class="form-label">Video</label>
                                                        <input type="text" class="form-control  rounded"
                                                            {...registerForm2('video', { required: 'Tên Tập Phim là bắt buộc' })} />
                                                        {errorsForm2.video && <div className="text-danger">{errorsForm2.video.message}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Khoảng Thời Gian </label>
                                                        <input type="text" class="form-control  rounded"
                                                            {...registerForm2('duration', { required: 'Khoảng Thời Gian Tập Phim là bắt buộc' })} />
                                                        {errorsForm2.duration && <div className="text-danger">{errorsForm2.duration.message}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputPassword1" class="form-label">Trạng Thái</label>
                                                        <select class="form-select" aria-label="Default select example"
                                                            {...registerForm2('status', { required: 'Trạng Thái Tập Phim là bắt buộc' })}>
                                                            <option selected value={1}>Công Khai</option>
                                                            <option value={0}>Không Công Khai</option>
                                                        </select>
                                                        {errorsForm2.status && <div className="text-danger">{errorsForm2.status.message}</div>}
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Thêm Tập Phim </button>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Tìm kiếm tập phim ( ghi số tập cụ thể vd: 1)"
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                </form>
                            </div>
                            <div className="col">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('asc')}>A-Z</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('desc')}>Z-A</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">20</a></li>
                                        <li><a class="dropdown-item" href="#">30</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">TÊN TẬP PHIM</th>
                                    <th scope="col">LINK</th>
                                    <th scope="col">THỜI LƯỢNG</th>
                                    <th scope="col">TRẠNG THÁI</th>
                                    <th scope="col">TÁC VỤ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEpisodes.map((episode, i) => {
                                    return (
                                        <>
                                            <tr key={episode.episode_id}>
                                                <th scope="row">
                                                    <input type="checkbox" />
                                                </th>
                                                <th scope="row">{i + 1}</th>
                                                <td>Tập {episode.episode_number}</td>
                                                <td>{episode.video_url}</td>
                                                <td>
                                                    {episode.duration} Phút
                                                </td>
                                                <td>
                                                    {episode.status == 1 ? (<div class="bg-success text-white rounded text-center">
                                                        Công Khai
                                                    </div>) : (<div class="bg-warning text-white rounded text-center">
                                                        Không Công Khai
                                                    </div>)}
                                                </td>
                                                <td>
                                                    <Link className="btn btn-secondary ms-2" href={`/admin/adminFilm/${id}/episode/${episode.episode_number}`} >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </Link>
                                                    <button className="btn btn-danger ms-2" onClick={() => { deleteEpisode(episode.episode_number) }}><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            case 'comments':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <h2 className=" col fw-bold">Bình Luận</h2>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Tìm kiếm theo bình luận"
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                </form>
                            </div>
                            <div className="col">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('asc')}>A-Z</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('desc')}>Z-A</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">20</a></li>
                                        <li><a className="dropdown-item" href="#">30</a></li>
                                        <li><a className="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">AVATAR</th>
                                    <th scope="col">TÊN</th>
                                    <th scope="col">ĐÁNH GIÁ</th>
                                    <th scope="col">NỘI DUNG</th>
                                    <th scope="col">THỜI GIAN</th>
                                    <th scope="col">ẨN HIỆN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCmt.map((cmt) => (
                                    <tr key={cmt.comment_id}>
                                        <th scope="row">
                                            <input type="checkbox" />
                                        </th>
                                        <th scope="row">{cmt.comment_id}</th>
                                        <td>
                                            <img src={cmt.user.avatar} alt="" style={{ width: "50px", height: "100%", objectFit: "cover" }} className="rounded-circle" />
                                        </td>
                                        <td>{cmt.user.user_name}</td>
                                        <td>
                                            {cmt.rating}
                                            <i className="fa-solid fa-star mx-1" style={{ color: "gold" }}></i>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                            {cmt.content}
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            {cmt.updated_at}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger ms-2" onClick={() => handleDeleteCmt(cmt.comment_id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'actors':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <h2 className=" col fw-bold">Danh Sách Diễn Viên</h2>
                            <div className="col-2 mb-3">

                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    + Thêm Diễn Viên
                                </button>

                                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Diễn Viên</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form onSubmit={handleSubmitForm3(onAddActors)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="countryFilm" className="form-label">Diễn Viên</label>
                                                        <select class="form-select" aria-label="Default select example"
                                                            {...registerForm3('actor_id', { required: 'Diễn viên không được để trống' })} multiple >
                                                            {actors.map((gr) => {
                                                                return (
                                                                    <>
                                                                        <option selected value={[gr.actor_id]}>{gr.name}</option>
                                                                    </>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Thêm Diễn Viên</button>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Tìm kiếm tên diễn viên"
                                        onChange={(e) => setActorSearchTerm(e.target.value)} // Cập nhật đây
                                    />
                                </form>
                            </div>
                            <div className="col">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('asc')}>A-Z</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('desc')}>Z-A</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">20</a></li>
                                        <li><a class="dropdown-item" href="#">30</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">AVATAR</th>
                                    <th scope="col">TÊN</th>
                                    <th scope="col">Ngày sinh Nhật</th>
                                    <th scope="col">NỘI DUNG</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredActors.map((cmt) => {
                                    // console.log(cmt)
                                    return (
                                        <>
                                            <tr key={cmt.actor_id}>
                                                <th scope="row">
                                                    <input type="checkbox" />
                                                </th>
                                                <th scope="row">{cmt.actor_id}</th>
                                                <td>
                                                    <img src={cmt.image_url} alt="" style={{ width: "50px", height: "100%", objectFit: "cover" }} className="rounded-circle" />
                                                </td>
                                                <td>{cmt.name}</td>
                                                <td>
                                                    {cmt.birth_date}
                                                </td>
                                                <td style={{ width: "30%" }}>
                                                    {cmt.biography}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger ms-2" onClick={() => handleDeleteActors(cmt.actor_id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            case 'genres':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <h2 className=" col fw-bold">Danh Sách Thể Loại</h2>
                            <div className="col-2 mb-3">

                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                    + Thêm Thể Loại
                                </button>

                                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Thể Loại</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form onSubmit={handleSubmitForm4(onAddGenres)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="countryFilm" className="form-label">Thể Loại</label>
                                                        <select class="form-select" aria-label="Default select example"
                                                            {...registerForm4('genre_id', { required: 'Thể Loại không được để trống' })} multiple >
                                                            {TLS.map((gr) => {
                                                                return (
                                                                    <>
                                                                        <option selected value={[gr.genre_id]}>{gr.name}</option>
                                                                    </>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Thêm Thể Loại</button>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Tìm kiếm theo thể loại"
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                </form>
                            </div>
                            <div className="col">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('asc')}>A-Z</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => setSortOrder('desc')}>Z-A</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">20</a></li>
                                        <li><a class="dropdown-item" href="#">30</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">TÊN</th>
                                    <th scope="col">NỘI DUNG</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGenres.map((cmt) => {
                                    return (
                                        <>
                                            <tr key={cmt.genre_id}>
                                                <th scope="row">
                                                    <input type="checkbox" />
                                                </th>
                                                <th scope="row">{cmt.genre_id}</th>
                                                <td>{cmt.name}</td>
                                                <td>
                                                    {cmt.description}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger ms-2" onClick={() => handleDeleteGenre(cmt.genre_id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex gap-3 align-items-center mt-2">
                    <Link href="/admin/adminFilm">
                        <button className="btn btn-danger">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </Link>
                    <h3 className="align-items-center">Cập nhật bộ phim</h3>
                </div>

                <div className="border rounded mt-4">
                    <div className="d-flex justify-content-around p-3">
                        <button onClick={() => setActiveTab('info')} className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-light'}`}>Thông tin phim</button>
                        <button onClick={() => setActiveTab('episodes')} className={`btn ${activeTab === 'episodes' ? 'btn-primary' : 'btn-light'}`}>Danh sách tập phim</button>
                        <button onClick={() => setActiveTab('actors')} className={`btn ${activeTab === 'actors' ? 'btn-primary' : 'btn-light'}`}>Danh sách Diễn Viên</button>
                        <button onClick={() => setActiveTab('genres')} className={`btn ${activeTab === 'genres' ? 'btn-primary' : 'btn-light'}`}>Danh sách Thể Loại </button>
                        <button onClick={() => setActiveTab('comments')} className={`btn ${activeTab === 'comments' ? 'btn-primary' : 'btn-light'}`}>Bình luận</button>
                    </div>

                    <div className="p-4">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </>
    );
}

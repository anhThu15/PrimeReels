"use client";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateActor({ params }) {
    const router = useRouter();
    const { id } = params;  // Extract the actor's ID from the URL parameters
    const [actor, setActor] = useState({
        name: '',
        biography: '',
        birth_date: '',
        image_url: '',  // This will store the image URL or file
    });
    const [loading, setLoading] = useState(true);

    // Fetch actor data when the component mounts or the id changes
    useEffect(() => {
        if (id) {
            fetchActor();
        }
    }, [id]);

    // Function to fetch actor details
    const fetchActor = async () => {
        const token = Cookies.get('token');  // Retrieve the token for authorization
        const res = await fetch(`/api/actors/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            setActor({
                ...data,
                birth_date: data.birth_date.split(' ')[0],  // Ensure date is in 'YYYY-MM-DD' format
                image_url: data.image_url || ''  // Populate image URL if available
            });
        } else {
            console.error('Error fetching actor data:', res.status);
            toast.error('Lỗi khi lấy thông tin diễn viên');
        }
        setLoading(false);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'birth_date') {

            const digits = value.replace(/\D/g, '');  
            let formattedDate = '';
            if (digits.length > 4) {
                formattedDate += digits.slice(0, 4) + '-';
                if (digits.length > 6) {
                    formattedDate += digits.slice(4, 6) + '-';
                    formattedDate += digits.slice(6, 8);
                } else {
                    formattedDate += digits.slice(4);
                }
            } else {
                formattedDate = digits;
            }
            setActor({ ...actor, [name]: formattedDate });
        } else if (name === 'image_url') {

            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setActor((prevState) => ({
                        ...prevState,
                        image_url: reader.result  
                    }));
                };
                reader.readAsDataURL(file);  
            }
        } else {
            setActor({ ...actor, [name]: value });
        }
    };

    // Handle form submission (update actor)
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const token = Cookies.get('token'); 

    //     const formData = new FormData();  


    //     formData.append('name', actor.name);
    //     formData.append('biography', actor.biography);
    //     formData.append('birth_date', actor.birth_date);
    //     formData.append('image_url', actor.image_url);  

    //     const res = await fetch(`/api/actors/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         body: formData, 
    //     });

    //     if (res.ok) {
    //         toast.success('Cập nhật diễn viên thành công!');
    //         router.push('/administration/actor');
    //     } else {
    //         console.error('Error updating actor:', res.status);
    //         toast.error('Cập nhật không thành công!');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
    
        // Tạo đối tượng FormData chỉ chứa ảnh
        const formData = new FormData();
    
        // Nếu có ảnh được chọn, thêm nó vào FormData
        if (actor.image_url && actor.image_url.startsWith('data:image')) {
            const file = dataURLtoFile(actor.image_url, 'avatar.jpg');  // Chuyển dataURL thành file
            formData.append('image_url', file);
        }
    
        // Gửi dữ liệu không phải ảnh qua URL-encoded (x-www-form-urlencoded)
        const body = new URLSearchParams({
            name: actor.name,
            biography: actor.biography,
            birth_date: actor.birth_date,
        });
    
        // Cập nhật bằng PUT, gửi dữ liệu qua x-www-form-urlencoded + FormData cho ảnh
        const res = await fetch(`/api/actors/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',  // Đảm bảo Content-Type là x-www-form-urlencoded
            },
            body: body.toString() + '&' + formData.toString(),  // Gửi cả hai body: x-www-form-urlencoded và FormData
        });
    
        if (res.ok) {
            toast.success('Cập nhật diễn viên thành công!');
            router.push('/administration/actor');
        } else {
            console.error('Error updating actor:', res.status);
            toast.error('Cập nhật không thành công!');
        }
    };
    

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/administration/actor">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Cập nhật diễn viên</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên Diễn Viên</label>
                            <input
                                type="text"
                                className="form-control rounded"
                                id="actorName"
                                name="name"
                                value={actor.name}
                                onChange={handleChange}
                                placeholder="Victor Dobronravov"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorBio" className="form-label">Tiểu Sử</label>
                            <textarea
                                className="form-control rounded"
                                id="actorBio"
                                name="biography"
                                rows="10"
                                value={actor.biography}
                                onChange={handleChange}
                                placeholder="Viktor Dobronravov, sinh ngày 8 tháng 3 năm 1983 tại Taganrog, Nga..."
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        {/* <div className="text-center mb-3">
                            {actor.image_url && (
                                <img
                                    src={actor.image_url}
                                    alt="Avatar"
                                    style={{ width: "250px", objectFit: "cover", height: "300px" }}
                                    className="rounded-circle mb-3"
                                />
                            )}
                        </div> */}
                                    <div className="text-center mb-3">
                                {actor.image_url && (
                                    <img
                                    src={
                                        actor.image_url.startsWith("data:image")
                                        ? actor.image_url
                                        : `http://127.0.0.1:8000/storage/${actor.image_url}`
                                    }
                                    alt="Avatar"
                                    style={{ width: "250px", objectFit: "cover", height: "300px" }}
                                    className="rounded-circle mb-3"
                                    />
                                )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image_url" className="form-label">
                                        Ảnh Đại Diện
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control rounded"
                                        id="image_url"
                                        name="image_url"
                                        onChange={handleChange}
                                    />
                                    </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Ngày Sinh</label>
                            <input
                                type="text"
                                className="form-control rounded"
                                id="birthdate"
                                name="birth_date"
                                value={actor.birth_date}
                                onChange={handleChange}
                                placeholder="YYYY-MM-DD"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Lưu</button>
            </form>
        </div>
    );
}

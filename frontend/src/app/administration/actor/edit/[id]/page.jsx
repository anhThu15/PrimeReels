"use client";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UpdateActor({ params }) {
    const router = useRouter();
    const { id } = params;
    const [actor, setActor] = useState({
        name: '',
        biography: '',
        birth_date: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchActor();
        }
    }, [id]);

    const fetchActor = async () => {
        const token = Cookies.get('token');
        const res = await fetch(`http://127.0.0.1:8000/api/actors/${id}`, {
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
                birth_date: data.birth_date.split(' ')[0]
            });
        } else {
            console.error('Lỗi khi lấy thông tin diễn viên:', res.status);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Format date for birth_date input
        if (name === 'birth_date') {
            // Remove all non-digit characters
            const digits = value.replace(/\D/g, '');
            
            // Format the input as YYYY-MM-DD
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
            
            // Set the formatted date in the state
            setActor({ ...actor, [name]: formattedDate });
        } else {
            setActor({ ...actor, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        const res = await fetch(`http://127.0.0.1:8000/api/actors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(actor),
        });

        if (res.ok) {
            toast.success('Cập nhật diễn viên thành công!')
            router.push('/administration/actor');
        } else {
            console.error('Lỗi khi cập nhật diễn viên:', res.status);
            toast.error('Cập nhật không thành công!')
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
                                placeholder="Viktor Dobronravov, sinh ngày 8 tháng 3 năm 1983 tại Taganrog, Nga, là một diễn viên nổi tiếng của Nga, con trai của diễn viên Fyodor Dobronravov."
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        <div className="text-center mb-3">
                            <img 
                                src={actor.image_url} 
                                alt="Avatar" 
                                style={{ width: "250px", objectFit: "cover", height: "300px" }} 
                                className="rounded-circle mb-3" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image_url" className="form-label">URL Hình Ảnh</label>
                            <input 
                                type="text" 
                                className="form-control rounded" 
                                id="image_url" 
                                name="image_url" 
                                value={actor.image_url} 
                                onChange={handleChange} 
                                placeholder="https://example.com/avatar.jpg" 
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

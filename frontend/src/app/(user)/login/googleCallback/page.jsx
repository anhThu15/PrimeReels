"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
export default function GoogleCallback() {
    const router = useRouter();

    useEffect(() => {
        // Lấy các query parameters từ URL callback của Google
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            try {
                // Lưu token vào cookies
                Cookies.set('token', token, { secure: true, sameSite: 'strict', path: '/' });
                
                // Hiển thị thông báo đăng nhập thành công
                toast.success('Đăng nhập Google thành công!');

                // Điều hướng đến trang chính hoặc trang admin tùy vào vai trò người dùng
                router.push("/"); // Điều hướng về trang chủ sau khi đăng nhập
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi xử lý thông tin đăng nhập Google.');
                router.push("/login");
            }
        } else {
            toast.error('Đăng nhập Google thất bại.');
            router.push("/login");
        }
    }, [router]);

    return (
        <div>
            <h3>Đang xử lý đăng nhập bằng Google...</h3>
        </div>
    );
}
// >>>>>>> main

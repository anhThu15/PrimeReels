import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get('token');

    console.log("Middleware chạy, token:", token);

    if (!token) {
        console.log("Không có token, chuyển hướng đến /login");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            }
        });

        //kiểm tra điều kiện token có tồn tại không, không thì không cho vào các trang được bảo vệ
        if (res.status !== 200) {
            console.log("Token không hợp lệ hoặc hết hạn, chuyển hướng đến /login");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const user = await res.json();
        console.log("Dữ liệu người dùng:", user);
        //nếu không phải admin thì không cho vào trang admin ( role = 100)
        if (request.nextUrl.pathname === '/admin' && user.user.role !== 100) {
            console.log("Người dùng không phải admin, chuyển hướng đến /");
            return NextResponse.redirect(new URL('/', request.url));
        }

    } catch (error) {
        console.error('Lỗi trong quá trình gọi API:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/in4','/admin','/user-payment-package'],
};

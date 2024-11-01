import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get('token');
    const user = request.cookies.get('user') ? JSON.parse(request.cookies.get('user').value) : null;

    // Kiểm tra nếu không có token
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu người dùng không tồn tại hoặc không có quyền truy cập admin
    if (request.nextUrl.pathname === '/admin' && (!user || user.role !== 100)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Trường hợp người dùng có thể truy cập thông tin
    if (request.nextUrl.pathname === '/infomation' && !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/infomation', '/admin'],
};

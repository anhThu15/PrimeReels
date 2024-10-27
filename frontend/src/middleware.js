import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get('token');
    const user = request.cookies.get('user') ? JSON.parse(request.cookies.get('user').value) : null;


    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    if (!user || user.role !== 100) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/infomation', '/admin'],
};

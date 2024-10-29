"use client";
import Link from "next/link";
import "../../../app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function HeaderUser() {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState('https://chontruong.edu.vn/wp-content/uploads/2024/09/meo-meme-8WUtRYq.png'); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserName(user.user_name);
        setUserRole(user.role);
        if (user.avatar) {
          setUserAvatar(user.avatar);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict; secure";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict; secure";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
    toast.success("Đăng xuất thành công");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
      <div className="container">
        <img className="navbar-brand me-5" src="/images/Logo-PR-(1).png" width={100} alt="Logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/' ? 'active' : ''}`} href="/">TRANG CHỦ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/filmSeries' ? 'active' : ''}`} href="/filmSeries">PHIM BỘ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/oddFilm' ? 'active' : ''}`} href="/oddFilm">PHIM LẺ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/animeFilm' ? 'active' : ''}`} href="/animeFilm">PHIM HOẠT HÌNH</Link>
            </li>
          </ul>


          <div><i className="fa-solid fa-magnifying-glass me-3 text-white"></i></div>
          {isLoggedIn ? (
            <>
              <div className="rounded-pill bg-danger text-white me-3" style={{ width: "140px", height: "30px" }}>
                <Link href="/user-buy-package" style={{ textDecoration: 'none', color: 'white' }}>
                  <p className="mt-1 ms-2">MUA GÓI VIP <i className="fa-regular fa-gem"></i></p>
                </Link>
              </div>
              <li className="nav-item dropdown" style={{ listStyle: "none", color: "white" }}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={userAvatar} className="rounded-circle" width={45} height={45} alt="" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" href="/infomation">Xin chào, {userName}</Link></li>
                  {userRole === 100 && (
                    <li><Link className="dropdown-item" href="/admin">Trang quản trị</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={handleLogout}>Đăng Xuất</a></li>
                </ul>
              </li>
            </>
          ) : (
            <Link className="text-white nav-link" href="/login">ĐĂNG NHẬP</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

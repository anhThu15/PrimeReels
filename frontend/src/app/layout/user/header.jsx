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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem('user')); //lấy user đã được lưu là một object trong localStorage ra
      if (user) { 
        setUserName(user.user_name);  //và setUsername là user_name trong object
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    localStorage.removeItem("user"); // Xóa user đã đăng nhập
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
              <Link className={`nav-link me-3 font-monospace ${pathName == '/' ? 'active':''}`} href="/">TRANG CHỦ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 font-monospace ${pathName == '/filmSeries' ? 'active':''}`} href="/filmSeries">PHIM BỘ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 font-monospace ${pathName == '/oddFilm' ? 'active':''}`} href="/oddFilm">PHIM LẺ</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 font-monospace ${pathName == '/animeFilm' ? 'active':''}`}  href="/animeFilm">PHIM HOẠT HÌNH</Link>
            </li>
          </ul>

          <div><i className="fa-solid fa-magnifying-glass me-3 text-white"></i></div>
          <div className="rounded-pill bg-danger font-monospace text-white me-3" style={{ width: "140px", height: "30px" }}>
            <Link href="/user-buy-package" style={{ textDecoration: 'none', color: 'white' }}>
              <p className="mt-1 ms-2">MUA GÓI VIP <i className="fa-regular fa-gem"></i></p>
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {userName}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" href="/infomation">Cài đặt</Link></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
              </ul>
            </div>
          ) : (
            <Link className="text-white nav-link font-monospace" href="/login">ĐĂNG NHẬP</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

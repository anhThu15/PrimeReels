"use client";
import Link from "next/link";
import "../../../app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
export default function HeaderUser() {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState('https://chontruong.edu.vn/wp-content/uploads/2024/09/meo-meme-8WUtRYq.png'); 
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          const user = response.data.user;
          setUserName(user.user_name);
          setUserRole(user.role);
          setIsLoggedIn(true);
          const avatarUrl = user.avatar ? user.avatar : '';
          if (avatarUrl) {
            setUserAvatar(avatarUrl);
          } else {
            setUserAvatar('https://chontruong.edu.vn/wp-content/uploads/2024/09/meo-meme-8WUtRYq.png');
          }
          }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      });
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("token", { path: '/' });
    Cookies.remove("user", { path: '/' });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
    toast.success("Đăng xuất thành công");
    setIsLoggedIn(false);
  };
  

  const toggleSearch = () => setShowSearch(!showSearch); //mở input search

  //xử lý search theo query
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
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


          {/* <div><i className="fa-solid fa-magnifying-glass me-3 text-white"></i></div> */}
          <div onClick={toggleSearch} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-magnifying-glass me-3 text-white"></i>
          </div>
          {showSearch && (
            <input
              type="text"
              className="form-control me-3"
              style={{ width: "200px", transition: "width 0.3s" }}
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          )}
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

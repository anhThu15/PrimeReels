"use client";
import Link from "next/link";
import "../../../app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import styles from "../../(user)/page.module.css"
export default function HeaderUser() {
  const token = Cookies.get('token');
  const router = useRouter();
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [userAvatar, setUserAvatar] = useState('/images/userAvatar.png');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
   // Hàm để lấy thông tin người dùng từ API
   const fetchUserData = async () => {
    if (token) {
      try {
        const response = await axios.get(`/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data.user;
          setUserName(user.user_name);
          setUserRole(user.role);
          setIsLoggedIn(true);

          // Kiểm tra role và đặt avatar
          if (user.role === 100) {
            setUserAvatar('/images/adminAvatar.jpg'); // Avatar admin
          } else {
            const avatarUrl = user.avatar ? user.avatar : '';
            setUserAvatar(avatarUrl || '/images/userAvatar.png'); // Avatar user
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    }
  };

  // Dùng useEffect để gọi fetchUserData khi token thay đổi
  useEffect(() => {
    fetchUserData();
  }, [token]); // fetch lại dữ liệu khi token thay đổi
  
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

  const handleClickCheck = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Chưa Đăng Nhập Mời Bạn Đăng Nhập Để Mua Gói");
      router.push("/login");
    } else {
      router.push("/user-buy-package");
    }
  };

  const isTransparentPage = ["/", "/filmSeries", "/oddFilm", "/animeFilm", "/login", "/register"].includes(pathName);
  //dùng để xác định các trang như trang chủ, phim bộ, phim lẻ, phim hoạt hình để phần header có thể position và ngược lại

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.navMenuHeader} ${isTransparentPage ? styles.transparentHeader : styles.solidHeader}`}
      data-bs-theme="dark"
    >
      <div className="container">
        <Link href="/">
          <img className="navbar-brand me-5" src="/images/Logo-PR-(1).png" width={100} alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/' ? 'active' : ''} ${styles.navLink}`} href="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/filmSeries' ? 'active' : ''} ${styles.navLink}`} href="/filmSeries">
                Phim bộ
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/oddFilm' ? 'active' : ''} ${styles.navLink}`} href="/oddFilm">
                Phim lẻ
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link me-3 ${pathName === '/animeFilm' ? 'active' : ''} ${styles.navLink}`} href="/animeFilm">
                Phim hoạt hình
              </Link>
            </li>
          </ul>


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

          <div className="rounded-pill bg-danger text-white me-3" style={{ width: "140px", height: "30px" }}>
            <Link href='#' onClick={handleClickCheck} style={{ textDecoration: 'none', color: 'white' }}>
              <p className="" style={{margin:"2px 0 0 13px"}}>MUA GÓI VIP <i className="fa-regular fa-gem"></i></p>
            </Link>
          </div>
          {isLoggedIn ? (
            <>
              <li className="nav-item dropdown" style={{ listStyle: "none", color: "white" }}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={userAvatar} className="rounded-circle" width={45} height={45} alt="" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item">Xin chào, {userName}</li>
                  <li><Link className="dropdown-item" href="/in4">Trang tài khoản</Link></li>
                  {userRole === 100 && (
                    <li><Link className="dropdown-item" href="/administration">Trang quản trị</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>Đăng Xuất</a></li>
                </ul>
              </li>
            </>

            ) : (
              <Link className={`${styles.navLink} text-white`} href="/login" style={{textDecoration:"none"}}>
                Đăng nhập
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}
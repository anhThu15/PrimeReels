"use client";
import Link from "next/link";
import "../../../app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function HeaderAdmin() {
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
    router.push("/login");
    toast.success("Đăng xuất thành công");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <button className="btn btn-secondary ms-1" type="button" data-bs-toggle="collapse" data-bs-target="#moMenu" aria-expanded="false" aria-controls="moMenu">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 me-2 mb-lg-0">
            <div className="nav-item rounded-circle bg-secondary mt-2" style={{ width: "45px", height: "45px" }}>
              <i className="fa-solid fa-bell mt-3 ms-3"></i>
            </div>
            {isLoggedIn ? (
              <li className="nav-item dropdown" style={{ listStyle: "none", color: "black" }}>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={userAvatar} className="rounded-circle" width={45} height={45} alt="" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" href="/infomation">Xin chào admin, {userName}</Link></li>
                  {userRole === 100 && (
                    <li><Link className="dropdown-item" href="/admin">Trang quản trị</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={handleLogout}>Đăng Xuất</a></li>
                </ul>
              </li>
            ) : (
              <Link className="text-black nav-link" href="/login">ĐĂNG NHẬP</Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

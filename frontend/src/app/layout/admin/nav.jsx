import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAdmin(){
    const pathName = usePathname();
    return(
        <>
        <div className="col-md-2 p-0 collapse collapse-horizontal show" style={{minHeight: "100vh", backgroundColor: "#213436"}} id="moMenu">
          <strong className="text-center d-block p-3" style={{color: "white"}}> 
            <img src="/images/Logo-PR-(1).png" width="80px" alt=""/>
           </strong>
           <div className="list-group list-group-flush">
            <Link style={{backgroundColor:"#213436"}} href="/admin" className={`list-group-item list-group-item-action text-white ${pathName == '/admin' ? "text-bg-dark":"" }`} aria-current="true">
            <img src="/images/tk.png" alt="" /><span> Thống Kê</span>
            </Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/hoaDon" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/hoaDon' ? "text-bg-dark":"" }`}><img src="/images/tt.png" alt="" /><span> Thanh Toán</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/goiVip" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/goiVip' ? "text-bg-dark":"" }`}><img src="/images/vip.png" alt="" /><span> Gói Vip</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/voucher" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/voucher' ? "text-bg-dark":"" }`}><img src="/images/vch.png" alt="" /><span> Voucher</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/adminFilm" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/adminFilm' ? "text-bg-dark":"" }`}><img src="/images/flim.png" alt="" /><span> Bộ Phim</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/actor" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/actor' ? "text-bg-dark":"" }`}><img src="/images/actor.png" alt="" /><span> Diễn Viên</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/danhMuc" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/danhMuc' ? "text-bg-dark":"" }`}><img src="/images/dm.png" alt="" /><span> Danh Mục</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/theLoai" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/theLoai' ? "text-bg-dark":"" }`}><img src="/images/tl.png" alt="" /><span> Thể Loại</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/account" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/account' ? "text-bg-dark":"" }`}><img src="/images/user.png" alt="" /><span> Tài Khoản</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/" className="list-group-item list-group-item-action text-white" aria-disabled="true"> 
            <i className="fa-solid fa-rotate-left text-danger me-1"></i> 
             Quay về Trang Chủ
            </Link>
          </div>
        </div>
        </>
    )
}
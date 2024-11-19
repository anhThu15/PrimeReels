import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAdmin(){
    const pathName = usePathname();
    return(
        <>
        <div className="col-md-2 p-0 collapse collapse-horizontal show" style={{minHeight: "127vh", backgroundColor: "#213436"}} id="moMenu">
          <strong className="text-center d-block p-3" style={{color: "white"}}> 
            <img src="/images/Logo-PR-(1).png" width="80px" alt=""/>
           </strong>
           <div className="list-group list-group-flush">
            <Link style={{backgroundColor:"#213436"}} href="/administration" className={`list-group-item list-group-item-action text-white ${pathName == '/administration' ? "text-bg-dark":"" }`} aria-current="true">
            <img src="/images/tk.png" alt="" /><span> Thống Kê</span>
            </Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/hoaDon" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/hoaDon' ? "text-bg-dark":"" }`}><img src="/images/tt.png" alt="" /><span> Thanh Toán</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/goiVip" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/goiVip' ? "text-bg-dark":"" }`}><img src="/images/vip.png" alt="" /><span> Gói Vip</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/voucher" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/voucher' ? "text-bg-dark":"" }`}><img src="/images/vch.png" alt="" /><span> Voucher</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/voucherType" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/voucherType' ? "text-bg-dark":"" }`}><img src="/images/vch.png" alt="" /><span> Thể Loại Voucher</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/adminFilm" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/adminFilm' ? "text-bg-dark":"" }`}><img src="/images/flim.png" alt="" /><span> Bộ Phim</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/actor" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/actor' ? "text-bg-dark":"" }`}><img src="/images/actor.png" alt="" /><span> Diễn Viên</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/danhMuc" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/danhMuc' ? "text-bg-dark":"" }`}><img src="/images/dm.png" alt="" /><span> Danh Mục</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/theLoai" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/theLoai' ? "text-bg-dark":"" }`}><img src="/images/tl.png" alt="" /><span> Thể Loại</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/account" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/account' ? "text-bg-dark":"" }`}><img src="/images/user.png" alt="" /><span> Tài Khoản</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/administration/accountAdmin" className={`list-group-item list-group-item-action text-white ${pathName == '/administration/accountAdmin' ? "text-bg-dark":"" }`}><img src="/images/user.png" alt="" /><span> Quản Trị Viên</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/" className="list-group-item list-group-item-action text-white" aria-disabled="true"> 
            <i className="fa-solid fa-rotate-left text-danger me-1"></i> 
             Quay về Trang Chủ
            </Link>
          </div>
        </div>
        </>
    )
}
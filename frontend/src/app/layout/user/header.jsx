import Logo from "../../../../public/images/Logo PR.svg";

export default function HeaderUser(){
    return(
        <>
            <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark" >
              <div class="container">
                <img class="navbar-brand" src="/images/Logo-PR.png" width={100}></img>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Trang Chủ</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dạng Phim
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Phim Dài Tập</a></li>
                        <li><a class="dropdown-item" href="#">Phim Ngắn Tập</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Top Phim
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Theo Ngày</a></li>
                        <li><a class="dropdown-item" href="#">Theo Tháng</a></li>
                        <li><a class="dropdown-item" href="#">Theo Năm</a></li>
                        <li><a class="dropdown-item" href="#">Theo Mùa</a></li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " aria-current="page" href="#">Thể Loại</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " aria-current="page" href="#">Thư Viện</a>
                    </li>
                  </ul>
                  <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Hôm nay xem gì ?" aria-label="Search"/>
                  </form>
                  <button class="btn btn-danger" type="submit">Đăng Nhập</button>
                </div>
              </div>
            </nav>
        </>
    )
}
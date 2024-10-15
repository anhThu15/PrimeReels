export default function HeaderAdmin(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <button className="btn btn-secondary ms-1" type="button" data-bs-toggle="collapse" data-bs-target="#moMenu" aria-expanded="false" aria-controls="moMenu">
              =
            </button>
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex" role="search">
                  <input className="form-control " type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-warning" type="submit">Search</button>
                </form>
                <ul className="navbar-nav ms-auto mb-2 me-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Xin Chào, Anh Thư
                    </a>
                    <ul className="dropdown-menu ">
                      <li><a className="dropdown-item" href="#">Tìm rì ?</a></li>
                      <li><a className="dropdown-item" href="#">Ai biếc ?</a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" href="#">Đăng Xuất</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
    )
}
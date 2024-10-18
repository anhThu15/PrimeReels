export default function HeaderAdmin() {
  return (
      <>
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
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img src="https://chontruong.edu.vn/wp-content/uploads/2024/09/meo-meme-8WUtRYq.png" className="rounded-circle" width={45} height={45} alt="" />
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end">
                                  <li><a className="dropdown-item" href="#">Tìm rì ?</a></li>
                                  <li><a className="dropdown-item" href="#">Ai biếc ?</a></li>
                                  <li><hr className="dropdown-divider" /></li>
                                  <li><a className="dropdown-item" href="#">Đăng Xuất</a></li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </>
  );
}

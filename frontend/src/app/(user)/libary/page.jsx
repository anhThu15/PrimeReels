import "../../globals.css";



export default function Libary(){
  // const id = params.id

    return(
        <>
             <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%"}}>
                <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark" >
                        
                        {/* breakcum */}
                        <div className="col font-monospace text-white">
                            <div className="col mt-2">
                                <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                  <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a className="text-white" href="#">Trang Chủ</a></li>
                                    <li class="breadcrumb-item" aria-current="page">THƯ VIỆN</li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}





                </div>
             </div>
        </>
    )
}
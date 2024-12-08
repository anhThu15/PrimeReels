// 'use client'
// import "../../../app/globals.css"
// import Link from "next/link";
// import useSWR from "swr";

// export default function CardSlide(){
//   const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
  
//   const {data,error,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/movies`, fetcher)
//   if (error) return <div>Lỗi tải dữ liệu</div>
//   if (isLoading) return (
//   <>

//   </>
//   );

//   const top5 = data.sort((a,b) => b.views - a.views ).slice(0,5)


//     return (
//         <>
//         <h2 className="fw-bold mb-3 text-with-shadow" style={{marginLeft:"80px"}}>Top 5 PrimeReels</h2>
//         <div className=" row row-cols-5 m-0 ">
          
//           <div className="row row-cols-2 mb-3">
//             <div className="col-5">
//                 <img src="/images/image 19.png" className="mt-5" height={200} width={200} alt="" />
//             </div>
//             <div className="col">
//                 <div className="card text-bg-dark me-3" style={{width:"180px"}}>
//                   <div>
//                       <img src={top5[0].poster} height={300} className="card-img" alt="..."/>
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                       <Link href={`/film/${top5[0].movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4" style={{width:"100%", height:"100%", position:"absolute", top:"0px",left:"-1px"}}></Link>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div className="row row-cols-2 mb-3">
//             <div className="col-5">
//                 <img src="/images/2.png" className="mt-5" height={200} width={200} alt="" />
//             </div>
//             <div className="col">
//                 <div className="card text-bg-dark me-3" style={{width:"180px"}}>
//                   <div>
//                       <img src={top5[1].poster} height={300} className="card-img" alt="..."/>
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                       <Link href={`/film/${top5[1].movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"   style={{width:"100%", height:"100%", position:"absolute", top:"0px",left:"-1px"}}></Link>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div className="row row-cols-2 mb-3">
//             <div className="col-5">
//                 <img src="/images/3.png" className="mt-5" height={200} width={200} alt="" />
//             </div>
//             <div className="col">
//                 <div className="card text-bg-dark me-3" style={{width:"180px"}}>
//                   <div>
//                       <img src={top5[2].poster} height={300} className="card-img" alt="..."/>
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                       <Link href={`/film/${top5[2].movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"   style={{width:"100%", height:"100%", position:"absolute", top:"0px",left:"-1px"}}></Link>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div className="row row-cols-2 mb-3">
//             <div className="col-5">
//                 <img src="/images/4.png" className="mt-5" height={200} width={200} alt="" />
//             </div>
//             <div className="col">
//                 <div className="card text-bg-dark me-3" style={{width:"180px"}}>
//                   <div>
//                       <img src={top5[3].poster} height={300} className="card-img" alt="..."/>
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                       <Link href={`/film/${top5[3].movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"   style={{width:"100%", height:"100%", position:"absolute", top:"0px",left:"-1px"}}></Link>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>

//           <div className="row row-cols-2 mb-3">
//             <div className="col-5">
//                 <img src="/images/5.png" className="mt-5" height={200} width={200} alt="" />
//             </div>
//             <div className="col">
//                 <div className="card text-bg-dark me-3" style={{width:"180px"}}>
//                   <div>
//                       <img src={top5[4].poster} height={300} className="card-img" alt="..."/>
//                   </div>
//                   <div className="play-icon-overlay">
//                     <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
//                       <Link href={`/film/${top5[4].movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"   style={{width:"100%", height:"100%", position:"absolute", top:"0px",left:"-1px"}}></Link>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//           </div>


//         </div>
//         </>
//     )
// }

'use client'
import "../../../app/globals.css"
import Link from "next/link";
import useSWR from "swr";

export default function CardSlide() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/movies`, fetcher);
  if (error) return <div>Lỗi tải dữ liệu</div>;
  if (isLoading) return (
    <>

    </>
  );

  const top5 = data.sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <>
      <h2 className="fw-bold mb-3 text-with-shadow" style={{ marginLeft: "80px" }}>Top 5 PrimeReels</h2>
      <div className="row row-cols-5 m-0">
        {top5.map((movie, index) => (
          <div className="row row-cols-2 mb-3" key={movie.movie_id}>
            <div className="col position-relative">
              {/* Background image with reduced size and behind the card */}
              <img src={`/images/${index + 1}.png`} className="mt-5 img-small position-absolute" alt="" />
            </div>
            <div className="col">
              <div className="card text-bg-dark me-3" style={{ width: "180px",borderRadius: "0", border:"none","--bs-card-inner-border-radius": "0" }}>
                <div>
                  <img src={movie.poster} height={300} className="card-img" alt="..." />
                </div>
                <div className="play-icon-overlay">
                  <div className="rounded-circle bg-black opacity-50 border border-white" style={{ width: "50px", height: "50px" }}>
                    <Link href={`/film/${movie.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4" style={{ width: "100%", height: "100%", position: "absolute", top: "0px", left: "-1px" }}></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

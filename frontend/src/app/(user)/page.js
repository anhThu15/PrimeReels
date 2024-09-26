import Banner from "./components/banner";
import CardSlide from "./components/cardslide";
import SlideShow from "./components/slideshow";

export default function Home() {
  
  return (
    <>
     <div className="container-fluid bg-dark p-0 font-monospace text-white">
        <div className=" container-fluid p-0">
          <div>
            <Banner></Banner> 
          </div>
          <div className=" position-relative" style={{bottom:150}}>
              <CardSlide></CardSlide>
          </div>
          <div >
            <h2 className="fw-bold mb-3" style={{marginLeft:"80px"}}>Thứ 6 Ngày 13</h2>
            <SlideShow></SlideShow>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"80px"}}>Thảm họa thiên nhiên</h2>
            <SlideShow></SlideShow>
          </div>
        </div>

     </div>
    </>
  );
}

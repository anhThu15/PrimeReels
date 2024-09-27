import Image from "next/image";
import Banner from "./components/banner";
import BannerAnother from "./components/bannerAnother";
import CardSlide from "./components/cardslide";
import SlideShow from "./components/slideshow";
import SlideShowAnother from "./components/slideshowAnother";

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
            <h2 className="fw-bold mb-3" style={{marginLeft:"50px"}}>Thứ 6 Ngày 13</h2>
            <SlideShow></SlideShow>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa thiên nhiên</h2>
            <SlideShow></SlideShow>
          </div>
          <div>
            <BannerAnother></BannerAnother>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Rằm Trung Thu</h2>
            <SlideShow></SlideShow>
          </div>
          <div className="mt-5">
              <Image src="/images/image 23.png" width={1550} height={200}></Image>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Mọt Phim Tình Củm</h2>
            <SlideShowAnother></SlideShowAnother>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Rằm Trung Thu</h2>
            <SlideShow></SlideShow>
          </div>
          <div >
            <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Mọt Phim Củm Lạnh </h2>
            <SlideShowAnother></SlideShowAnother>
          </div>
        </div>

     </div>
    </>
  );
}

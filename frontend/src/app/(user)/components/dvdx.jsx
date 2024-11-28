import Link from "next/link"
import "../../../app/globals.css"

export default function DVDX(){
    return (
      <>
      <div className=" bg-black h-100 mt-5" style={{paddingBottom:"104px"}}>
          <p className=" text-white text-center  fw-bold fs-2 mb-0 h-100">Chưa Mua Dịch Vụ Nào, Mời bạn mua dùng thử <Link href={'/user-buy-package'}>Mua Gói</Link></p>
      </div>
      </>
    )
}
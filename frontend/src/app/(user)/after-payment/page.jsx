import "../../globals.css";
import Link from 'next/link';
export default function AfterPayment() {
    return (
        <div className="container-fluid">
            <div class="thank-you-user">
                <img src="images/Logo-PR.png" alt="" width="200px" />
                <hr class="hr-thankyou" />
                <span class="text-thankyou">Chân thành cảm ơn quý khách đã tin tưởng và lựa chọn gói vip của PrimeReels. Hy vọng gói VIP sẽ mang đến cho quý khách trải nghiệm tuyệt vời và dịch vụ đẳng cấp nhất</span>
                <Link href="/">
                    <button class="btn btn-outline-secondary">Trang chủ</button>
                </Link>
            </div>
        </div>
    )
}
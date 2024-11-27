"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../../globals.css";
import Cookies from 'js-cookie';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 
    const [emailError, setEmailError] = useState('');

    useEffect(() => {   
        const token = Cookies.get('token');
        if (token) {
            // router.push("/");
            window.location.pathname = '/'
        }
    }, [router]);  //kiểm trả xem đã có token chưa => đã có thì không cho vào lại trang login

    const handleEmailChange = (e) => {
        const value = e.target.value.trim(); // Loại bỏ khoảng trắng thừa
        setEmail(value);
    
        // Regex kiểm tra định dạng email chỉ cho phép đuôi @gmail.com và đuôi @example.com
        const emailRegex = /^[^\s@]+@(gmail\.com|example\.com)$/;
    
        if (!emailRegex.test(value)) {
            setEmailError("Email phải có định dạng đúng và đuôi là @gmail.com hoặc @example.com");
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim()); // Loại bỏ khoảng trắng thừa
    };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//             // Loại bỏ khoảng trắng thừa trước khi gửi
//             const trimmedEmail = email.trim();
//             const trimmedPassword = password.trim();

//         if (emailError || email.trim() === '') {
//             toast.error("Vui lòng nhập email đúng định dạng và đuôi @gmail.com.");
//             return;
//         }

//         if (password.trim() === '') {
//             toast.error("Vui lòng nhập mật khẩu.");
//             return;
//         }

//         const response = await fetch(`/api/login`, {
//             // mode: 'no-cors',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), // Sử dụng email và mật khẩu đã xử lý
//         });
        

//         const data = await response.json();
//         console.log(data);

//         if (response.ok) {
            
//             document.cookie = `token=${data.token}; path=/; samesite=strict; secure`;
//             // document.cookie = `user=${JSON.stringify(data.user)}; path=/; samesite= strict; secure`;
            

//             // localStorage.setItem('token', data.token);
//             // localStorage.setItem('user', JSON.stringify(data.user));

//             console.log(response)

//             if(data.user.email_verification_token != null){
//                 toast("Bạn chưa xác định email, hãy xác minh để có thể đăng nhập");
//             }else{
//                 // alert("mày đã xác minh rồi")
//                 toast.success('Đăng nhập thành công!');
//                 if (data.user.role === 100) {
// // <<<<<<< feature_frontEnd
//                     // router.push("/administration");
//                     window.location.pathname = '/administration'
// // =======
//                     router.push("/administration");
// //  >>>>>>> main
//                 } else {
//                     // router.push("/");
//                     window.location.pathname = '/'
//                     window.location.reload();
//                 }
                
//             }
//         } else {
//             toast.error(data.error || 'Email hoặc mật khẩu đã bị sai');
//         }
//     };

const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim whitespace before sending
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (emailError || trimmedEmail === '') {
        toast.error("Vui lòng nhập email đúng định dạng và đuôi @gmail.com.");
        return;
    }

    if (trimmedPassword === '') {
        toast.error("Vui lòng nhập mật khẩu.");
        return;
    }

    try {
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }), 
        });
        
        const data = await response.json();

        console.log(data);

        // Check if response is successful and user attribute exists
        if (response.status === 200 && data && data.user) {
            console.log(response.data);
            if (data.user.email_verification_token != null) {
                toast.error("Bạn chưa xác định email, hãy xác minh để có thể đăng nhập");
            } else {
                toast.success('Đăng nhập thành công!');
                // Save token to cookies only after successful login and verification
                document.cookie = `token=${data.token}; path=/; samesite=strict; secure`;
                
                if (data.user.role === 100) {
                    window.location.pathname = '/administration';
                } else {
                    window.location.pathname = '/';
                    window.location.reload();
                    console.log(data.user)
                }
            }
        } else {
            // Display error if user is not found
            toast.error(data.error || 'Email hoặc mật khẩu đã bị sai');
        }

    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        toast.error('Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối mạng của bạn và thử lại.');
    }
};


    return (
        <div className="modal-login">
            <div className="modal-dialog mt-5">
                <div className="modal-content">
                    <div className="modal-header mb-3">
                        <h3>ĐĂNG NHẬP</h3>
                    </div>
                    <div className="bor-form">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="email"
                                    placeholder="Email đăng nhập"
                                    className="lg-email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                 {emailError && <p className="text-danger">{emailError}</p>}
                            </div>

                            <div className="mb-5 form-group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="lg-password"
                                    value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    onChange={handlePasswordChange}
                                    // required
                                />
                                
                                <Link href="/forgot-password" className="forgot-password">Quên mật khẩu</Link>
                            </div>
                            
                                <div className="button-submit mb-2">
                                    <button type="submit" name="submit" >Đăng nhập</button> 
                                </div>

                                {/* <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login/google`} className="google-login-btn" style={{marginLeft:"170px"}}>
                                    <img src="images/google-icon.png" alt="Login With Google" width={25} />
                                    Google Login
                                </Link> */}
                                <div>
                                    <p>Hoặc đăng nhập bằng :</p>
                                </div>
                                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login/google`} style={{display:"block", textAlign:"center"}} className="mb-3">
                                    <img src="images/google-icon.png" alt="Login With Google" width={35} style={{ cursor: "pointer" }} />
                                </Link>

                            
                            <div className="text-white text-center mb-3">
                                Chưa có tài khoản?
                                <Link href="/register" className="btn-register">Đăng ký</Link> ngay!
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

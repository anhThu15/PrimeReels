// components/user-infomation/ChangePasswordModal.js
import React, { useState } from 'react';
import { toast } from "react-toastify";
const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }
        
        // Logic gửi yêu cầu đến API
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/change-password', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token.split('=')[1]}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        current_password: currentPassword,
                        new_password: newPassword,
                        new_password_confirmation: confirmPassword,
                    }),
                });
                
                const data = await response.json();
                if (data.status === 'success') {
                    // alert("Mật khẩu đã được thay đổi thành công!");
                    toast.success('Mật khẩu đã được thay đổi thành công!');
                    onClose(); // Đóng modal
                } else if (data.status === 'error' && data.code === 'incorrect_password') {
                    setError("Mật khẩu hiện tại không đúng.");
                } else {
                    setError(data.message || "Đã xảy ra lỗi khi thay đổi mật khẩu.");
                }
            } catch (error) {
                console.error('Error changing password:', error);
                setError("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(prev => !prev);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header justify-content-between">
                        <h5 className="modal-title">Thay đổi mật khẩu</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group mb-3">
                                <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                                <div className="input-group">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        className="form-control text-body-secondary"
                                        id="currentPassword"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text" onClick={toggleShowCurrentPassword} style={{ cursor: 'pointer' }}>
                                        <i className={`fa ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="newPassword">Mật khẩu mới:</label>
                                <div className="input-group">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        className="form-control text-body-secondary"
                                        id="newPassword"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text" onClick={toggleShowNewPassword} style={{ cursor: 'pointer' }}>
                                        <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="form-control text-body-secondary"
                                        id="confirmPassword"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text" onClick={toggleShowConfirmPassword} style={{ cursor: 'pointer' }}>
                                        <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </div>
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary mb-3">Lưu thay đổi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;

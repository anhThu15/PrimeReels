"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function InfoPage() {
    const router = useRouter();
    const tabParam = router.query?.tab;

    // Default active tab and sub-tab
    const [activeTab, setActiveTab] = useState("contact");
    const [contactSubTab, setContactSubTab] = useState("support"); // Default sub-tab for Contact

    // Update active tab when query changes
    useEffect(() => {
        if (tabParam) setActiveTab(tabParam);
    }, [tabParam]);

    // Handle tab change
    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        if (newTab !== "contact") {
            setContactSubTab("support"); // Reset sub-tab when switching away
        }
        router.push(`/infoPage?tab=${newTab}`, undefined, { shallow: true });
    };

    // Handle sub-tab change for Contact
    const handleContactSubTabChange = (newSubTab) => {
        setContactSubTab(newSubTab);
    };

    return (
        <>
            <div className="container-fluid bg-black p-0 text-white">
                <div className="container p-0">
                    <div className="row pt-5">
                        {/* Sidebar Menu */}
                        <div className="col-12 col-md-3 mb-4 mb-md-0">
                            <div className="list-group" id="list-tab" role="tablist">
                                <button
                                    className={`btn btn-outline-light text-start ms-2 ps-3 ${activeTab === "contact" ? "active" : ""}`}
                                    onClick={() => handleTabChange("contact")}
                                >
                                    <p className="fs-6 mt-2">
                                        <i className="fa-solid fa-headphones"></i> Liên Hệ
                                    </p>
                                </button>
                                <button
                                    className={`btn btn-outline-light text-start ms-2 ps-3 mt-3 ${activeTab === "policy" ? "active" : ""}`}
                                    onClick={() => handleTabChange("policy")}
                                >
                                    <p className="fs-6 mt-2">
                                        <i className="fa-solid fa-file-alt"></i> Chính Sách
                                    </p>
                                </button>
                                <button
                                    className={`btn btn-outline-light text-start ms-2 ps-3 mt-3 ${activeTab === "terms" ? "active" : ""}`}
                                    onClick={() => handleTabChange("terms")}
                                >
                                    <p className="fs-6 mt-2">
                                        <i className="fa-solid fa-gavel"></i> Điều Khoản
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-12 col-md-9">
                            {/* Contact Content */}
                            {activeTab === "contact" && (
                                <div className="bg-light text-black fs-6 p-4 rounded">
                                    <h3 className="fw-bold mb-4 text-danger">
                                        <i className="fa-solid fa-phone-volume"></i> Liên Hệ
                                    </h3>

                                    {/* Sub-menu for Contact */}
                                    <div className="list-group d-flex flex-row mb-4" id="contact-submenu" role="tablist">
                                        <button
                                            className={`btn btn-outline-danger ${contactSubTab === "support" ? "active" : ""}`}
                                            onClick={() => handleContactSubTabChange("support")}
                                        >
                                            Yêu cầu hỗ trợ
                                        </button>
                                        <button
                                            className={`btn btn-outline-danger ms-3 ${contactSubTab === "faq" ? "active" : ""}`}
                                            onClick={() => handleContactSubTabChange("faq")}
                                        >
                                            Hỏi Đáp
                                        </button>
                                    </div>

                                    {/* Sub-menu Content */}
                                    {contactSubTab === "support" && (
                                        <div>
                                            <h5 className="fw-bold text-dark">
                                                <i className="fa-solid fa-phone"></i> Tổng đài hỗ trợ:
                                            </h5>
                                            <p>9090 (24/7, 200đ/phút)</p>
                                            <h5 className="fw-bold text-dark mt-4">
                                                <i className="fa-solid fa-map-marker-alt"></i> Địa chỉ:
                                            </h5>
                                            <p>Quận 12, Thành phố Hồ Chí Minh.</p>
                                            <h5 className="fw-bold text-dark mt-4">
                                                <i className="fa-solid fa-envelope"></i> Email hỗ trợ:
                                            </h5>
                                            <p>support@primereels.com</p>
                                        </div>
                                    )}

                                    {contactSubTab === "faq" && (
                                        <div>
                                            <h3 className="fw-bold text-danger mb-4">
                                                <i className="fa-solid fa-question-circle"></i> Hỏi Đáp
                                            </h3>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className="accordion-button text-dark"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                        >
                                                            <i className="fa-solid fa-info-circle me-2"></i> PrimeReels là dịch vụ gì?
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse show"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">
                                                            PrimeReels là dịch vụ truyền hình trên mạng Internet...
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Add other FAQ items here */}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Policy Content */}
                            {activeTab === "policy" && (
                                <div className="col-12">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active bg-light text-black fs-6 p-4 rounded" id="list-policy" role="tabpanel" aria-labelledby="list-policy-list">
                                            <h3 className="fw-bold mb-4 text-danger">
                                                <i className="fa-solid fa-file-alt"></i> Chính Sách Sử Dụng
                                            </h3>
                                            <div className="accordion" id="policyAccordion">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#policyOne" aria-expanded="true" aria-controls="policyOne">
                                                            <i className="fa-solid fa-user-shield me-2"></i> Chính sách bảo mật
                                                        </button>
                                                    </h2>
                                                    <div id="policyOne" className="accordion-collapse collapse show" data-bs-parent="#policyAccordion">
                                                        <div className="accordion-body">
                                                            Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng. Mọi thông tin cung cấp chỉ được sử dụng trong phạm vi cho phép theo quy định.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#policyTwo" aria-expanded="false" aria-controls="policyTwo">
                                                            <i className="fa-solid fa-credit-card me-2"></i> Chính sách thanh toán
                                                        </button>
                                                    </h2>
                                                    <div id="policyTwo" className="accordion-collapse collapse" data-bs-parent="#policyAccordion">
                                                        <div className="accordion-body">
                                                            Chúng tôi chấp nhận các phương thức thanh toán trực tuyến và tại quầy. Chính sách hoàn tiền áp dụng theo điều kiện cụ thể.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#policyThree" aria-expanded="false" aria-controls="policyThree">
                                                            <i className="fa-solid fa-shield-alt me-2"></i> Chính sách bảo hành
                                                        </button>
                                                    </h2>
                                                    <div id="policyThree" className="accordion-collapse collapse" data-bs-parent="#policyAccordion">
                                                        <div className="accordion-body">
                                                            Dịch vụ của chúng tôi được đảm bảo với các điều kiện bảo hành rõ ràng. Vui lòng tham khảo chi tiết tại trung tâm hỗ trợ.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Terms Content */}
                            {activeTab === "terms" && (
                                <div className="col-12">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active bg-light text-black fs-6 p-4 rounded" id="list-terms" role="tabpanel" aria-labelledby="list-terms-list">
                                            <h3 className="fw-bold mb-4 text-danger">
                                                <i className="fa-solid fa-gavel"></i> Điều Khoản Sử Dụng
                                            </h3>
                                            <div className="accordion" id="termsAccordion">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#termsOne" aria-expanded="true" aria-controls="termsOne">
                                                            <i className="fa-solid fa-check me-2"></i> Quy định chung
                                                        </button>
                                                    </h2>
                                                    <div id="termsOne" className="accordion-collapse collapse show" data-bs-parent="#termsAccordion">
                                                        <div className="accordion-body">
                                                            Người dùng phải tuân thủ các quy định khi sử dụng dịch vụ PrimeReels. Bất kỳ hành vi vi phạm nào cũng có thể dẫn đến đình chỉ dịch vụ.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#termsTwo" aria-expanded="false" aria-controls="termsTwo">
                                                            <i className="fa-solid fa-user-clock me-2"></i> Quy định thời gian
                                                        </button>
                                                    </h2>
                                                    <div id="termsTwo" className="accordion-collapse collapse" data-bs-parent="#termsAccordion">
                                                        <div className="accordion-body">
                                                            Thời gian hoạt động của dịch vụ và các điều kiện sử dụng áp dụng từ 8h sáng đến 10h tối (trừ trường hợp khẩn cấp).
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#termsThree" aria-expanded="false" aria-controls="termsThree">
                                                            <i className="fa-solid fa-ban me-2"></i> Quy định cấm
                                                        </button>
                                                    </h2>
                                                    <div id="termsThree" className="accordion-collapse collapse" data-bs-parent="#termsAccordion">
                                                        <div className="accordion-body">
                                                            Nghiêm cấm chia sẻ tài khoản hoặc sử dụng dịch vụ vào mục đích trái pháp luật.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

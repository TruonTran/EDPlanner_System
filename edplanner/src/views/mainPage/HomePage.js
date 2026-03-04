/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import "./HomePage.css";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import mentor from "../../data/mentor.json";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function HomePage() {

    // ================= STATE =================
    const [user, setUser] = useState(null);
    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const navigate = useNavigate();

    // ================= LOAD USER =================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ================= DATA (ĐẶT SAU STATE) =================
    const topMentors = mentor
        .filter(m => m.rating >= 4.8)
        .slice(0, 6);

    // ================= HANDLE CLICK =================
    const handleMentorClick = (mentorId) => {
        if (!user) {
            setSelectedMentorId(mentorId);
            setShowAuthOverlay(true);
            return;
        }

        navigate(`/mentor/${mentorId}`);
    };

    return (
        <div className="homepage">
            <Header />

            {/* HERO */}
            <section className="hero">
                <div className="hero-inner">
                    <div className="hero-left">
                        <h1>ED PLANNER</h1>

                        <p className="hero-sub">
                            ED Planner là nền tảng quản lý lịch trình thông minh,
                            giúp sinh viên kết nối với Cố vấn và Mentor phù hợp.
                            Dự án tối ưu hóa thời gian, đảm bảo tính minh bạch
                            và hỗ trợ từng bước phát triển sự nghiệp hiệu quả.
                        </p>

                        <p className="hero-sub">
                            Chúng mình là những sinh viên bước ra từ môn Khởi nghiệp-EXE101,
                            thấu hiểu cảm giác tìm Mentor đúng chuyên môn.
                            ED Planner giúp kết nối đúng người, đúng thời điểm.
                        </p>

                        <button className="hero-btn">
                            Tìm hiểu thêm
                        </button>
                    </div>

                    <div className="hero-right">
                        <img
                            src="https://8102.matbao.website/wp-content/uploads/2025/06/banner-home.png"
                            alt="Banner"
                        />
                    </div>
                </div>
            </section>

            {/* MENTOR SECTION */}
            {(!user || user.role === "student") && (
                <section className="mentors">
                    <div className="mentorHeader center">
                        <p className="mentor-sub">Gặp gỡ đội ngũ cố vấn</p>
                        <h2>Những mentor ưu tú từ các ngành</h2>
                    </div>

                    <div className="mentor-scroll">
                        {topMentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                className="mentor-card-new"
                                onClick={() => handleMentorClick(mentor.id)}
                            >
                                <div className="mentor-avatar">
                                    <img src={mentor.avatar} alt={mentor.name} />
                                </div>

                                <div className="mentor-body">
                                    <h3>{mentor.name}</h3>
                                    <p>{mentor.role}</p>
                                    <span className="mentor-category">
                                        {mentor.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            {!user && (
                <section className="cta-section">
                    <div className="cta-container">

                        {/* Blur Background Effects */}
                        <div className="cta-blur blur-1"></div>
                        <div className="cta-blur blur-2"></div>

                        {/* LEFT CONTENT */}
                        <div className="cta-left">
                            <div className="cta-badge">
                                ⭐ Gia nhập ngay hôm nay
                            </div>

                            <h2>
                                Sẵn sàng bứt phá cùng{" "}
                                <span>ED Planner?</span>
                            </h2>

                            <p>
                                Đăng ký tài khoản để kết nối với hàng trăm Mentor chuyên nghiệp
                                và tối ưu hóa lộ trình phát triển của riêng bạn ngay từ lúc này.
                            </p>

                            <div className="cta-buttons">
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate("/signup")}
                                >
                                    Tạo tài khoản miễn phí
                                </button>

                                <button
                                    className="btn-secondary"
                                    onClick={() => navigate("/loginpage")}
                                >
                                    Đăng nhập
                                </button>
                            </div>

                            <div className="cta-stats">
                                <div>
                                    <h3>100+</h3>
                                    <span>Mentor</span>
                                </div>

                                <div className="divider"></div>

                                <div>
                                    <h3>500+</h3>
                                    <span>Sinh viên</span>
                                </div>

                                <div className="divider"></div>

                                <div>
                                    <h3>4.9/5</h3>
                                    <span>Đánh giá</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT FLOAT CARD */}
                        <div className="cta-right">
                            <div className="float-card">

                                <div className="float-item float-1">
                                    🚀 Cập nhật lộ trình học tập
                                </div>

                                <div className="float-item float-2">
                                    📅 Đặt lịch hẹn Mentor 1-1
                                </div>

                                <div className="float-item float-3">
                                    ✅ Hoàn thành mục tiêu đề ra
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            )}

            {/* OVERLAY */}
            {showAuthOverlay && (
                <div className="auth-overlay">
                    <div className="auth-modal">
                        <h3>Bạn cần đăng nhập để tiếp tục</h3>
                        <p>Vui lòng đăng nhập hoặc tạo tài khoản</p>

                        <div className="auth-actions">
                            <button
                                className="login-btn"
                                onClick={() => navigate("/loginpage")}
                            >
                                Login
                            </button>

                            <button
                                className="signup-btn"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </button>
                        </div>

                        <button
                            className="close-btn"
                            onClick={() => setShowAuthOverlay(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
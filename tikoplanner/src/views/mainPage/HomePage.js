/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import "./HomePage.css";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import mentor from "../../data/mentor.json";

import { useNavigate } from "react-router-dom";
import { MessageSquare, Award, Users } from "lucide-react";
import { useEffect, useState } from "react";


export default function HomePage() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const navigate = useNavigate();

    const topMentors = mentor
        .filter(m => m.rating >= 4.8)
        .slice(0, 6);

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
            <Header/>

            {/* CAROUSEL */}
            <div className="carousel-wrapper">
                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/assets/guest_page/banner/banner1.png" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="/assets/guest_page/banner/banner2.png" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="/assets/guest_page/banner/banner3.png" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="/assets/guest_page/banner/banner4.png" className="d-block w-100" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            {/* STATS */}
            <section className="stats-section">
                <div className="stat-card">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Mentor Dày Dạn Kinh Nghiệm</span>
                </div>

                <div className="stat-card">
                    <span className="stat-number">60+</span>
                    <span className="stat-label">Lĩnh Vực Chuyên Sâu</span>
                </div>

                <div className="stat-card">
                    <span className="stat-number">2+</span>
                    <span className="stat-label">Slot Hỗ Trợ Cá Nhân Hóa</span>
                </div>

                <div className="stat-card">
                    <span className="stat-number">380+</span>
                    <span className="stat-label">Dự Án Thành Công</span>
                </div>
            </section>

            {/* SLIDER */}
            {(!user || user.role === "student") && (
                <section className="mentors">
                    <div className="mentorHeader">
                        <h2>Top Rated Mentors</h2>
                    </div>

                    <div
                        className="slider"
                        style={{
                            "--width": "220px",
                            "--height": "320px",
                            "--quantity": topMentors.length
                        }}
                    >
                        <div className="list">
                            {topMentors.map((mentor, index) => (
                                <div
                                    key={mentor.id}
                                    className="item mentor-card"
                                    style={{ "--position": index + 1 }}
                                    onClick={() => handleMentorClick(mentor.id)}
                                >
                                    <img src={mentor.avatar} alt={mentor.name} />

                                    <div className="mentor-info-static">
                                        <h4>{mentor.name}</h4>
                                        <p className="mentor-role">{mentor.role}</p>
                                        <span className="mentor-category">{mentor.category}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            )}



            {!user && (
                <section className="cta-section">
                    <div className="cta-box">
                        <h2>Đăng ký mentor</h2>
                        <button
                            className="cta-btn"
                            onClick={() => window.location.href = "/signup"}
                        >
                            Tạo tài khoản miễn phí
                        </button>
                    </div>
                </section>
            )}


            {/* PROJECT INTRO */}
            <section className="project-intro">
                <h2>Giá Trị Dự Án Mang Lại</h2>
                <p>
                    Nền tảng được xây dựng nhằm hỗ trợ sinh viên tiếp cận thông tin học thuật,
                    dự án thực tiễn và các định hướng phát triển chuyên sâu trong quá trình học tập và nghiên cứu.
                </p>

                <div className="cards-container">
                    <div className="card">
                        <MessageSquare className="card-icon" size={32} />
                        <h3>Tin Tức & Hoạt Động Bộ Môn</h3>
                        <p>
                            Cập nhật liên tục các thông báo, sự kiện, hoạt động học thuật và chuyên môn
                            từ bộ môn, giúp sinh viên không bỏ lỡ thông tin quan trọng.
                        </p>
                    </div>

                    <div className="card">
                        <Award className="card-icon" size={32} />
                        <h3>Kho Dự Án & Ý Tưởng Tham Khảo</h3>
                        <p>
                            Tổng hợp các dự án tiêu biểu, dự án nổi bật và kho ý tưởng tham khảo.
                            Sinh viên có thể xem chi tiết nội dung, bao gồm các bài nộp theo mục SP26.
                        </p>
                    </div>

                    <div className="card">
                        <Users className="card-icon" size={32} />
                        <h3>Gọi Vốn & Hướng Dẫn Quan Trọng</h3>
                        <p>
                            Cung cấp thông tin gọi vốn, tài liệu hướng dẫn và các lưu ý quan trọng
                            nhằm hỗ trợ sinh viên phát triển và hiện thực hóa dự án.
                        </p>
                    </div>
                </div>
            </section>

            {showAuthOverlay && (
                <div className="auth-overlay">
                    <div className="auth-modal">
                        <h3>Bạn cần đăng nhập để tiếp tục</h3>
                        <p>
                            Vui lòng đăng nhập hoặc tạo tài khoản để xem chi tiết mentor
                        </p>

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

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import "./HomePage.css";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import mentor from "../../data/mentor.json";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { useRef } from "react";
import Chart from "chart.js/auto";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const chartRef = useRef(null);

    const navigate = useNavigate();

    // ✅ LOAD USER KHI MỞ TRANG
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Năm 1", "Năm 2", "Năm 3", "Năm 4", "Năm 5"],
                datasets: [
                    {
                        label: "Nhóm có Mentor liên tục",
                        data: [5, 25, 65, 85, 95],
                        borderColor: "#10b981",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: "Nhóm không có Mentor",
                        data: [0, 5, 20, 45, 70],
                        borderColor: "#cbd5e1",
                        backgroundColor: "rgba(203, 213, 225, 0.2)",
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { mode: "index", intersect: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "% Tỉ lệ đạt Senior/Lead"
                        },
                        ticks: {
                            callback: function (value) {
                                return value + "%";
                            }
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        return () => myChart.destroy();
    }, []);

    return (
        <div className="homepage">
            <Header />

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

            {/* SLIDER - chỉ hiện khi chưa login hoặc là student */}
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

            {/* CTA - chỉ hiện khi chưa login */}
            {!user && (
                <section className="cta-section">
                    <div className="cta-box">
                        <h2>Đăng ký mentor</h2>
                        <button
                            className="cta-btn"
                            onClick={() => navigate("/signup")}
                        >
                            Tạo tài khoản miễn phí
                        </button>
                    </div>
                </section>
            )}

            {/* CAREER GROWTH CHART */}
            <section className="career-chart-section">
                <h2>Tốc Độ Đạt Cấp Độ Senior/Lead</h2>
                <div className="chart-wrapper">
                    <canvas ref={chartRef}></canvas>
                </div>
            </section>

            {/* Project Intro Section */}
            <section className="project-intro">
                <h2>Bức Tranh Tổng Quan Tác Động Của Cố Vấn Khởi Nghiệp & Nghề Nghiệp</h2>

                <p className="intro-sub">
                    Phần này trình bày các chỉ số vĩ mô quan trọng nhất từ cuộc khảo sát
                    hơn <strong>10.000 sinh viên và chuyên gia công nghệ</strong> trong năm 2025-2026.
                </p>

                <p className="intro-desc">
                    Dữ liệu cho thấy sự chênh lệch rõ rệt về <strong> thời gian tìm việc </strong>
                    và <strong>mức lương khởi điểm</strong> giữa những người có Mentor và những người tự học.
                    Khám phá các thẻ thông tin bên dưới để thấy sức mạnh của việc học hỏi 1-1.
                </p>
            </section>

            {/* LOGIN OVERLAY */}
            {showAuthOverlay && (
                <div className="auth-overlay">
                    <div className="auth-modal">
                        <h3>Bạn cần đăng nhập để tiếp tục</h3>
                        <p>Vui lòng đăng nhập hoặc tạo tài khoản để xem chi tiết mentor</p>

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
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL_IMG } from "../../utils/constant";
import "../style/HeaderStudent.css";

export default function HeaderStudent() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <header className="headerStudent">

            {/* LEFT */}
            <div className="headerLeft">
                <h2>Student Dashboard</h2>
                <p className="headerSub">Quản lý học tập & thanh toán</p>
            </div>

            {/* RIGHT */}
            <div className="headerRight">

                {/* Notification */}
                <div className="notification">
                    🔔
                    <span className="badge">3</span>
                </div>

                {/* USER */}
                {user && (
                    <div className="userSection">

                        <div
                            className="userTrigger"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <img
                                src={`${URL_IMG}${user.avatar}`}
                                className="avatar"
                            />

                            <div className="userText">
                                {/* ⚠️ dùng fullName đúng data của anh */}
                                <span className="name">{user.fullName}</span>
                                <span className="role">Student</span>
                            </div>
                        </div>

                        {showMenu && (
                            <div className="dropdownMenu">

                                <div
                                    className="dropdownItem"
                                    onClick={() => navigate("/profile")}
                                >
                                    👤 Profile
                                </div>

                                <div
                                    className="dropdownItem"
                                    onClick={() => navigate("/payment")}
                                >
                                    💳 Payment
                                </div>

                                <div
                                    className="dropdownItem"
                                    onClick={() => navigate("/attendance")}
                                >
                                    📊 Attendance
                                </div>

                                <div
                                    className="dropdownItem logout"
                                    onClick={handleLogout}
                                >
                                    🚪 Logout
                                </div>

                            </div>
                        )}
                    </div>
                )}

            </div>
        </header>
    );
}
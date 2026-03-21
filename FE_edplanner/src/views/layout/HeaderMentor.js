/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL_IMG } from "../../utils/constant";

import "../style/HeaderMentor.css";
export default function HeaderMentor() {

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
        <header className="headerMentor">

            <div className="headerLeft">
                <h2>Admin Mentor</h2>
                <p className="headerSub">Bảng điều khiển quản lý đào tạo</p>
            </div>

            <div className="headerRight">

                {/* Notification */}
                <div className="notification">
                    🔔
                    <span className="badge"></span>
                </div>

                {/* User */}
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
                                <span className="name">{user.name}</span>
                                <span className="role">{user.role}</span>
                            </div>
                        </div>

                        {showMenu && (
                            <div className="dropdownMenu">

                                <div
                                    className="dropdownItem"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </div>

                                <div
                                    className="dropdownItem"
                                    onClick={() => navigate("/settings")}
                                >
                                    Cài đặt
                                </div>

                                <div
                                    className="dropdownItem logout"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </div>

                            </div>
                        )}

                    </div>
                )}

            </div>

        </header>
    );
}
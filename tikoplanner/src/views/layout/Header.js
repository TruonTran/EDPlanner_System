/* eslint-disable jsx-a11y/alt-text */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";

export default function Header() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // Nếu có dữ liệu người dùng trong localStorage, cập nhật state user
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const isMentor = user?.role === "mentor";

    return (
        <>
            <header className="headerpage">
                <img src="/assets/leftLogo.png" alt="logo" className="logo" />

                <ul className="mainMenu">
                    <li
                        className={`menuItem ${location.pathname === "/" ? "active" : ""}`}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </li>

                    <li
                        className={`menuItem ${location.pathname === "/mentors" ? "active" : ""}`}
                        onClick={() => navigate("/allmentor")}
                    >
                        All Mentor
                    </li>

                    <li
                        className={`menuItem ${location.pathname === (isMentor ? "/mentor-slots" : "/products")
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            navigate(isMentor ? "/mentor-slots" : "/products")
                        }
                    >
                        {isMentor ? "My Slots" : "Products"}
                    </li>

                    <li
                        className={`menuItem ${location.pathname === "/contact" ? "active" : ""}`}
                        onClick={() => navigate("/contact")}
                    >
                        Contact
                    </li>
                </ul>


                <div className="nav">
                    {!user ? (
                        <>
                            <button
                                className="loginBtn"
                                onClick={() => navigate("/loginpage")}
                            >
                                Login
                            </button>
                            <button
                                className="signupBtn"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="userInfo">
                            <div
                                className="userTrigger"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <img src={user.avatar} className="avatar" />
                                <span>{user.name}</span>
                            </div>

                            {showMenu && (
                                <div className="dropdownMenu">
                                    <div
                                        className="dropdownItem"
                                        onClick={() => navigate("/settings")}
                                    >
                                        Settings
                                    </div>
                                    <div
                                        className="dropdownItem logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

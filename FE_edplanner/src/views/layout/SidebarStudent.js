import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, Calendar } from "lucide-react";
import "../style/Sidebar.css";

const SidebarStudent = () => {
    return (
        <div className="sidebar">

            <div className="logoBox">
                <img src="/assets/leftLogo.png" alt="logo" className="logo" />
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/studentSettings" className={({ isActive }) => isActive ? "active" : ""}>
                        <LayoutDashboard size={20} />
                        <span>Lịch Học</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/attendance" className={({ isActive }) => isActive ? "active" : ""}>
                        <UserCheck size={20} />
                        <span>Điểm danh</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/payment" className={({ isActive }) => isActive ? "active" : ""}>
                        <Users size={20} />
                        <span>Thanh Toán</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/request" className={({ isActive }) => isActive ? "active" : ""}>
                        <Calendar size={20} />
                        <span>Yêu cầu</span>
                    </NavLink>
                </li>

            </ul>

            {/* 👇 NÚT Ở DƯỚI CÙNG */}
            <div className="bottomMenu">
                <NavLink to="/" className="backHome">
                    Quay lại trang Home
                </NavLink>
            </div>

        </div>
    );
};

export default SidebarStudent;
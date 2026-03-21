import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, Calendar } from "lucide-react";
import "../style/Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="logoBox">
                <img src="/assets/leftLogo.png" alt="logo" className="logo" />
            </div>

            <ul className="menu">
                <li>
                    <NavLink to="/mentor-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                        <LayoutDashboard size={20} />
                        <span>Tổng quan</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/mentors" className={({ isActive }) => isActive ? "active" : ""}>
                        <UserCheck size={20} />
                        <span>Quản lý Mentor</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/student-request" className={({ isActive }) => isActive ? "active" : ""}>
                        <Users size={20} />
                        <span>Yêu cầu sinh viên</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/mentor-schedule" className={({ isActive }) => isActive ? "active" : ""}>
                        <Calendar size={20} />
                        <span>Đổi lịch Mentor</span>
                    </NavLink>
                </li>

            </ul>

        </div>
    );
};

export default Sidebar;
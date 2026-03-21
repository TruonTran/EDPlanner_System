import { Outlet } from "react-router-dom";
import SidebarStudent from "../layout/SidebarStudent";
import HeaderStudent from "../layout/HeaderStudent"; // 👈 thêm

const StudentPage = () => {

    return (
        <div className="student_page" style={{ display: "flex" }}>

            {/* Sidebar */}
            <SidebarStudent />

            {/* Main */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Header */}
                <HeaderStudent />

                {/* Nội dung */}
                <div className="main" style={{ padding: "20px" }}>
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default StudentPage;
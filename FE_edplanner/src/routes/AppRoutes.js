import { Routes, Route } from "react-router-dom";
// thanh menu 
import HomePage from "../views/mainPage/HomePage";
import AllMentorPage from "../views/mainPage/AllMentor";
import ContactPage from "../views/mainPage/Conatct";
// auth routes
import Login from "../views/auth/LoginPage";
import NewPassPage from "../views/auth/NewPassPage";
import RegisterPage from "../views/auth/SignUpPage";
import ForgotPasswordPage from "../views/auth/ForgotPasswordPage";
// chi tiết mentor (yêu cầu đăng nhập)
import MentorDetailPage from "../views/components/MentorDetail";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../views/Student/ProfilePage";
// trang quản lý mentor (trưởng bộ môn)
import MentorPage from "../views/mentor/MentorAdmin";
import MentorManagement from "../views/mentor/MentorManagement";
import StudentRequestPage from "../views/mentor/StudentRequest";
import MentorSchedule from "../views/mentor/MentorSchedule";
// giao diện trang cài đặt của student
import StudentPage from "../views/mainPage/Setting";
import StudentSchedule from "../views/Student/StudentSchedule";
import AttendancePage from "../views/Student/AttendancePage";
import PaymentStudent from "../views/Student/Payment";
import RequestStudent from "../views/Student/RequestStudent";


export default function AppRoutes() {
    return (
        <Routes>
            {/* thanh menu */}
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/allmentor" element={<AllMentorPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* auth routes */}
            <Route path="/loginpage" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/newpassword" element={<NewPassPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            {/* chi tiết từng mentor (yêu cầu đăng nhập) */}
            <Route
                path="/mentor/:id"
                element={
                    <ProtectedRoute>
                        <MentorDetailPage />
                    </ProtectedRoute>
                }
            />

            {/* giao diện dashboard của mentor */}
            <Route path="/mentor-dashboard" element={<MentorPage />} />
            <Route path="/mentors" element={<MentorManagement />} />
            <Route path="/student-request" element={<StudentRequestPage />} />
            <Route path="/mentor-schedule" element={<MentorSchedule />} />

            {/* giao diện dashboard của sinh viên */}
            {/* Layout bọc tất cả page student */}
            <Route path="/" element={<StudentPage />}>

                <Route path="studentSettings" element={<StudentSchedule />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="payment" element={<PaymentStudent />} />
                <Route path="request" element={<RequestStudent />} />

            </Route>
        </Routes>
    );
}

import { Routes, Route } from "react-router-dom";
// thanh menu 
import HomePage from "../views/mainPage/HomePage";
import AllMentorPage from "../views/mainPage/AllMentor";
import SchedulesPage from "../views/mainPage/Schedules";
import ContactPage from "../views/mainPage/Conatct";
// auth routes
import Login from "../views/auth/LoginPage";
import ForgotPassword from "../views/auth/ForgotPage";
import NewPassPage from "../views/auth/NewPassPage";
import RegisterPage from "../views/auth/SignUpPage";
// chi tiết mentor (yêu cầu đăng nhập)
import MentorDetailPage from "../views/components/MentorDetail";
import ProtectedRoute from "./ProtectedRoute";




export default function AppRoutes() {
    return (
        <Routes>
            {/* thanh menu */}
            <Route path="/" element={<HomePage />} />
            <Route path="/allmentor" element={<AllMentorPage />} />
            <Route path="/Schedules" element={<SchedulesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* chi tiết mentor (yêu cầu đăng nhập) */}
            <Route
                path="/mentor/:id"
                element={
                    <ProtectedRoute>
                        <MentorDetailPage />
                    </ProtectedRoute>
                }
            />

            {/* auth routes */}
            <Route path="/loginpage" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassPage />} />
            <Route path="/signup" element={<RegisterPage />} />


        </Routes>
    );
}


import { Routes, Route } from "react-router-dom";
import Login from "../views/auth/LoginPage";
import ForgotPassword from "../views/auth/ForgotPage"
import NewPassPage from "../views/auth/NewPassPage";
import RegisterPage from "../views/auth/SignUpPage";

import SettingsPage from "../views/mainPage/SettingsPage";
import HomePage from "../views/mainPage/HomePage";

import ProtectedRoute from "./ProtectedRoute";
import MentorDetailPage from "../views/components/MentorDetail";

import AllMentorPage from "../views/mainPage/AllMentor";
import ProductsPage from "../views/mainPage/Products";
import ContactPage from "../views/mainPage/Conatct";

import MentorSlotPage from "../views/mainPage/MentorSlot";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* giao diện auth */}
            <Route path="/loginpage" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            <Route path="/settings" element={<SettingsPage />} />

            <Route
                path="/mentor/:id"
                element={
                    <ProtectedRoute>
                        <MentorDetailPage />
                    </ProtectedRoute>
                }
            />

            <Route path="/allmentor" element={<AllMentorPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/mentor-slots" element={<MentorSlotPage />} />
        </Routes>
    );
}

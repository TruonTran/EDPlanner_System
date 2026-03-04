import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IoPersonOutline,
    IoMailOutline,
    IoLockClosedOutline,
    IoEyeOutline,
    IoEyeOffOutline,
} from "react-icons/io5";
import "./style.css";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="container">
            {/* HEADER */}
            <div className="header">
                <img src="/assets/leftLogo.png" alt="logo" className="logo registerLogo" />
            </div>

            {/* CENTER */}
            <div className="center">
                <div className="card">
                    <h2 className="title">Create your account</h2>

                    <label className="label">Full Name</label>
                    <div className="inputWrapper">
                        <IoPersonOutline size={18} color="#7baea6" />
                        <input placeholder="John Doe" />
                    </div>

                    <label className="label">Your Email</label>
                    <div className="inputWrapper">
                        <IoMailOutline size={18} color="#7baea6" />
                        <input placeholder="we'll never spam you 💌" />
                    </div>

                    <label className="label">Password</label>
                    <div className="inputWrapper">
                        <IoLockClosedOutline size={18} color="#7baea6" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                        />
                        <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <IoEyeOffOutline size={18} color="#7baea6" />
                            ) : (
                                <IoEyeOutline size={18} color="#7baea6" />
                            )}
                        </span>
                    </div>

                    <button className="nextBtn">Continue ✨</button>

                    <p className="footerText">
                        Already part of the family?{" "}
                        <span className="loginLink" onClick={() => navigate("/loginpage")}>
                            Log in here 💫
                        </span>
                    </p>

                    <p className="orText">OR SIGN UP WITH</p>

                    <div className="socialRow">
                        <div className="socialBtn">Google</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

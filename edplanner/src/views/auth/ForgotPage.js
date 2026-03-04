import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import "./style.css";

export default function ForgotPassword() {
    const navigate = useNavigate();

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <div className="logoWrapper">
                    <img src="/assets/leftLogo.png" alt="logo" className="logo" />
                </div>
            </div>

            {/* Center */}
            <div className="center">
                <div className="card">
                    <h2 className="title">Forgot Password?</h2>

                    <p className="footerText" style={{ marginBottom: 20 }}>
                        It’s okay, we all forget sometimes 🤍
                        <br />
                        Just enter your email and we’ll send you a reset link right away.
                    </p>

                    <label className="label">Email Address</label>

                    <div className="inputWrapper">
                        <IoMailOutline size={18} color="#7baea6" />
                        <input
                            type="email"
                            placeholder="name@email.com"
                        />
                    </div>

                    <button className="nextBtn">
                        Send Reset Link →
                    </button>

                    <p
                        className="footerText loginLink"
                        onClick={() => navigate("/loginpage")}
                    >
                        ← Back to Login
                    </p>
                </div>
            </div>
        </div>
    );
}

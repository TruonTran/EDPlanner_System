import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IoLockClosedOutline,
    IoEyeOutline,
    IoEyeOffOutline,
} from "react-icons/io5";
import "./style.css";

export default function NewPassPage() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="container">
            {/* LOGO */}
            <div className="header">
                <img src="/assets/leftLogo.png" alt="logo" className="logo bigLogo" />
            </div>

            {/* CARD */}
            <div className="center">
                <div className="card">
                    <h2 className="title">Create New Password</h2>

                    <p className="footerText">
                        Your new password must be different from previously used passwords.
                    </p>

                    {/* New Password */}
                    <div className="label">New Password</div>
                    <div className="inputWrapper">
                        <IoLockClosedOutline size={18} color="#999" />
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Enter new password"
                        />
                        <span className="eye" onClick={() => setShowPass(!showPass)}>
                            {showPass ? (
                                <IoEyeOffOutline size={18} />
                            ) : (
                                <IoEyeOutline size={18} />
                            )}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="label">Confirm Password</div>
                    <div className="inputWrapper">
                        <IoLockClosedOutline size={18} color="#999" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                        />
                        <span className="eye" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? (
                                <IoEyeOffOutline size={18} />
                            ) : (
                                <IoEyeOutline size={18} />
                            )}
                        </span>
                    </div>

                    <button className="nextBtn">Continue</button>

                    <p className="footerText loginLink" onClick={() => navigate("/login")}>
                        ← Back to Login
                    </p>
                </div>
            </div>
        </div>
    );
}

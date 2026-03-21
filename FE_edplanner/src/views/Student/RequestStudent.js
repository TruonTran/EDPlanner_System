/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../style/RequestStudent.css";

const tabs = ["All", "pending", "approved"];

export default function RequestStudent() {
    const [requests, setRequests] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch("http://localhost:3001/bookingRequests")
            .then(res => res.json())
            .then(data => {
                console.log("🔥 user:", user);
                console.log("🔥 data:", data);

                // ✅ FIX: dùng user.id và convert về string cho chắc
                const myRequests = data.filter(
                    r => String(r.studentId) === String(user?.id)
                );

                console.log("🔥 myRequests:", myRequests);

                setRequests(myRequests);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filtered =
        activeTab === "All"
            ? requests
            : requests.filter(r => r.status === activeTab);

    if (loading) return <h3>Loading...</h3>;

    return (
        <div className="requests-container">

            <div className="requests-header">
                <div>
                    <h1>📝 Your Requests</h1>
                    <p className="subtitle">
                        Track your mentor booking requests
                    </p>
                </div>
            </div>

            <div className="tabs">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="requests-grid">
                {filtered.length > 0 ? (
                    filtered.map((req) => (
                        <div key={req.id} className="request-card">

                            <div className="card-icon">
                                {req.status === "approved" ? "✅" : "⏳"}
                            </div>

                            <h3 className="request-name">
                                {req.mentorName}
                            </h3>

                            <div className="request-meta">
                                <span className={`status-badge ${req.status}`}>
                                    {req.status}
                                </span>
                            </div>

                            <div className="request-details">
                                <div className="detail-row">
                                    <span>Slot</span>
                                    <span>{req.slot}</span>
                                </div>

                                <div className="detail-row">
                                    <span>Reason</span>
                                    <span>{req.reason}</span>
                                </div>

                                <div className="detail-row">
                                    <span>Status</span>
                                    <span>{req.status}</span>
                                </div>
                            </div>

                            {req.status === "approved" && (
                                <button className="approved-btn">
                                    Joined ✅
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No requests found</p>
                )}
            </div>
        </div>
    );
}
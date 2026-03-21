import React, { useEffect, useState } from "react";
import "../style/StudentSchedule.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timeSlots = [
    "07:00 - 09:15",
    "09:30 - 11:45",
    "13:00 - 15:15",
    "15:30 - 17:45",
    "18:00 - 20:15",
];

const StudentSchedule = () => {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 fetch data
    useEffect(() => {
        fetch("http://localhost:3001/bookingRequests")
            .then((res) => res.json())
            .then((data) => {
                setBookingRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    const getSession = (day, time) => {
        const startTime = time.split(" - ")[0];

        return bookingRequests.find((b) => {
            const [bDay, bTime] = b.slot.split(" ");
            const bStart = bTime;

            return bDay === day && bStart === startTime;
        });
    };

    const getStatusClass = (status) => {
        if (status === "approved") return "status-attended";
        if (status === "pending") return "status-happening";
        return "status-not-yet";
    };

    if (loading) return <h3>Loading schedule...</h3>;

    return (
        <div className="Schedule_Student">

            {/* Header */}
            <div className="schedule-header">
                <h1>Student Schedule</h1>
                <p className="subtitle">Mentor Booking Schedule</p>
            </div>

            {/* Grid */}
            <div className="schedule-grid-container">
                <div className="schedule-grid">

                    {/* TIME COLUMN */}
                    <div className="time-column">
                        <div className="time-header"></div>
                        {timeSlots.map((time, i) => (
                            <div key={i} className="time-slot-header">
                                <div className="slot-label">Slot {i + 1}</div>
                                <div className="slot-time">{time}</div>
                            </div>
                        ))}
                    </div>

                    {/* DAYS */}
                    {daysOfWeek.map((day, dayIdx) => (
                        <div key={dayIdx} className="day-column">
                            <div className="day-header">
                                <div className="day-name">{day}</div>
                            </div>

                            {timeSlots.map((time, idx) => {
                                const session = getSession(day, time);

                                return (
                                    <div key={idx} className="time-slot">
                                        {session ? (
                                            <div
                                                className={`session-card ${getStatusClass(session.status)}`}
                                            >
                                                <div className="course-code">
                                                    {session.mentorName}
                                                </div>

                                                <div className="course-title">
                                                    {session.studentName}
                                                </div>

                                                <div className="course-time">
                                                    {session.slot}
                                                </div>

                                                <div className="course-room">
                                                    {session.reason}
                                                </div>

                                                <button
                                                    className={`join-button ${session.status === "approved" ? "active" : ""}`}
                                                >
                                                    {session.status}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="empty-slot-content"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentSchedule;
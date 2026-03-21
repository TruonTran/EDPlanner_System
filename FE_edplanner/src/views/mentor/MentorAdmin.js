import React, { useEffect, useState } from "react";
import Sidebar from "../layout/SidebarMentor";
import Header from "../layout/HeaderMentor";
import "../style/MentorAdmin.css";
import { Link } from "react-router-dom";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const slots = [
    { id: 1, time: "07:00 - 09:15" },
    { id: 2, time: "09:30 - 11:45" },
    { id: 3, time: "13:00 - 15:15" },
    { id: 4, time: "15:30 - 17:45" },
    { id: 5, time: "18:00 - 20:15" }
];
const MentorPage = () => {
    const [mentors, setMentors] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3001/mentors")
            .then(res => res.json())
            .then(data => setMentors(data));

        fetch("http://localhost:3001/bookingRequests")
            .then(res => res.json())
            .then(data => setRequests(data));

    }, []);

    const approveRequest = (id) => {

        fetch(`http://localhost:3001/bookingRequests/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "approved" })
        }).then(() => {

            setRequests(prev =>
                prev.map(req =>
                    req.id === id ? { ...req, status: "approved" } : req
                )
            );

        });

    };

    const getMentorSlot = (day, time) => {

        for (let mentor of mentors) {

            const slot = mentor.availableSlots.find(
                s => s.day === day && s.time === time
            );

            if (slot) return mentor;

        }

        return null;

    };

    return (

        <div className="mentor-overview">

            <Sidebar />

            <div className="main">

                <Header />

                <div className="content">

                    {/* ================= MENTOR TABLE ================= */}

                    <div className="mentor-table-box">

                        <div className="mentor-header">
                            <h3>Danh sách Mentor</h3>

                            <Link to="/mentors" className="all-mentor-btn">
                                All mentor
                            </Link>
                        </div>

                        <table className="mentor-table">

                            <thead>
                                <tr>
                                    <th>Mentor</th>
                                    <th>Sinh viên đăng ký</th>
                                    <th>Lịch rảnh</th>
                                </tr>
                            </thead>

                            <tbody>

                                {mentors.map((mentor) => (

                                    <tr key={mentor.id}>

                                        <td>{mentor.name}</td>

                                        <td>{mentor.currentStudents}</td>

                                        <td>

                                            {mentor.availableSlots.map((slot, i) => (
                                                <div key={i}>
                                                    {slot.day} - {slot.time}
                                                </div>
                                            ))}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* ================= CALENDAR SLOT ================= */}

                    <div className="calendar-box">

                        <div className="calendar-header">

                            <h3>Mentor Weekly Schedule</h3>

                            <Link to="/mentor-schedule" className="schedule-btn">
                                Manage Schedule
                            </Link>

                        </div>

                        <table className="calendar-table">

                            <thead>

                                <tr>

                                    <th>Slot</th>

                                    {days.map(day => (
                                        <th key={day}>
                                            {day.substring(0, 3).toUpperCase()}
                                        </th>
                                    ))}

                                </tr>

                            </thead>

                            <tbody>

                                {slots.map(slot => (

                                    <tr key={slot.id}>

                                        <td className="slot-label">

                                            Slot {slot.id}

                                            <div className="slot-time-small">
                                                {slot.time}
                                            </div>

                                        </td>

                                        {days.map(day => {

                                            const mentor = getMentorSlot(day, slot.time);

                                            return (

                                                <td key={day + slot.id}>

                                                    {mentor ? (

                                                        <div className="slot-card">

                                                            <div className="mentor-name">
                                                                {mentor.lecturer}
                                                            </div>

                                                            <div className="mentor-full">
                                                                {mentor.name}
                                                            </div>

                                                            <div className="slot-time">
                                                                {slot.time}
                                                            </div>

                                                            <div className="slot-status">
                                                                🟢 Online
                                                            </div>

                                                        </div>

                                                    ) : "-"}

                                                </td>

                                            )

                                        })}

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>



                    {/* ================= REQUEST ================= */}

                    <div className="request-section">

                        <div className="request-header">

                            <h3>Yêu cầu Phê duyệt</h3>

                            <span className="request-count">
                                {requests.filter(r => r.status === "pending").length}
                            </span>

                        </div>

                        {requests.map((req) => {

                            const firstLetter = req.studentName.charAt(0);

                            return (

                                <div key={req.id} className="request-card">

                                    <div className="request-top">

                                        <div className="request-user">

                                            <div className="avatar">
                                                {firstLetter}
                                            </div>

                                            <div>

                                                <div className="name">
                                                    {req.studentName}
                                                </div>

                                                <div className="time">
                                                    {req.slot}
                                                </div>

                                            </div>

                                        </div>

                                        {req.status === "pending" ? (

                                            <button
                                                className="approve-icon"
                                                onClick={() => approveRequest(req.id)}
                                            >
                                                ✓
                                            </button>

                                        ) : (

                                            <div className="approved-icon">
                                                ✓
                                            </div>

                                        )}

                                    </div>

                                    <div className="request-message">
                                        "{req.reason}"
                                    </div>

                                </div>

                            )

                        })}

                        <Link to="/student-request" className="request-history">
                            XEM LỊCH SỬ YÊU CẦU
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default MentorPage;
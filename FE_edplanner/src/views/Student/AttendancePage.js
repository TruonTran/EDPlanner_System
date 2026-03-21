import React, { useEffect, useState } from "react";
import "../style/Attendance.css";

const AttendancePage = () => {
    const [courses, setCourses] = useState([]);
    const [academicYear, setAcademicYear] = useState("");
    const [semester, setSemester] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/attendance")
            .then((res) => res.json())
            .then((data) => {
                const attendanceData = data[0]; // 👈 lấy phần tử đầu

                setCourses(attendanceData.courses);
                setAcademicYear(attendanceData.academicYear);
                setSemester(attendanceData.semester);

                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching attendance:", err);
                setLoading(false);
            });
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "GOOD STANDING":
                return "status-good";
            case "AT RISK OF FAILURE":
                return "status-risk";
            case "EXEMPLARY":
                return "status-exemplary";
            default:
                return "status-good";
        }
    };

    const renderCircularProgress = (rate, color) => {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (rate / 100) * circumference;

        return (
            <svg viewBox="0 0 100 100" className="progress-circle">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="4" />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={
                        color === "green"
                            ? "#10B981"
                            : color === "red"
                                ? "#EF4444"
                                : "#F59E0B"
                    }
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
                <text x="50" y="50" textAnchor="middle" dy=".3em" className="progress-text">
                    {rate}%
                </text>
            </svg>
        );
    };

    if (loading) return <h3>Loading attendance...</h3>;

    return (
        <div className="attendance-container">
            <div className="attendance-header">
                <h1>Điểm danh</h1>

                {/* 👇 thêm dòng này */}
                <p className="semester-info">
                    {academicYear} | {semester} Semester
                </p>
            </div>

            <div className="courses-grid">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className={`course-card ${getStatusColor(course.status)}`}
                    >
                        <div className="card-header">
                            <h3>{course.name}</h3>
                            <span className="status-badge">{course.status}</span>
                        </div>

                        <p className="professor">
                            {course.professor}
                        </p>

                        <div className="progress-container">
                            {renderCircularProgress(course.attendanceRate, course.color)}
                        </div>

                        <div className="attendance-stats">
                            <div>
                                ATTENDED: {course.attended}/{course.totalSessions}
                            </div>
                            <div>
                                ABSENT: {course.absences}/{course.totalSessions}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendancePage;
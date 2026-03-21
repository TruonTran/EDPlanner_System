import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/MentorDetail.css";

export default function MentorDetailPage() {
    const { id } = useParams();

    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [message, setMessage] = useState("");

    // 🔥 FETCH MENTOR FROM JSON SERVER
    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const res = await fetch(`http://localhost:3001/mentors/${id}`);
                const data = await res.json();

                setMentor(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentor();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!mentor || !mentor.id) return <h2>Mentor not found</h2>;

    // 🔥 BOOK FUNCTION
    const handleBook = async () => {
        if (!selectedSlot) {
            setMessage("❌ Please select a slot first!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const newBooking = {
            studentId: user?.id,
            studentName: user?.name,
            mentorId: mentor.id,
            mentorName: mentor.name,
            slot: selectedSlot,
            reason: "Booking from system",
            status: "pending"
        };

        try {
            await fetch("http://localhost:3001/bookingRequests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBooking)
            });

            setMessage("✅ Booking success!");
        } catch (err) {
            setMessage("❌ Booking failed!");
        }
    };

    return (
        <div className="mentorDetail">

            {/* LEFT */}
            <div className="mentor-left">

                <div className="mentor-card">
                    <img
                        src={mentor.avatar}
                        alt={mentor.name}   // ✅ FIX ESLINT
                        className="mentor-avatar"
                    />

                    <h2>{mentor.name}</h2>
                    <p className="mentor-role">{mentor.role}</p>

                    <div className="mentor-rating">
                        ⭐ {mentor.rating} ({mentor.reviews})
                    </div>

                    <div className="mentor-tags">
                        {mentor.skills?.map(skill => (
                            <span key={skill}>{skill}</span>
                        ))}
                    </div>

                    <button
                        className="select-mentor-btn"
                        onClick={() => setSelectedMentor(mentor)}
                    >
                        Select Mentor
                    </button>
                </div>

                <div className="mentor-about">
                    <h3>About Me</h3>
                    <p>{mentor.desc}</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="mentor-right">

                <h2>Available Slots</h2>

                <div className="slot-list">
                    {mentor.availableSlots?.length > 0 ? (
                        mentor.availableSlots.map((s, index) => (
                            <div
                                key={index}
                                className={`slot-item ${selectedSlot === `${s.day} ${s.time}` ? "active" : ""
                                    }`}
                                onClick={() => setSelectedSlot(`${s.day} ${s.time}`)}
                            >
                                {s.day} - {s.time}
                            </div>
                        ))
                    ) : (
                        <p>No slots available</p>
                    )}
                </div>

                {message && <p className="booking-msg">{message}</p>}
            </div>

            {/* BOOK BAR */}
            {selectedMentor && (
                <div className="booking-bar">

                    <div>
                        <h4>{selectedMentor.name}</h4>
                        <p>{selectedSlot || "No slot selected"}</p>
                    </div>

                    <div className="slot-actions">
                        <button className="msg-btn">Message</button>
                        <button className="book-btn" onClick={handleBook}>
                            Book
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
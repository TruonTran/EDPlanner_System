import React, { useEffect, useState } from "react";
import Sidebar from "../layout/SidebarMentor";
import Header from "../layout/HeaderMentor";
import "../style/MentorSchedule.css";

const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = [
    "07:00 - 09:15",
    "09:30 - 11:45",
    "13:00 - 15:15",
    "15:30 - 17:45",
    "18:00 - 20:15"
];

const MentorSchedule = () => {

    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost:3001/mentors")
            .then(res => res.json())
            .then(data => {
                setMentors(data);
                if (data.length > 0) {
                    setSelectedMentor(data[0]);
                    setSlots(data[0].availableSlots || []);
                }
            });

    }, []);

    const changeMentor = (id) => {

        const mentor = mentors.find(m => m.id === id);

        if (!mentor) return;

        setSelectedMentor(mentor);
        setSlots(mentor.availableSlots || []);

    };

    const toggleSlot = (day, time) => {

        const exist = slots.find(s => s.day === day && s.time === time);

        let newSlots;

        // remove slot
        if (exist) {
            newSlots = slots.filter(s => !(s.day === day && s.time === time));
            setSlots(newSlots);
            setError("");
            return;
        }

        const dayCount = slots.filter(s => s.day === day).length;

        if (dayCount >= 3) {
            setError("Each day can only have maximum 3 slots.");
            return;
        }

        setError("");

        newSlots = [...slots, { day, time }];
        setSlots(newSlots);

    };

    const saveSchedule = () => {

        if (!selectedMentor) return;
        console.log(selectedMentor);
        console.log(slots);
        fetch(`http://localhost:3001/mentors/${selectedMentor.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                availableSlots: slots
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server error");
                }
                return res.json();
            })
            .then(data => {

                const updatedMentors = mentors.map(m =>
                    m.id === data.id ? data : m
                );

                setMentors(updatedMentors);
                setSelectedMentor(data);
                setError("Schedule saved successfully");

            })
            .catch(err => {
                console.log(err);
                setError("Error saving schedule");
            });
    };

    return (

        <div className="mentor-schedule-page">

            <Sidebar />

            <div className="main">

                <Header />

                <div className="content">

                    <h2>Mentor Schedule Management</h2>

                    {/* SELECT MENTOR */}

                    <div className="mentor-select">

                        <label>Choose Mentor</label>

                        <select
                            value={selectedMentor?.id || ""}
                            onChange={(e) => changeMentor(e.target.value)}
                        >

                            {mentors.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* CALENDAR */}

                    <table className="schedule-table">

                        <thead>

                            <tr>

                                <th>Time</th>

                                {days.map(day => (
                                    <th key={day}>{day.substring(0, 3)}</th>
                                ))}

                            </tr>

                        </thead>

                        <tbody>

                            {timeSlots.map(time => (

                                <tr key={time}>

                                    <td className="time-col">{time}</td>

                                    {days.map(day => {

                                        const active = slots.some(s => s.day === day && s.time === time);

                                        return (

                                            <td
                                                key={day + time}
                                                className={active ? "active-slot" : ""}
                                                onClick={() => toggleSlot(day, time)}
                                            >

                                                {active ? "✓" : ""}

                                            </td>

                                        )

                                    })}

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {error && (
                        <div className="error-banner">
                            {error}
                        </div>
                    )}

                    <button
                        className="save-btn"
                        onClick={saveSchedule}
                    >
                        Save Schedule
                    </button>

                </div>

            </div>

        </div>

    )

};

export default MentorSchedule;
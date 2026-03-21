import React, { useState, useMemo, useEffect } from "react";
import "../style/MentorManagement.css";
import Sidebar from "../layout/SidebarMentor";
import HeaderMentor from "../layout/HeaderMentor";

const MentorManagement = () => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [mentorList, setMentorList] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        lecturer: "",
        role: "",
        category: "",
        desc: "",
        avatar: "",
        currentStudents: 0,
        maxStudents: 5
    });

    // LOAD MENTORS
    const loadMentors = () => {
        fetch("http://localhost:3001/mentors")
            .then((res) => res.json())
            .then((data) => setMentorList(data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        loadMentors();
    }, []);

    // FILTER
    const mentors = useMemo(() => {

        return mentorList.filter((mentor) => {

            const matchSearch =
                mentor.name?.toLowerCase().includes(search.toLowerCase()) ||
                mentor.lecturer?.toLowerCase().includes(search.toLowerCase());

            const matchCategory =
                category === "All" || mentor.category === category;

            return matchSearch && matchCategory;

        });

    }, [search, category, mentorList]);

    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ADD MENTOR
    const handleAddMentor = async (e) => {

        e.preventDefault();

        await fetch("http://localhost:3001/mentors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                availableSlots: []
            })
        });

        setShowForm(false);
        resetForm();
        loadMentors();

    };

    // EDIT
    const handleEdit = (mentor) => {

        setFormData(mentor);
        setEditingId(mentor.id);
        setShowForm(true);

    };

    // UPDATE
    const handleUpdate = async (e) => {

        e.preventDefault();

        await fetch(`http://localhost:3001/mentors/${editingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        setShowForm(false);
        setEditingId(null);
        resetForm();
        loadMentors();

    };

    // DELETE
    const handleDelete = async (id) => {

        if (!window.confirm("Delete mentor?")) return;

        await fetch(`http://localhost:3001/mentors/${id}`, {
            method: "DELETE"
        });

        loadMentors();

    };

    const resetForm = () => {

        setFormData({
            name: "",
            lecturer: "",
            role: "",
            category: "",
            desc: "",
            avatar: "",
            currentStudents: 0,
            maxStudents: 5
        });

    };

    return (

        <div className="mentor-manager">

            <Sidebar />

            <div className="main">

                <HeaderMentor />

                <div className="mentor-page">
                    {/* TOOLBAR */}

                    <div className="mentor-toolbar">

                        <input
                            type="text"
                            placeholder="Search mentor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Management Team">Management Team</option>
                            <option value="Mentorship">Mentorship</option>
                        </select>

                        <button
                            className="btn-add"
                            onClick={() => setShowForm(true)}
                        >
                            + Add Mentor
                        </button>

                    </div>

                    {/* FORM */}

                    {showForm && (

                        <form
                            className="mentor-form"
                            onSubmit={editingId ? handleUpdate : handleAddMentor}
                        >

                            <input
                                name="name"
                                placeholder="Mentor Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="lecturer"
                                placeholder="Lecturer"
                                value={formData.lecturer}
                                onChange={handleChange}
                            />

                            <input
                                name="role"
                                placeholder="Role"
                                value={formData.role}
                                onChange={handleChange}
                            />

                            <input
                                name="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleChange}
                            />

                            <input
                                name="avatar"
                                placeholder="Avatar URL"
                                value={formData.avatar}
                                onChange={handleChange}
                            />

                            <textarea
                                name="desc"
                                placeholder="Description"
                                value={formData.desc}
                                onChange={handleChange}
                            />

                            <button type="submit">
                                {editingId ? "Update Mentor" : "Add Mentor"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>

                        </form>

                    )}

                    {/* TABLE */}
                    <div className="mentor-table-container">
                        <div className="mentor-table-wrapper">

                            <table className="mentor-table">

                                <thead>
                                    <tr>
                                        <th>Mentor</th>
                                        <th>Role</th>
                                        <th>Students</th>
                                        <th>Availability</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {mentors.map((mentor) => {

                                        const isFull =
                                            mentor.currentStudents >= mentor.maxStudents;

                                        return (

                                            <tr key={mentor.id}>

                                                <td className="mentor-info">

                                                    <img
                                                        src={mentor.avatar}
                                                        alt={mentor.name}
                                                    />

                                                    <div>
                                                        <strong>{mentor.name}</strong>
                                                        <p>{mentor.lecturer}</p>
                                                    </div>

                                                </td>

                                                <td>{mentor.role}</td>

                                                <td>

                                                    <div className="student-count">

                                                        {mentor.currentStudents} / {mentor.maxStudents}

                                                        {isFull ? (
                                                            <span className="status full">Full</span>
                                                        ) : (
                                                            <span className="status available">
                                                                Available
                                                            </span>
                                                        )}

                                                    </div>

                                                </td>

                                                <td>

                                                    <div className="slot-list">

                                                        {mentor.availableSlots?.map((slot, index) => (

                                                            <span
                                                                key={index}
                                                                className="slot"
                                                            >
                                                                {slot.day} {slot.time}
                                                            </span>

                                                        ))}

                                                    </div>

                                                </td>

                                                <td>

                                                    <span className="category">
                                                        {mentor.category}
                                                    </span>

                                                </td>

                                                <td>{mentor.desc}</td>

                                                <td className="action-cell">

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => handleEdit(mentor)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDelete(mentor.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

};

export default MentorManagement;
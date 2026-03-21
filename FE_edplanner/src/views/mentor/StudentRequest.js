import React, { useEffect, useState } from "react";
import Sidebar from "../layout/SidebarMentor";
import Header from "../layout/HeaderMentor";
import "../style/StudentRequest.css";

const StudentRequestPage = () => {

    const [requests, setRequests] = useState([]);

    const [formData, setFormData] = useState({
        studentName: "",
        mentorName: "",
        slot: "",
        reason: "",
        status: "pending"
    });

    const [editingId, setEditingId] = useState(null);

    // LOAD DATA
    const loadRequests = () => {
        fetch("http://localhost:3001/bookingRequests")
            .then(res => res.json())
            .then(data => setRequests(data));
    };

    useEffect(() => {
        loadRequests();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ADD OR UPDATE
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {

            fetch(`http://localhost:3001/bookingRequests/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }).then(() => {
                loadRequests();
                resetForm();
            });

        } else {

            fetch("http://localhost:3001/bookingRequests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }).then(() => {
                loadRequests();
                resetForm();
            });

        }
    };

    // EDIT
    const handleEdit = (req) => {
        setFormData(req);
        setEditingId(req.id);
    };

    // DELETE
    const handleDelete = (id) => {

        if (window.confirm("Bạn chắc chắn muốn xoá?")) {

            fetch(`http://localhost:3001/bookingRequests/${id}`, {
                method: "DELETE"
            }).then(() => loadRequests());

        }
    };

    const resetForm = () => {
        setFormData({
            studentName: "",
            mentorName: "",
            slot: "",
            reason: "",
            status: "pending"
        });
        setEditingId(null);
    };

    return (

        <div className="student-request">

            <Sidebar />

            <div className="main">

                <Header />

                <div className="content">
                    {/* FORM */}

                    <form className="request-form" onSubmit={handleSubmit}>

                        <input
                            name="studentName"
                            placeholder="Student Name"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="mentorName"
                            placeholder="Mentor Name"
                            value={formData.mentorName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="slot"
                            placeholder="Slot (ex: Monday 09:00 - 10:00)"
                            value={formData.slot}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="reason"
                            placeholder="Reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button type="submit">
                            {editingId ? "Update" : "Add Request"}
                        </button>

                        {editingId && (
                            <button type="button" onClick={resetForm}>
                                Cancel
                            </button>
                        )}

                    </form>

                    {/* TABLE */}

                    <table className="request-table">

                        <thead>
                            <tr>
                                <th>Sinh viên</th>
                                <th>Mentor</th>
                                <th>Slot</th>
                                <th>Lý do</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {requests.map(req => (

                                <tr key={req.id}>

                                    <td className="student-col">{req.studentName}</td>
                                    <td className="mentor-col">{req.mentorName}</td>
                                    <td className="slot-col">{req.slot}</td>
                                    <td className="reason-col">{req.reason}</td>

                                    <td>
                                        <span className={`status-badge status-${req.status}`}>
                                            {req.status}
                                        </span>
                                    </td>

                                    <td>

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(req)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(req.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default StudentRequestPage;
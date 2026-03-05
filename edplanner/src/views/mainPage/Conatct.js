/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "./Contact.css";

export default function ContactPage() {

    const [reviews, setReviews] = useState([]);

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const reviewAPI = "http://localhost:3001/reviews";
    const contactAPI = "http://localhost:3001/contacts";

    useEffect(() => {
        fetch(reviewAPI)
            .then((res) => res.json())
            .then((data) => setReviews(data.reverse()));
    }, []);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            name,
            comment,
            rating: Number(rating),
            time: "Vừa xong",
        };

        await fetch(reviewAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview),
        });

        setReviews([newReview, ...reviews]);

        setName("");
        setComment("");
        setRating("");
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        const newContact = {
            name: contactName,
            email: contactEmail,
            message: contactMessage,
            date: new Date(),
        };

        await fetch(contactAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact),
        });

        alert("Đã gửi liên hệ!");

        setContactName("");
        setContactEmail("");
        setContactMessage("");
    };

    return (
        <div className="contactPage">

            <Header />

            <div className="contactContainer">

                <h1 className="contactTitle">Kết Nối & Góp Ý</h1>

                {/* CONTACT FORM */}

                <div className="contactCard">

                    <h2>Gửi Tin Nhắn</h2>

                    <form onSubmit={handleContactSubmit}>

                        <div className="grid2">

                            <input
                                type="text"
                                placeholder="Họ và tên"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                required
                            />

                        </div>

                        <textarea
                            placeholder="Nội dung liên hệ"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            required
                        />

                        <button className="btnPrimary">
                            Gửi Liên Hệ
                        </button>

                    </form>

                </div>

                {/* ADD REVIEW */}

                <div className="reviewFormBox">

                    <h3>Để lại cảm nghĩ của bạn</h3>

                    <form onSubmit={handleReviewSubmit}>

                        <div className="ratingBox">

                            <span>Đánh giá:</span>

                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >

                                <option value="">Chọn</option>
                                <option value="5">5 ⭐</option>
                                <option value="4">4 ⭐</option>
                                <option value="3">3 ⭐</option>
                                <option value="2">2 ⭐</option>
                                <option value="1">1 ⭐</option>

                            </select>

                        </div>

                        <input
                            type="text"
                            placeholder="Tên của bạn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Nhận xét của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />

                        <button className="btnBlue">
                            Gửi Đánh Giá
                        </button>

                    </form>

                </div>

                {/* REVIEW LIST */}

                <div className="reviewCardBox">

                    <h2>Đánh giá khách hàng</h2>

                    {reviews.map((r, index) => (

                        <div key={index} className="reviewItem">

                            <div className="reviewHeader">

                                <div className="avatar">
                                    {r.name.charAt(0)}
                                </div>

                                <div>

                                    <h4>{r.name}</h4>

                                    <div className="stars">
                                        {"⭐".repeat(r.rating)}
                                    </div>

                                </div>

                                <span className="time">{r.time}</span>

                            </div>

                            <p className="comment">"{r.comment}"</p>

                        </div>

                    ))}

                </div>



                {/* MAP */}

                <div className="mapBox">

                    <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps?q=Can+Tho&output=embed"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                    ></iframe>

                </div>

            </div>

            <Footer />

        </div>
    );
}
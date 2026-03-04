/* eslint-disable jsx-a11y/alt-text */
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import { useEffect, useState } from "react";
import "./Contact.css";

export default function ContactPage() {
    const [blogs, setBlogs] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        fetch("http://localhost:3001/blogs")
            .then(res => res.json())
            .then(data => setBlogs(data));

        fetch("http://localhost:3001/testimonials")
            .then(res => res.json())
            .then(data => setTestimonials(data));

        fetch("http://localhost:3001/questions")
            .then(res => res.json())
            .then(data => setQuestions(data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                createdAt: new Date().toISOString()
            })
        }).then(() => {
            alert("Message sent successfully!");
            setForm({ name: "", email: "", subject: "", message: "" });
        });
    };
    return (
        <div className="contactPage">
            <Header />
            {/* HERO */}
            <section className="hero">
                <h1>Community & Career Growth Center</h1>
                <p>Learn from mentors, read insights and ask questions.</p>
            </section>

            {/* BLOG */}
            <section>
                <h2>Career Insights</h2>
                <div className="grid">
                    {blogs.map(blog => (
                        <div key={blog.id} className="card">
                            <img src={blog.thumbnail} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            <p>{blog.author}</p>
                            <small>{blog.category} • {blog.readTime} • 👁 {blog.views}</small>
                            <p>{blog.excerpt}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section>
                <h2>Success Stories</h2>
                <div className="grid">
                    {testimonials.map(t => (
                        <div key={t.id} className="card">
                            <h4>{t.studentName}</h4>
                            <p>Mentor: {t.mentorName}</p>
                            <p>⭐ {t.rating}/5</p>
                            <p>"{t.review}"</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Q&A */}
            <section>
                <h2>Ask A Mentor</h2>
                {questions.map(q => (
                    <div key={q.id} className="qaBox">
                        <h4>Q: {q.question}</h4>
                        {q.answers.map((a, index) => (
                            <p key={index}><b>{a.mentor}:</b> {a.content}</p>
                        ))}
                    </div>
                ))}
            </section>

            {/* CONTACT */}
            <section>
                <h2>Contact Support</h2>
                <form onSubmit={handleSubmit} className="contactForm">
                    <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" rows="4"
                        value={form.message} onChange={handleChange} required />
                    <button type="submit">Send Message</button>
                </form>
            </section>
            <Footer />
        </div>
    );
}
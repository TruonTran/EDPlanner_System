import React, { useEffect, useState } from "react";
import "../style/PaymentStudent.css";

const PaymentStudent = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [activeCard, setActiveCard] = useState(0);

    // 🧠 lấy user từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:3001/payments?userId=${user._id}`)
            .then((res) => res.json())
            .then((data) => {
                setPaymentData(data[0]); // vì json-server trả về array
            })
            .catch((err) => console.error(err));
    }, [user]);

    if (!paymentData) return <h3>Loading payment...</h3>;

    return (
        <div className="payment-container">
            <h1>💳 Payment Student</h1>

            {/* CARD LIST */}
            <div className="card-list">
                {paymentData.paymentMethods.map((card, idx) => (
                    <div
                        key={card.id}
                        className={`card ${activeCard === idx ? "active" : ""}`}
                        onClick={() => setActiveCard(idx)}
                    >
                        <h3>{card.type}</h3>
                        <p>{card.cardNumber}</p>
                        <span>{card.cardHolder}</span>
                        <small>{card.expiryDate}</small>
                    </div>
                ))}
            </div>

            {/* STATUS */}
            <div className="card-status">
                <h3>Status</h3>
                <p>{paymentData.paymentMethods[activeCard].status}</p>
            </div>

            {/* HISTORY */}
            <div className="history">
                <h2>Payment History</h2>

                {paymentData.paymentHistory.map((item) => (
                    <div key={item.id} className="history-item">
                        <div>
                            <b>{item.description}</b>
                            <p>{item.invoiceId}</p>
                        </div>

                        <div>{item.amount}</div>

                        <div className={`status ${item.statusColor}`}>
                            {item.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentStudent;
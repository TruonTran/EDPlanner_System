import Header from "../layout/Header";
import Footer from "../layout/Footer";
import products from "../../data/products.json";
import "./ProductsPage.css";

export default function ProductsPage() {

    const handleBuy = (product) => {
        alert(`You selected: ${product.name}`);
    };

    return (
        <div className="productsPage">
            <Header />

            <section className="products-section">
                <h2 className="products-title">Mentoring Packages</h2>

                <div className="products-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`product-card ${product.popular ? "popular" : ""}`}
                        >
                            {product.popular && (
                                <span className="badge">Most Popular</span>
                            )}

                            <h3>{product.name}</h3>

                            <p className="price">
                                {product.price.toLocaleString()} đ
                            </p>

                            <p className="sessions">
                                {product.sessions} Sessions
                            </p>

                            <p className="duration">
                                Duration: {product.duration}
                            </p>

                            <p className="description">
                                {product.description}
                            </p>

                            <button
                                className="buy-btn"
                                onClick={() => handleBuy(product)}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
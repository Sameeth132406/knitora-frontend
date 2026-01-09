import { useEffect, useState } from "react";

const API_URL = "/api/products";
const WHATSAPP_NUMBER = "917845852613";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="shop">
      <h2>Shop</h2>

      <div className="shop-list">
        {products.map((p) => {
          const message = `Hi Knitora 👋, I would like to enquire about the ${p.name} (₹${p.price}).`;

          return (
            <div key={p.id} className="shop-card">
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                />
              )}

              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p className="description">{p.description}</p>

              <a
                className="whatsapp-btn"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  message
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;

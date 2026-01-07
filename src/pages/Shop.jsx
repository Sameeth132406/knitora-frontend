import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="shop">
      <h2>Shop</h2>

      <div className="shop-list">
        {products.map((p) => (
          <div key={p.id} className="shop-card">
            {/* Image */}
            {p.image ? (
              <img src={p.image} alt={p.name || "Product"} />
            ) : (
              <div className="no-image">No Image</div>
            )}

            {/* Name */}
            <h3>{p.name || "Unnamed Product"}</h3>

            {/* Price */}
            <p className="price">
              {p.price ? `₹${p.price}` : "Price not available"}
            </p>

            {/* Description */}
            {p.description && (
              <p className="description">{p.description}</p>
            )}

            {/* Enquiry */}
            <p className="enquiry">
              📞 Enquiry: +{p.contact || "91XXXXXXXXXX"}
            </p>

            {/* WhatsApp */}
            <a
              className="whatsapp-btn"
              href={`https://wa.me/${p.contact}?text=I want to buy ${p.name}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;

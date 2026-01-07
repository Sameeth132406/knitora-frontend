import { useState } from "react";

function ProductCard({ product }) {
  const [zoom, setZoom] = useState(false);

  const phoneNumber = product.contact;
  const callLink = `tel:${phoneNumber}`;

  const whatsappMessage = encodeURIComponent(
    `Hi 👋 I am interested in your product: ${product.name}. Can you please share more details?`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <>
      <div className="card">
        {/* CLICKABLE IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onClick={() => setZoom(true)}
        />

        <h3>{product.name}</h3>
        <p>₹{product.price}</p>

        <a href={callLink} className="call-link">
          📞 Enquiry: {phoneNumber}
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          💬 Chat on WhatsApp
        </a>
      </div>

      {/* ZOOM OVERLAY */}
      {zoom && (
        <div className="zoom-overlay" onClick={() => setZoom(false)}>
          <img
            src={product.image}
            alt={product.name}
            className="zoom-image"
          />
          <span className="close-btn">✕</span>
        </div>
      )}
    </>
  );
}

export default ProductCard;

import { useNavigate } from "react-router-dom";
import logo from "../assets/knitora-logo.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="overlay">
        <img src={logo} alt="Knitora Logo" className="logo" />

        <h2 className="tagline">Every Loop Matters</h2>

        <p className="description">
          Handmade knitting essentials crafted with love and care.
        </p>

        <div className="buttons">
          {/* SHOP BUTTON */}
          <button
            className="primary"
            onClick={() => navigate("/shop")}
          >
            Shop Collection
          </button>

          {/* ADMIN BUTTON */}
          <button
            className="secondary"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

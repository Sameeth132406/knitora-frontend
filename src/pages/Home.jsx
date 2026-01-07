import { useNavigate } from "react-router-dom";
import logo from "../assets/knitora-logo.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="overlay">
        <img src={logo} alt="Knitora Logo" className="logo" />

        <div className="buttons">
          <button
            className="primary"
            onClick={() => navigate("/shop")}
          >
            Shop Collection
          </button>

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

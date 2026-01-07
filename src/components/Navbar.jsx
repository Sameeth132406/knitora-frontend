import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="nav-title">
          Knitora
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>

        {/* Show Shop ONLY if not already on Shop page */}
        {location.pathname !== "/shop" && (
          <Link to="/shop" className="nav-link">Shop</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

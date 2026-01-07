import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-title">Knitora</Link>
    </nav>
  );
}

export default Navbar;
    
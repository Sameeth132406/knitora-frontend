import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin-panel");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="admin">
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "user" or "admin"
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("mobile");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to={token ? (role === "admin" ? "/admin" : "/dashboard") : "/login"} className="brand">
          Mahila Shakti Yojana
        </Link>
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <span className="nav-role">{role?.toUpperCase()}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

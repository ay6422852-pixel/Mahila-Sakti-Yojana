import React, { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { mobile, password });
      // expected: { token, role }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role || "user");
      localStorage.setItem("mobile", mobile);
      if ((res.data.role || "user") === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <h2 className="card-title">Login</h2>
        <form onSubmit={submit} className="form">
          <label>Mobile</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} required />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(s => !s)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="btn" type="submit" disabled={loading}>{loading ? "Logging..." : "Login"}</button>
        </form>
        <p className="muted">New here? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

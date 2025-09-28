import React, { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "", mobile: "", village: "", district: "", pin: "", dob: "", password: "", referredBy: "", role: "user"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      // expected response: { token, role, ... }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role || form.role);
      localStorage.setItem("mobile", form.mobile);
      // redirect based on role
      if ((res.data.role || form.role) === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <h2 className="card-title">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} required />

          <label>Village</label>
          <input name="village" value={form.village} onChange={handleChange} />

          <label>District</label>
          <input name="district" value={form.district} onChange={handleChange} />

          <label>Pin Code</label>
          <input name="pin" value={form.pin} onChange={handleChange} />

          <label>Date of Birth</label>
          <input name="dob" type="date" value={form.dob} onChange={handleChange} />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(s => !s)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <label>Referred By (mobile — optional)</label>
          <input name="referredBy" value={form.referredBy} onChange={handleChange} />

          {/* Optionally let some registrations be admin during testing:
              Hide in production. */}
          <label>ignore</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
          </select>

          <button className="btn" type="submit" disabled={loading}>{loading ? "Please wait..." : "Register & Login"}</button>
        </form>
        <p className="muted">Already registered? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

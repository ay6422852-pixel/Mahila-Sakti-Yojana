import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/users/me"); // expects user object
        setUser(res.data);
      } catch (err) {
        // token invalid or other -> send to login
        navigate("/login");
      }
    };
    fetch();
  }, [navigate]);

  if (!user) return <div className="center-page"><div className="card">Loading...</div></div>;

  return (
    <div className="center-page">
      <div className="card large">
        <h2 className="card-title">Welcome, {user.name}</h2>

        <div className="grid">
          <div><strong>Mobile:</strong> {user.mobile}</div>
          <div><strong>Village:</strong> {user.village || "-"}</div>
          <div><strong>District:</strong> {user.district || "-"}</div>
          <div><strong>Pin:</strong> {user.pin || "-"}</div>
          <div><strong>DOB:</strong> {user.dob || "-"}</div>
          <div><strong>Your Referral Id:</strong> {user.mobile}</div>
          <div><strong>Referral Count:</strong> {user.referralCount || 0}</div>
        </div>

        <h3 style={{marginTop:16}}>People you referred</h3>
        {user.referredUsers && user.referredUsers.length > 0 ? (
          <ul className="list">
            {user.referredUsers.map(r => (
              <li key={r._id}>{r.name} — {r.mobile}</li>
            ))}
          </ul>
        ) : <p className="muted">You haven't referred anyone yet.</p>}
      </div>
    </div>
  );
}

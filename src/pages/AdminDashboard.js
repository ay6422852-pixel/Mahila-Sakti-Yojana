import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/users/all"); // expects { users: [...] } OR array
        // backend earlier returned array or {users}
        const data = Array.isArray(res.data) ? res.data : (res.data.users || res.data);
        setUsers(data);
      } catch (err) {
        navigate("/login");
      }
    };
    fetch();
  }, [navigate]);

  const handleSort = (field) => {
    setSortField(field);
    const sorted = [...users].sort((a, b) => {
      if (field === "referralCount") return (b.referralCount || 0) - (a.referralCount || 0);
      if (field === "district") return (a.district || "").localeCompare(b.district || "");
      if (field === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
    setUsers(sorted);
  };
  console.log(sortField);


  return (
    <div className="center-page">
      <div className="card xlarge">
        <h2 className="card-title">Admin — All Users</h2>

        <div style={{ marginBottom: 12 }}>
          <button className="small-btn" onClick={() => handleSort("district")}>Sort by District</button>
          <button className="small-btn" onClick={() => handleSort("referralCount")}>Sort by Referral Count</button>
          <button className="small-btn" onClick={() => handleSort("latest")}>Sort by Latest Registered</button>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Village</th>
                <th>District</th>
                <th>Pin</th>
                <th>DOB</th>
                <th>Referral Count</th>
                <th>Referred Users</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.mobile}</td>
                  <td>{u.village || "-"}</td>
                  <td>{u.district || "-"}</td>
                  <td>{u.pin || "-"}</td>
                  <td>{u.dob || "-"}</td>
                  <td>{u.referralCount || 0}</td>
                  <td>{u.referredUsers?.map(r => r.name).join(", ") || "-"}</td>
                  <td>{u.role || "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import UserDashboard from "./pages/UserDashboard.js";
import AdminDashboard from "./pages/AdminDashboard.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<div style={{padding:20}}>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Navigate } from "react-router-dom";

/*
  ProtectedRoute props:
    - requiredRole: "user" | "admin"
    - children: component to render
*/
export default function ProtectedRoute({ requiredRole, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    // redirect to their dashboard if role mismatch
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }
  return children;
}

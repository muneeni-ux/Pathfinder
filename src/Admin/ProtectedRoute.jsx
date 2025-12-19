import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // show friendly message and redirect to login
    toast.error("Please sign in to access the admin area");
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;

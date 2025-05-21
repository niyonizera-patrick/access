// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if a token exists in localStorage
  const token = localStorage.getItem("token");
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Otherwise render the protected component
  return children;
}

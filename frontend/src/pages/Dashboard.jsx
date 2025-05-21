// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Dashboard() {
  const navigate = useNavigate();

  // Handle logout: remove token and redirect
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome! You are logged in.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </Layout>
  );
}

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Layout from '../components/Layout';

export default function Login() {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        // Save JWT token in localStorage
        localStorage.setItem('token', data.token);
        // After login, go to dashboard
        navigate('/dashboard');
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <FormInput 
          label="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        {/* Password field */}
        <FormInput 
          label="Password" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        {/* Submit button */}
        <Button type="submit">Login</Button>
      </form>
      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
      </p>
    </Layout>
  );
}

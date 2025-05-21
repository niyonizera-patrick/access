// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Layout from '../components/Layout';

export default function Signup() {
  // State for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup data to backend
      const res = await fetch(' http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (res.ok) {
        // On success, navigate to login page
        navigate('/login');
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Username field */}
        <FormInput 
          label="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
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
        <Button type="submit">Create Account</Button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
      </p>
    </Layout>
  );
}

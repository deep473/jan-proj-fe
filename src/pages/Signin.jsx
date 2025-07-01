// src/pages/Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  // 1. State for each field
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // 2. Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();   // prevent page reload

    const data = { username, password };

    axios
      .post('http://localhost:8080/signIn', data)
      .then(res => {
        console.log('Sign in OK:', res.data);
        const role = res.data
        if (role === 'admin') {
          navigate('/admin_page')
        }
        if (role === 'customer') {
          navigate('/customer_page')
        }
      })
      .catch(err => {
        console.error('Signin failed:', err);
        alert('Error signing in – check console');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up below:</h2>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <br></br><br></br>
      
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br></br><br></br>
      
      <button type="submit">Sign IN</button>
    </form>
  );
}

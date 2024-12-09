import React, { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch(err) {
      setError(err.response?.data?.message || 'Error');
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Login</h1>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br />
        <button type="submit">Log In</button>
      </form>
      <a href="/forgot-password">Forgot password</a>
    </div>
  );
};

export default LoginPage;

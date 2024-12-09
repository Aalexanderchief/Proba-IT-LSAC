import React, { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        full_name, phone, email, password, confirm_password
      });
      if(res.status === 201) {
        navigate('/login');
      }
    } catch(err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Register</h1>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleRegister}>
        <input placeholder="Full Name" value={full_name} onChange={e=>setFullName(e.target.value)} /><br />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} /><br />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br />
        <input type="password" placeholder="Confirm Password" value={confirm_password} onChange={e=>setConfirmPassword(e.target.value)} /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;

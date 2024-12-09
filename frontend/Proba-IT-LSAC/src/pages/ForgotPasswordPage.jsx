import React, { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleForgot = async(e) => {
    e.preventDefault();
    try {
      const res = await API.post('/password/forgot', { email });
      setMsg(res.data.message);
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Forgot Password</h1>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleForgot}>
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

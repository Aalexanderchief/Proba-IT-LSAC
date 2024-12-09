import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#00214d', color: 'white', padding: '10px', display:'flex', gap:'10px' }}>
      <Link to="/" style={{ color:'white', textDecoration:'none' }}>Home</Link>
      <Link to="/recipes" style={{ color:'white', textDecoration:'none' }}>Recipes</Link>
      <Link to="/add-recipe" style={{ color:'white', textDecoration:'none' }}>Add Recipe</Link>
      {token ? (
        <>
          <Link to="/profile" style={{ color:'white', textDecoration:'none' }}>Profile</Link>
          <button onClick={logout} style={{ background:'red', color:'white', border:'none', cursor:'pointer' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color:'white', textDecoration:'none' }}>Login</Link>
          <Link to="/register" style={{ color:'white', textDecoration:'none' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

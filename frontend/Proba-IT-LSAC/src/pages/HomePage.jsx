import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    const fetchTop = async () => {
      const res = await API.get('/recipes/top');
      setTopRecipes(res.data);
    };
    fetchTop();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Top rated recipes</h1>
      <div style={{ display:'flex', gap:'20px', overflowX:'auto' }}>
        {topRecipes.map(r => (
          <div key={r._id} style={{ minWidth:'200px', border:'1px solid #ccc', padding:'10px' }}>
            <img src={r.image_url || 'https://placehold.co/200x200?text=Top+Recipe'} alt={r.name} style={{ width:'200px', height:'200px', objectFit:'cover' }}/>
            <h3>{r.name}</h3>
            <p>Rating: {r.rating.toFixed(1)}</p>
          </div>
        ))}
      </div>

      <h2>Contact us</h2>
      <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
        <input placeholder="First Name" /><br />
        <input placeholder="Last Name" /><br />
        <input placeholder="Email" /><br />
        <textarea placeholder="Message"></textarea><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchUser = async() => {
      try {
        const res = await API.get('/user/profile');
        setUser(res.data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchUser();
  },[]);

  if(!user) return <div><Navbar/><p>Loading...</p></div>;

  return (
    <div>
      <Navbar/>
      <h1>Profile</h1>
      <div style={{display:'flex', gap:'20px'}}>
        <div style={{border:'1px solid #ccc', padding:'10px'}}>
          <img src="https://placehold.co/200x200?text=Chef+Avatar" alt="avatar"/>
          <h3>{user.full_name}</h3>
        </div>
        <div style={{border:'1px solid #ccc', padding:'10px'}}>
          <p>E-mail: {user.email}</p>
          <p>Telephone: {user.phone || '-'}</p>
          <p>College group: (ex: P5-6) - pot fi date hardcodate sau adăugate la registrare</p>
        </div>
      </div>
      <button onClick={()=>navigate('/add-recipe')} style={{marginTop:'20px'}}>Add a recipe</button>
    </div>
  );
};

export default ProfilePage;

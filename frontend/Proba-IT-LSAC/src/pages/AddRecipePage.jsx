import React, { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdd = async(e) => {
    e.preventDefault();
    try {
      const res = await API.post('/recipes', { name, description, image_url });
      if(res.status === 201) {
        setMessage('Recipe added successfully');
        setTimeout(()=>navigate('/recipes'), 1500);
      }
    } catch(err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Add Recipe</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleAdd}>
        <input placeholder="Recipe name" value={name} onChange={e=>setName(e.target.value)} /><br/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></textarea><br/>
        <input placeholder="Image URL (optional)" value={image_url} onChange={e=>setImageUrl(e.target.value)}/><br/>
        <button type="submit">Add recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;

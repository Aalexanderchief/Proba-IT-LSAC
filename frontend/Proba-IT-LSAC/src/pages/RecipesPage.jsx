import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import RatingStars from '../components/RatingStars';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAll = async() => {
      const res = await API.get('/recipes');
      setRecipes(res.data);
    };
    fetchAll();
  }, []);

  const filtered = recipes.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterRating ? r.rating >= filterRating : true)
  );

  const sorted = [...filtered].sort((a,b) => {
    if(sortOption === 'top') return b.rating - a.rating;
    if(sortOption === 'worst') return a.rating - b.rating;
    if(sortOption === 'mostRated') return b.created_at.localeCompare(a.created_at);
    if(sortOption === 'leastRated') return a.created_at.localeCompare(b.created_at);
    return 0;
  });

  const handleRate = async(star) => {
    if(!selectedRecipe) return;
    try {
      const res = await API.post('/recipes/rate', { recipe_id: selectedRecipe._id, rating: star });
      alert(`Rated successfully. New rating: ${res.data.rating.toFixed(1)}`);
      const updated = await API.get('/recipes');
      setRecipes(updated.data);
      setSelectedRecipe(null);
    } catch(err) {
      alert('Error rating');
    }
  };

  const handleDelete = async(id) => {
    if(!window.confirm('Delete this recipe?')) return;
    try {
      await API.delete(`/recipes/${id}`);
      const updated = await API.get('/recipes');
      setRecipes(updated.data);
    } catch(err) {
      alert('Error deleting');
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>All Recipes</h1>
      <input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} />
      <br/>
      <label>Filter by rating {'>'}=</label>
      <select onChange={e=>setFilterRating(e.target.value ? Number(e.target.value) : null)}>
        <option value="">No filter</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
      <label>Sort:</label>
      <select onChange={e=>setSortOption(e.target.value)}>
        <option value="">None</option>
        <option value="top">Top rated</option>
        <option value="worst">Worst rated</option>
        <option value="mostRated">Most recent (by date)</option>
        <option value="leastRated">Oldest (by date)</option>
      </select>

      <div style={{display:'flex', flexWrap:'wrap', gap:'20px', marginTop:'20px'}}>
        {sorted.map(r => (
          <div key={r._id} style={{ position:'relative' }}>
            <RecipeCard recipe={r}/>
            {token && (
              <div style={{display:'flex', gap:'5px', marginTop:'5px'}}>
                <button onClick={()=>setSelectedRecipe(r)}>Rate</button>
                <button onClick={()=>handleDelete(r._id)}>Delete (if owner)</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'#fff', border:'1px solid #ccc', padding:'20px'}}>
          <h3>{selectedRecipe.name}</h3>
          <img src={selectedRecipe.image_url || 'https://placehold.co/200x200'} alt={selectedRecipe.name} style={{width:'200px', height:'200px'}}/>
          <p>{selectedRecipe.description}</p>
          <p>Current rating: {selectedRecipe.rating.toFixed(1)}</p>
          <h4>Rate this recipe</h4>
          <RatingStars currentRating={0} onRate={handleRate}/>
          <button onClick={()=>setSelectedRecipe(null)} style={{marginTop:'10px'}}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;

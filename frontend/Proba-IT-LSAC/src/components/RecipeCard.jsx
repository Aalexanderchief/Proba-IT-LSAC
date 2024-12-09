import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div style={{ border:'1px solid #ccc', padding:'10px', width:'200px' }}>
      <img src={recipe.image_url || 'https://placehold.co/200x200?text=Recipe'} alt={recipe.name} style={{ width:'200px', height:'200px', objectFit:'cover' }}/>
      <h4>{recipe.name}</h4>
      <p>Rating: {recipe.rating.toFixed(1)}</p>
      <p>Author: (Not shown fully, would need user fetch)</p>
    </div>
  );
};

export default RecipeCard;

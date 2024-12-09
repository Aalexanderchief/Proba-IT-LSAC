import React, { useState } from 'react';

const RatingStars = ({ currentRating, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{display:'flex', gap:'5px'}}>
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          style={{cursor:'pointer', color: (hover >= star || currentRating >= star) ? 'gold' : '#ccc', fontSize:'20px'}}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRate(star)}
        >★</span>
      ))}
    </div>
  );
};

export default RatingStars;

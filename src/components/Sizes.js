import React from 'react';
import pizza from '../images/pizza.png';

export default ({
  sizes,
  selectedSize,
  onSizeClick,
}) => (
  <div className="sizes">
    {sizes.map(size => {
      const { name, inches } = size;

      return (
        <div 
          key={name} 
          className={`size ${selectedSize && selectedSize.name === name  ? 'active' : ''}`}
          onClick={() => onSizeClick(size)}
        >
          <img src={pizza} className={`pizza ${name}`} />
          <span>{`${name} (${inches}')`}</span>
        </div>
      );
    })}
  </div>
);

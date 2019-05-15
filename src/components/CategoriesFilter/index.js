import React from 'react';

import './style.css';

const CategoriesFilter = ({ category, onChange }) => (
  <div className='category-container'>
    <h6>Filter by category</h6>
    <div className="category-actions">
      <button
        className={category === 'eyeshadow' ? 'active' : ''}
        onClick={() => onChange('eyeshadow')}
      >
        Eyeshadow
      </button>
      <button
        className={category === 'concealer' ? 'active' : ''}
        onClick={() => onChange('concealer')}
      >
        Concealer
      </button>
      <button
        className={category === 'foundation' ? 'active' : ''}
        onClick={() => onChange('foundation')}
      >
        Foundation
      </button>
      <button
        className={category === 'lipstick' ? 'active' : ''}
        onClick={() => onChange('lipstick')}
      >
        Lipstick
      </button>
      <button
        className={category === 'blush' ? 'active' : ''}
        onClick={() => onChange('blush')}
      >
        Blush
      </button>
    </div>
  </div>
);


export default CategoriesFilter;

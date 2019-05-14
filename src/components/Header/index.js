import React from 'react';

import './style.css';

const Header = ({ likes }) => (
  <header>
    <div className="container">
      <h1>Beauty Swipe</h1>
      <div className="like-container">
        You liked {likes} {likes > 1 ? 'products' : 'product'}.
      </div>
    </div>
  </header>
);

export default Header

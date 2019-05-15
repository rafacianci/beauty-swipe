import React from 'react';

import LikeSvg from '../../assets/like.svg';

import './style.css';

const Header = ({ likes, dislikes }) => (
  <header>
    <h1>Beauty Swipe</h1>
    <div className="likes-container">
      <div className="dislike-container">
        <img src={LikeSvg} alt="Dislike" className="dislike" />
        <span className="arrow" />
        <span>{dislikes}</span>
      </div>
      <div className="like-container">
        <img src={LikeSvg} alt="Like" className="like" />
        <span className="arrow" />
        <span>{likes}</span>
      </div>
    </div>
  </header>
);

export default Header

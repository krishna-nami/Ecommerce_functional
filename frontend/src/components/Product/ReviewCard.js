import React from 'react';

import Rating from 'react-rating-stars-component';
import profilePng from '../../images/Profile.png';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.2)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 12 : 15,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

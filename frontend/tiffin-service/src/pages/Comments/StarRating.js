import React from "react";

const StarRating = ({ rating, onRate }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starIcon = i <= rating ? "★" : "☆";
    stars.push(
      <span
        key={i}
        className="star-icon"
        onClick={() => onRate(i)}
      >
        {starIcon}
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;

import React from "react";
import { AiFillStar } from "react-icons/ai";
import { ImStarHalf } from "react-icons/im";

const Rating = ({ userRating, outOfwhich, color }) => {
  return (
    <div>
      {userRating >= 1 ? (
        <AiFillStar style={{ color }} />
      ) : (
        <ImStarHalf style={{ color }} />
      )}
      {userRating >= 2 ? (
        <AiFillStar style={{ color }} />
      ) : (
        <ImStarHalf style={{ color }} />
      )}
      {userRating >= 3 ? (
        <AiFillStar style={{ color }} />
      ) : (
        <ImStarHalf style={{ color }} />
      )}
      {userRating >= 4 ? (
        <AiFillStar style={{ color }} />
      ) : (
        <ImStarHalf style={{ color }} />
      )}
      {userRating >= 5 ? (
        <AiFillStar style={{ color }} />
      ) : (
        <ImStarHalf style={{ color }} />
      )}
      <span>{outOfwhich && outOfwhich}</span>
    </div>
  );
};

export default Rating;

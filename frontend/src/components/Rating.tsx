import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating: React.FC<{ value: number; text: string }> = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        <i>
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </i>
      </span>

      <span>
        <i>
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </i>
      </span>

      <span>
        <i>
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </i>
      </span>

      <span>
        <i>
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </i>
      </span>

      <span>
        <i>
          {value >= 5 ? (
            <FaStar />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </i>
      </span>

      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;

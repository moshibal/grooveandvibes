import React from "react";
import "./Card.css";

const Card = ({ price }) => {
  return (
    <div className="cardContainer">
      <div className="imageDiv">
        <img src={price.imageUrl} alt={price.name}></img>
      </div>
      <div className="cardTextContain">
        <h2>{price.name}</h2>
        {price.casual && <p>${price.casual} for a casual class</p>}
        {price.oneDay && <p>${price.oneDay} for a day</p>}
        {price.fiveClasses && <p>${price.fiveClasses} for 5 Classes</p>}
        {price.tenClasses && <p>${price.tenClasses} for 10 Classes</p>}
        {price.twentyClasses && <p>${price.twentyClasses} for 20 Classes</p>}
      </div>
    </div>
  );
};

export default Card;

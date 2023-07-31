import React from "react";
import Card from "./Card";
import "./Price.css";
import { priceList } from "./pricelist";

const Price = () => {
  return (
    <div className="priceContainer">
      <h2>Check all our prices</h2>
      <div className="priceCardContainer">
        {priceList.map((price) => (
          <Card price={price} key={price.name} />
        ))}
      </div>
      <p className="price-warning">
        Prices may vary all the time, Please contact us to know the latest
        price.
      </p>
    </div>
  );
};

export default Price;

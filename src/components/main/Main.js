import React from "react";
import "./Main.css";
import Carousel from "./Carousel";

const Main = () => {
  return (
    <>
      <div className="mainDiv">
        <h1 className="pt-5 pb-3">
          Let your body feel the beat and express your soul - Groove&Vibe Dance
          School.
        </h1>
        <Carousel />
      </div>
    </>
  );
};

export default Main;

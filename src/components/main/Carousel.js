import React from "react";
import "./Main.css";

const Carousel = () => {
  return (
    <div className="container-fluid">
      <div id="carouselExampleDark" className="carousel carousel-black slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="imgContainer">
              <img
                src="/images/carosol1.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className="imgContainer">
              <img src="/images/carosol2.png" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="imgContainer">
              <img
                src="/images/carosol3.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;

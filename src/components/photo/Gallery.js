import React from "react";
import "./Gallery.css";

const Gallery = () => {
  return (
    <div className="galleryContainer">
      <h2 className="galleryHeading">Photo Gallery 2023</h2>
      <p>
        We believe that dance is not just about following steps but about
        connecting with the music and letting it move you. Our experienced
        instructors are passionate about helping students develop their skills
        and confidence, while also fostering a sense of community and support.
        Whether you're a beginner or an experienced dancer, we welcome you to
        join us and discover the joy of dance at Groove&Vibe.
      </p>
      <div className="project-grid">
        <div className="project" id="eth">
          <img src="/images/carosol1.png" alt="" />
        </div>
        <div className="project" id="alphabet">
          <img src="/images/carosol2.png" alt="" />
        </div>
        <div className="project" id="traveler">
          <img src="/images/carosol3.png" alt="" />
        </div>
        <div className="project" id="cube">
          <img src="/images/adult.png" alt="" />
        </div>
        <div className="project" id="astro">
          <img src="/images/children.png" alt="" />
        </div>
        <div className="project" id="cup">
          <img src="/images/govinda.png" alt="" />
        </div>
        <div className="project" id="insta">
          <img src="/images/group2.png" alt="" />
        </div>
        <div className="project" id="foam">
          <img src="/images/group.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;

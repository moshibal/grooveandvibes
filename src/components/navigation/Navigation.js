import React from "react";
import "./Navigation.css";
import { toggleHamburger } from "./index.js";

const Navigation = () => {
  return (
    <>
      <header className="nav-bar">
        <div className="left">
          <img src="/images/logo.png" alt="logo"></img>
        </div>
        <div className="right">
          <a href="#booking">Booking</a>
          <a href="tel:0433756731">Contact Us</a>
          <a href="#dribble">
            <img src="/images/tiktok.png" alt="tiktok" />
          </a>
          <a href="#insta">
            <img src="/images/insta_icon.png" alt="insta" />
          </a>
        </div>
        <div className="hamburger" onClick={toggleHamburger}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </header>
      <nav className="mobileNav">
        <a href="tel:0433756731">Contact Us</a>
        <a href="#booking">Booking</a>
        <a href="#dribble">
          <img src="/images/tiktok.png" alt="drible" />
        </a>
        <a href="#insta">
          <img src="/images/insta_icon.png" alt="insta" />
        </a>
      </nav>
    </>
  );
};

export default Navigation;

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="imageContainer">
        <img
          src="/images/logo-big.png
        "
          alt="footer logo"
        ></img>
      </div>
      <div className="footerFlexContainer">
        <div className="footerLine">
          <div className="footerFirstContainer">
            <ul>
              <li>
                <a href="a">Instagram</a>
              </li>
              <li>
                <a href="tel:0433756731">Contact Us</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/policy">Privacy</a>
              </li>
              <li>
                <a href="https://www.google.com/maps/place/101%2F491+Princes+Hwy,+Rockdale+NSW+2216/@-33.9520328,151.1349949,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ba002d668473:0x70ddf61ad466dfae!8m2!3d-33.9520328!4d151.1375752">
                  Location
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerSecondContainer">
          <h5>
            "Thank you for visiting our website!. If you have any questions or
            feedback, please don't hesitate to contact us. Don't forget to
            follow us on social media to stay up-to-date with our latest news
            and updates. "
          </h5>
        </div>
      </div>
      <div>
        <p className="location">101/491 princes highway, Rockdale NSW</p>

        <div className="copyright">
          <span>copyright</span>
          <span>{new Date().getFullYear()}</span>
          <span>Grove & Vibe</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

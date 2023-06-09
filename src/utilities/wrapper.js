import React from "react";
import { Link } from "react-router-dom";
import "./Wrapper.css";
const Wrapper = (props) => {
  return (
    <>
      <header className="nav-bar">
        <div className="left">
          <Link to="/">
            <img src="/images/logo.png" alt="logo"></img>
          </Link>
        </div>
      </header>
      <div className="childrenDiv">{props.children}</div>

      <div>
        <div className="copyright">
          <span>copyright</span>
          <span>{new Date().getFullYear()}</span>
          <span>Grove & Vibe</span>
        </div>
      </div>
    </>
  );
};

export default Wrapper;

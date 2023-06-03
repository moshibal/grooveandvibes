import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { toggleHamburger } from "./index.js";
import { useSelector } from "react-redux";

const Navigation = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    if (selectedOption === "register") {
      // Logic for navigating to the Register page
      navigate("/registration");
    } else if (selectedOption === "bookingList") {
      // Logic for navigating to the Booking List page
      navigate("/bookings");
    } else if (selectedOption === "studentList") {
      // Logic for navigating to the Student List page
      navigate("/studentList");
    }
  }, [navigate, selectedOption]);

  return (
    <>
      <header className="nav-bar">
        <div className="left">
          <img src="/images/logo.png" alt="logo"></img>
        </div>
        <div className="right">
          <Link href="#booking">Booking</Link>
          <Link href="tel:0433756731">Contact</Link>
          {userInfo?.data?.email === "manial@gmail.com" ? (
            <select
              className="nav-dropdown"
              value={selectedOption}
              onChange={handleSelectOption}
            >
              <option value="">Select an option</option>
              <option value="register">Register</option>
              <option value="bookingList">Booking-List</option>
              <option value="studentList">Student-List</option>
            </select>
          ) : (
            <Link to="/login">Admin</Link>
          )}
          <Link
            href="https://www.tiktok.com/@grooveandvibes"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/tiktok.png" alt="tiktok" />
          </Link>
          <Link
            href="https://www.instagram.com/groove_and_vibes/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/insta_icon.png" alt="instagram" />
          </Link>
        </div>
        <div className="hamburger" onClick={toggleHamburger}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </header>
      <nav className="mobileNav">
        <Link href="tel:0433756731">Contact</Link>
        <Link href="#booking">Booking</Link>
        <Link to="/login">Admin</Link>
        <Link
          href="https://www.tiktok.com/@grooveandvibes"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/tiktok.png" alt="tiktok" />
        </Link>
        <Link
          href="https://www.instagram.com/groove_and_vibes/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/insta_icon.png" alt="instagram" />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;

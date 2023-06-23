import React, { useState, useEffect } from "react";
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
      navigate("/bookingList");
    } else if (selectedOption === "studentList") {
      // Logic for navigating to the Student List page
      navigate("/studentList");
    }
  }, [navigate, selectedOption]);
  //handelers
  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
        duration: 3000,
      });
    }
  };
  return (
    <>
      <header className="nav-bar">
        <div className="left">
          <img src="/images/logo.png" alt="logo"></img>
        </div>
        <div className="right">
          <Link to="#" onClick={handleScrollToBooking}>
            Booking
          </Link>
          <a href="tel:0433756731">Contact</a>
          {userInfo?.data?.isAdmin ? (
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
            to="https://www.tiktok.com/@grooveandvibes"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/tiktok.png" alt="tiktok" />
          </Link>
          <Link
            to="https://www.instagram.com/groove_and_vibes/"
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
        <a href="tel:0433756731">Contact</a>
        <Link to="#" onClick={handleScrollToBooking}>
          Booking
        </Link>
        {userInfo?.data?.isAdmin ? (
          <select
            className="nav-dropdown"
            value={selectedOption}
            onChange={handleSelectOption}
          >
            <option value="">Go To</option>
            <option value="register">Register</option>
            <option value="bookingList">Bookings</option>
            <option value="studentList">Students</option>
          </select>
        ) : (
          <Link to="/login">Admin</Link>
        )}
        <Link
          to="https://www.tiktok.com/@grooveandvibes"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/tiktok.png" alt="tiktok" />
        </Link>
        <Link
          to="https://www.instagram.com/groove_and_vibes/"
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

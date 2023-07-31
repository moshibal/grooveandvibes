import React, { useEffect, useState } from "react";

import Loader from "../../utilities/Loader";
import useHttp from "../../hooks/useHttp";
import "./Booking.css";
const minDate = new Date().toISOString().split("T")[0];
const Booking = () => {
  const { isLoading, error, sendHttp, setError } = useHttp();
  const [response, setResponse] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMassage] = useState("");
  const [date, setDate] = useState(new Date());
  const [formError, setFormError] = useState({});
  //cleaning the component after the response message
  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(null);
      }
      if (response) {
        setResponse(null);
      }
    }, 3000);
  }, [response, error, setError]);
  const bookingHandler = async (e) => {
    e.preventDefault();
    // Perform input validation checks
    const errors = {};
    if (!name) {
      errors.name = "Full Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number is invalid";
    }
    if (!date) {
      errors.date = "Date is required";
    }

    if (Object.keys(errors).length === 0) {
      // If there are no errors, submit the form
      const hourlyDate = new Date().toISOString().split("T")[1];
      const bookingObject = {
        name,
        email,
        phone,
        date: `${date}T${hourlyDate}`,
        message,
      };

      const response = await sendHttp({
        url: "https://darwich.onrender.com/api/bookings",
        body: bookingObject,
      });

      setResponse(response.data.message);
      setName("");
      setDate("");
      setEmail("");
      setMassage("");
      setPhone("");
      setFormError({});
    } else {
      // If there are errors, display them
      setFormError(errors);
    }
  };
  //date handler
  const dateHandler = (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6

    // Check if the selected day is either Thursday (4) or Saturday (6)
    if (dayOfWeek === 4 || dayOfWeek === 6) {
      setDate(e.target.value);
    } else {
      // If the selected day is not Thursday or Saturday, reset the date to an empty string
      setDate("");
      alert("Please choose either Thursday or Saturday for the trial class.");
    }
  };

  return (
    <>
      <form id="booking">
        <h2>Make A Booking For Next Available Class</h2>
        {error && <p className="error">{error}</p>}
        {response && <p className="success">{response}</p>}
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="input"
            id="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formError.name && <span className="error">{formError.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formError.email && <span className="error">{formError.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="input"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          {formError.phone && <span className="error">{formError.phone}</span>}
        </div>
        <div>
          <label htmlFor="date">Choose Date</label>
          <input
            min={minDate}
            type="date"
            id="date"
            value={date}
            onChange={dateHandler}
          />
          {formError.date && <span className="error">{formError.date}</span>}
        </div>
        <div>
          <label>Add message</label>
          <textarea
            value={message}
            onChange={(e) => {
              setMassage(e.target.value);
            }}
          ></textarea>
        </div>

        <button type="submit" className="form-button" onClick={bookingHandler}>
          Book a Trial
        </button>
        {isLoading && <Loader />}
      </form>
    </>
  );
};

export default Booking;

import React, { useEffect, useState } from "react";
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
    }, 5000);
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
    } else {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        errors.date = "Selected date is in the past";
      }
    }

    if (Object.keys(errors).length === 0) {
      // If there are no errors, submit the form

      const bookingObject = {
        name,
        email,
        phone,
        date,
        message,
      };

      const response = await sendHttp({
        url: "https://api.darwichmeats.com/api/bookings",
        // url: "http://localhost:4000/api/bookings",
        body: bookingObject,
      });
      setResponse(response.data.message);
      setName("");
      setDate("");
      setEmail("");
      setMassage("");
      setPhone("");
    } else {
      // If there are errors, display them
      setFormError(errors);
    }
  };
  return (
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
          onChange={(e) => {
            setDate(e.target.value);
          }}
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
      {isLoading && <p>Loading...</p>}
    </form>
  );
};

export default Booking;

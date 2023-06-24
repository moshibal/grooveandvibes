import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/registerSlice";
import { registerSuccess, registerFail } from "../../store/registerSlice";
import "../login/Login.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //component state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [errors, setErrors] = useState({});

  //global state
  const { success: registrationSucess, error: registrationError } = useSelector(
    (state) => state.register
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic with form data

    const isValidEmail = (email) => {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const errors = {};
    if (!fullName) {
      errors.fullName = "Please enter your full name";
    }
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!phone) {
      errors.phone = "Please enter your phone number";
    }
    if (!selectedClass) {
      errors.selectedClass = "please select the available class group";
    }
    if (!selectedGroup) {
      errors.selectedClass = "please select the group";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const registrationObj = {
      name: fullName,
      email,
      phone,
      address,
      selectedClass,
      selectedGroup,
    };

    dispatch(register(registrationObj));
    // Reset form fields
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSelectedClass("");
    setSelectedGroup("");
  };
  useEffect(() => {
    let timeoutId;
    if (registrationSucess) {
      timeoutId = setTimeout(() => {
        dispatch(registerSuccess(false));
        dispatch(registerFail(""));
        navigate("/studentList");
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [registrationSucess, navigate, dispatch]);
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-div">
        {registrationSucess && (
          <p className="success">Successfully registered new student.</p>
        )}
        {registrationError && <p className="error">{registrationError}</p>}
        <h2>Registration Form</h2>
        <div className="control-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="control-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="control-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="control-group">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="Optional"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
            className="nav-dropdown"
          >
            <option value="">Select classes</option>
            <option value="5 class">5 class</option>
            <option value="10 class">10 class</option>
            <option value="20 class">20 class</option>
          </select>
          {errors.selectedClass && (
            <p className="error">{errors.selectedClass}</p>
          )}
        </div>
        <div className="control-group">
          <label htmlFor="group">Group:</label>
          <select
            id="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            required
            className="nav-dropdown"
          >
            <option value="">Select group</option>
            <option value="kid">Kids</option>
            <option value="adult">Adults</option>
          </select>
          {errors.selectedGroup && (
            <p className="error">{errors.selectedGroup}</p>
          )}
        </div>
        <button type="submit" className="formButton">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;

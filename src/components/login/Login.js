import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../utilities/Message";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, message } = useSelector((state) => state.login);
  useEffect(() => {
    if (userInfo && userInfo?.data) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const loginHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && email.includes("@")) {
      dispatch(login(email, password));
    } else {
      setEmailCheck("Please type correct email address.");
    }
  };
  return (
    <form className="form">
      <div className="form-div">
        <h2>Admin Login Only.</h2>

        {message && <Message variant="danger">{message}</Message>}
        <div className="control-group">
          <label htmlFor="email">Email Address</label>
          <input
            autoFocus
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailCheck && <p>{emailCheck}</p>}
        </div>
        <div className="control-group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="formButton" onClick={loginHandler}>
          Log In
        </button>
      </div>
    </form>
  );
}

export default Form;

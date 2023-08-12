import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../utilities/Message";
import Loader from "../../utilities/Loader";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //global state
  const { userInfo, errorLoginMessage, loading } = useSelector(
    (state) => state.login
  );
  //effects
  useEffect(() => {
    let timeoutId = null;
    if (userInfo && userInfo?.data) {
      timeoutId = setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate, userInfo]);

  //login handeler
  const loginHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && email.includes("@")) {
      dispatch(login(email, password));
    } else {
      setEmailCheck("Please type correct email address.");
      setEmail("");
      setPassword("");
    }
  };
  //toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form">
      <div className="form-div">
        <h2>Admin Login Only.</h2>

        {errorLoginMessage && (
          <Message variant="error">{errorLoginMessage}</Message>
        )}
        {userInfo?.data && (
          <Message variant="success">
            <p>Successfully, Loged In</p>
          </Message>
        )}
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
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
            onClick={togglePassword}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <button className="formButton" onClick={loginHandler}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;

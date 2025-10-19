import React, { useState } from "react";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
// import { logIn, signUp } from "../../../actions/AuthActions";
import { logIn, signUp } from "../../actions/AuthActions";
import "./Auth.css";
import { useEffect } from "react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmpassword, setConfirmPassword] = useState(true);
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPassword(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={logo} alt="" />
        <div className="Webname">
          <h1>My Socially</h1>
          <h6>Explore the ideas throughout the world </h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log in"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="User Name"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmpassword ? "none" : "block",
              color: "red",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                resetForm();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account, Sign up!"}{" "}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

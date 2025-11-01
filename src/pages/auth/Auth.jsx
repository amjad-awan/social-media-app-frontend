import React, { useState, useEffect } from "react";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthActions";
import "./Auth.css";
import { useNavigate } from "react-router-dom"; // 🟢 Add navigation for forgot password

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmpassword, setConfirmPassword] = useState(true);
  const [localError, setLocalError] = useState(null); // 🟢 Local error for UX

  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🟢 Use navigate for redirect

  const { loading, error } = useSelector((state) => state.authReducer);
console.log('localError ',localError,error)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setLocalError(null); // 🟢 Clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    if (isSignUp) {
      if (data.password !== data.confirmpass) {
        setConfirmPassword(false);
        return;
      }
      dispatch(signUp(data));
    } else {
      if (!data.username || !data.password) {
        setLocalError("Please enter username and password");
        return;
      }
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPassword(true);
    setLocalError(null);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  // 🟢 Clear errors when switching between login/signup
  useEffect(() => {
    setLocalError(null);
  }, [isSignUp]);

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={logo} alt="Logo" />
        <div className="Webname">
          <h1>My Socially</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
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
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
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
              required
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
              required
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
                required
              />
            )}
          </div>

          {/* 🟢 Confirm password mismatch */}
          {!confirmpassword && (
            <span
              style={{
                color: "red",
                alignSelf: "flex-end",
                marginRight: "5px",
                fontSize: "13px",
              }}
            >
              * Confirm password is not same
            </span>
          )}

          {/* 🟢 Show backend or local error */}
          {(error || localError) && (
            <span
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "8px",
                display: "block",
                textAlign: "center",
              }}
            >
              ⚠️ {error || localError}
            </span>
          )}

          {/* 🟢 Forgot Password (only for login mode) */}
          {!isSignUp && (
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                color: "var(--orange)",
                textAlign: "right",
                width: "100%",
                marginTop: "8px",
                display: "inline-block",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          )}

          {/* Switch link */}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                marginTop: "10px",
                display: "inline-block",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp
                ? "Already have an account? Login!"
                : "Don't have an account? Sign up!"}
            </span>
          </div>

          {/* Submit Button */}
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

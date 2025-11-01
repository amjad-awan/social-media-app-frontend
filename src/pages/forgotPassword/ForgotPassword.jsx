import React, { useState } from "react";
import "./ForgotPassword.css";
import logo from "../../img/logo.png";
import { API } from "../../api/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Send POST request to backend
      const res = await API.post("/auth/forgot-password", {
        username: email,
      });

      // ✅ Handle success response
      if (res.status === 200) {
        setMessage("✅ Password reset link has been sent to your email.");
      } else {
        setMessage(`❌ ${res.data.message || "Failed to send reset email."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(
        `⚠️ ${err.response?.data?.message || "Something went wrong. Try again later."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-box">
        <img src={logo} alt="logo" className="forgot-logo" />
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive a reset link</p>

        <form onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <div className="forgot-message">{message}</div>}

        <a href="/auth" className="forgot-back">
          ← Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;

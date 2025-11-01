import React, { useState } from "react";
import "./resetPassword.css";
import logo from "../../img/logo.png";
import { API } from "../../api/API";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Extract token from URL (/reset-password/:token)
  const token = window.location.pathname.split("/").pop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setExpired(false);

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong";
      setMessage(`⚠️ ${errMsg}`);

      // If backend says token is invalid or expired
      if (errMsg.toLowerCase().includes("expired")) {
        setExpired(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-box">
        <img src={logo} alt="logo" className="reset-logo" />
        <h2>Reset Password</h2>
        <p>Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {message && <p className="message-reset">{message=='⚠️ jwt expired'?'Token expired':message}</p>}

          {!expired ? (
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          ) : (
            <a href="/forgot-password" className="expired-link">
              Request new reset link →
            </a>
          )}
        </form>

        <a href="/auth" className="back-link">
          ← Back to Login
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;

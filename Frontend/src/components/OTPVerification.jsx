// components/OTPVerification.jsx
import React, { useState } from "react";

export default function OTPVerification({ aadhaarNumber, onVerified }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

      onVerified();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Enter OTP sent to your registered mobile/email</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        className="border p-2 rounded w-full mb-2"
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        disabled={loading || otp.length !== 6}
        onClick={verifyOtp}
        className="bg-indigo-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}

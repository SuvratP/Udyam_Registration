import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import aadhaarSchema from "./Adhar_verification.json";
import panSchema from "./PAN_Verification.json";
import DynamicForm from "./components/DynamicForm";
import OTPVerification from "./components/OTPVerification";

const backendBaseURL = "https://udyam-backend-sw8y.onrender.com/api";

export default function App() {
  const [step, setStep] = useState(1);
  const [aadhaarData, setAadhaarData] = useState({});
  const [panData, setPanData] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(null);
  const [aadhaarErrors, setAadhaarErrors] = useState({});
  const [panErrors, setPanErrors] = useState({});

  const handleAadhaarSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendBaseURL}/aadhaar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: data.aadhaar_number,
          applicantName: data.entrepreneur_name,
        }),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Failed to submit Aadhaar");

      toast.success(resData.message);
      setAadhaarData(data);
      setOtpSent(resData.otp); // Save OTP for testing
      setStep(1.5);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onOtpVerified = () => {
    toast.success("OTP Verified!");
    setStep(2);
  };

  const handlePanSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendBaseURL}/pan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: aadhaarData.aadhaar_number,
          panNumber: data.pan_number,
          organisation_type: data.organisation_type,
          pan_holder_name: data.pan_holder_name,
          dob_doi: data.dob_doi,
          pan_consent: data.pan_consent,
        }),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Failed to submit PAN");

      toast.success(resData.message);
      setPanData(data);
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Udyam Registration</h1>

        <div className="flex justify-center mb-8 space-x-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step === s ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-300 text-gray-500"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <DynamicForm
            schema={aadhaarSchema}
            formData={aadhaarData}
            setFormData={setAadhaarData}
            errors={aadhaarErrors}
            setErrors={setAadhaarErrors}
            onSubmit={handleAadhaarSubmit}
            loading={loading}
          />
        )}

        {step === 1.5 && (
          <>
            <OTPVerification aadhaarNumber={aadhaarData.aadhaar_number} onVerified={onOtpVerified} />
            <p className="mt-4 text-center text-gray-500">
              <small>For testing, OTP is: {otpSent}</small>
            </p>
          </>
        )}

        {step === 2 && (
          <DynamicForm
            schema={panSchema}
            formData={panData}
            setFormData={setPanData}
            errors={panErrors}
            setErrors={setPanErrors}
            onSubmit={handlePanSubmit}
            loading={loading}
          />
        )}

        {step === 3 && (
          <div className="bg-green-100 p-6 rounded text-green-700 text-center">
            <h2 className="text-xl font-semibold mb-2">Registration Completed!</h2>
            <p>Thank you for registering your Udyam account.</p>
          </div>
        )}
      </div>
    </div>
  );
}

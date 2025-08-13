import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  panNumber: { type: String },

  // New fields for OTP verification
  otp: { type: String },              // Store current OTP
  otpExpiry: { type: Date },          // OTP expiration timestamp

  organisation_type: { type: String },    // optional, if you want to store PAN form data
  pan_holder_name: { type: String },
  dob_doi: { type: Date },
  pan_consent: { type: Boolean },
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);

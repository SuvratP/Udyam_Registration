import express from "express";
import Registration from "../models/Registration.js";
import { validateAadhaar, validatePAN } from "../validation/validators.js";

const router = express.Router();

// Helper: generate 6-digit OTP as string
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/aadhaar", async (req, res) => {
  try {
    const { aadhaarNumber, applicantName } = req.body;

    if (!validateAadhaar(aadhaarNumber)) {
      return res.status(400).json({ error: "Invalid Aadhaar number" });
    }

    // Check if Aadhaar already exists (optional)
    const existing = await Registration.findOne({ aadhaarNumber });
    if (existing) {
      // Overwrite OTP and expiry or handle as per your logic
      existing.otp = generateOtp();
      existing.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
      await existing.save();
      return res.json({ message: "OTP resent.", otp: existing.otp });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const newEntry = new Registration({ aadhaarNumber, applicantName, otp, otpExpiry });
    await newEntry.save();

    // TODO: send OTP via SMS/email here in production

    res.json({ message: "Aadhaar saved. OTP sent.", otp });
  } catch (err) {
    console.error("Error in /aadhaar:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { aadhaarNumber, otp } = req.body;

    const entry = await Registration.findOne({ aadhaarNumber });
    if (!entry) return res.status(404).json({ error: "Aadhaar not found" });

    if (!entry.otp || !entry.otpExpiry) {
      return res.status(400).json({ error: "No OTP pending verification" });
    }

    if (entry.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

    if (new Date() > entry.otpExpiry) return res.status(400).json({ error: "OTP expired" });

    // OTP is valid - clear otp fields
    entry.otp = null;
    entry.otpExpiry = null;
    await entry.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error in /verify-otp:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/pan", async (req, res) => {
  try {
    const { aadhaarNumber, panNumber, organisation_type, pan_holder_name, dob_doi, pan_consent } = req.body;

    if (!validatePAN(panNumber)) {
      return res.status(400).json({ error: "Invalid PAN number" });
    }

    const entry = await Registration.findOne({ aadhaarNumber });
    if (!entry) return res.status(404).json({ error: "Aadhaar not found" });

    if (entry.otp) return res.status(400).json({ error: "OTP verification pending" });

    entry.panNumber = panNumber;
    entry.organisation_type = organisation_type;
    entry.pan_holder_name = pan_holder_name;
    entry.dob_doi = dob_doi;
    entry.pan_consent = pan_consent;

    await entry.save();

    res.json({ message: "PAN saved successfully", entry });
  } catch (err) {
    console.error("Error in /pan:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

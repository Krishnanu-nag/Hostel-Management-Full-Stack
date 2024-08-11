const mongoose = require("mongoose");

// Define the OTP schema
const otpSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // OTP expires after 2 minutes
  },
});

const OtpStoreModel = mongoose.model("OtpStore", otpSchema);
module.exports = OtpStoreModel;

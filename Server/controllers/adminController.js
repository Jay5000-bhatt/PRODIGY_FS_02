const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const otpStore = {};

const sendEmail = async ({ to, subject, text }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"Admin Registration" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    const otp = generateOtp();
    otpStore[email] = otp;

    try {
      await sendEmail({
        to: admin.email,
        subject: "Verify your email",
        text: `Your OTP is ${otp}`,
      });
      res.status(201).json({
        message: "OTP sent to registered email for verification",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Error sending OTP email");
    }
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received");
  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    console.log("Admin found:", admin);

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (isPasswordMatch) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isVerified: admin.isVerified,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Verify admin OTP
// @route   POST /api/admin/verify
// @access  Public
const verifyAdmin = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  console.log("Received OTP type:", typeof otp);
  console.log("Received OTP value:", otp);

  // Check if the email exists in the database
  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  // Check if OTP is available in otpStore
  const storedOtp = otpStore[email];

  console.log("Stored OTP type:", typeof storedOtp);
  console.log("Stored OTP value:", storedOtp);

  if (!storedOtp) {
    res.status(400);
    throw new Error("OTP not found or expired");
  }

  // Compare OTPs as strings
  if (otp !== storedOtp) {
    res.status(400);
    throw new Error("Incorrect OTP");
  }

  // Update admin verification status
  admin.isVerified = true;
  await admin.save();

  // Remove OTP after successful verification
  delete otpStore[email];

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    isVerified: admin.isVerified,
    token: generateToken(admin._id),
  });
});




module.exports = {
  registerAdmin,
  authAdmin,
  verifyAdmin,
};

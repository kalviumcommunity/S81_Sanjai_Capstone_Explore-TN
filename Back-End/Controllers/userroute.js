const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middelware/catchAsyncError");
const router = express.Router();

// Signup Route
router.post("/signup", catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

 
  console.log('Signup request body:', req.body);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  // Log user creation success
  console.log('New user created:', newUser);

  res.status(201).json({ message: "User registered successfully" });
}));

router.post("/login", catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }   

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
}));

router.delete("/user/:id", catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
}));

module.exports = router;
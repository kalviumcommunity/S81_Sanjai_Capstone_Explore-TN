const express = require("express");

const bcrypt=require("bcrypt")
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middelware/catchAsyncError");
const router = express.Router();
const jwt=require("jsonwebtoken")
const {sendMail}=require("../utils/mail")
const { isAuthenticatedUser } = require("../middelware/authMiddleware");


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

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  await sendMail({
    email: user.email,
    subject: "Login Notification From  - ExploreTN",
    message: `We are welcoming you. Hi ${user.name},\n\nYou just logged in to your ExploreTN account.\n\nIf this wasn’t you, please reset your password immediately.\n\nThanks,\nTeam ExploreTN`,
  });

  // ✅ ONLY ONE RESPONSE!
  res.status(200).json({
    message: "Login successful and Welcome to the Explore-TN",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });

}));


// ✅ Get all users
// ✅ Get my profile (protected)
router.get("/profile", isAuthenticatedUser, catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
}));


// ✅ Get user by ID
router.get("/users/:id", catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}));

// ✅ Get current user's favorites
router.get("/favorites", isAuthenticatedUser, catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(user.favorites || []);
}));

router.post("/favorites", isAuthenticatedUser, catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const alreadyFavorited = user.favorites.includes(name);

  if (alreadyFavorited) {
    // Remove it
    user.favorites = user.favorites.filter((n) => n !== name);
  } else {
    // Add it
    user.favorites.push(name);
  }

  await user.save();
  res.status(200).json(user.favorites);
}));


// DELETE a single favorite by name
router.delete("/favorites/:name", isAuthenticatedUser, async (req, res) => {
  const { name } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.favorites = user.favorites.filter(n => n !== name);
  await user.save();

  res.status(200).json(user.favorites); // ✅ return updated list
});


router.delete("/user/:id", catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
}));

module.exports = router;
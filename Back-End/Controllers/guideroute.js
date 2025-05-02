const express = require("express");
const router = express.Router();
const Guide = require("../models/guidemodel");
const uploadGuide = require("../middelware/multer");

// POST - Create new guide
router.post("/guides", uploadGuide.single("photo"), async (req, res) => {
  try {
    const { name, email, phone, location, languages, experience, bio } = req.body;

    // Basic validation for required fields
    if (!name || !email || !phone || !location || !experience || !bio) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const guideData = {
      name,
      email,
      phone,
      location,
      languages: languages?.split(",") || [],
      experience,
      bio,
      photo: req.file ? `/uploads/guides/${req.file.filename}` : undefined
    };

    const guide = new Guide(guideData);
    await guide.save();

    res.status(201).json(guide);  // Return guide directly
  } catch (error) {
    res.status(500).json({ message: "Error creating guide", error: error.message });
  }
});

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

module.exports = router;


module.exports = router;

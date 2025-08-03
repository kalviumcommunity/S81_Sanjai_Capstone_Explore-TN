const express = require("express");
const router = express.Router();
const Guide = require("../models/guidemodel");
const uploadGuide = require("../middelware/multer");
const { isAuthenticatedUser } = require("../middelware/authMiddleware");

// ✅ Create new guide — with debug logs
router.post("/guides", isAuthenticatedUser, uploadGuide.single("photo"), async (req, res) => {
  try {
    console.log("Authenticated user:", req.user);

    const { name, email, phone, location, languages, experience, bio } = req.body;

    if (!name || !email || !phone || !location || !experience) {
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
      photo: req.file ? `/uploads/guides/${req.file.filename}` : undefined,
      userId: req.user._id || req.user.id // <- make sure this matches
    };

    console.log("Guide to save:", guideData);

    const guide = new Guide(guideData);
    await guide.save();

    res.status(201).json(guide);

  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error("Error creating guide:", error);
    res.status(500).json({ message: "Error creating guide", error: error.message });
  }
});

// ✅ Get all guides
router.get("/guides", async (req, res) => {
  try {
    const { location, language } = req.query;

    let filter = {};
    if (location) filter.location = location;
    if (language) filter.languages = { $in: [language] };

    const guides = await Guide.find(filter);
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guides", error: error.message });
  }
});

// ✅ Get single guide by ID — log output for debugging
router.get("/guides/:id", async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: "Guide not found" });
    console.log("Fetched guide:", guide);
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// ✅ Update guide — with log checks
router.put("/guides/:id", isAuthenticatedUser, async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: "Guide not found" });

    console.log("Guide owner:", guide.userId);
    console.log("Requesting user:", req.user._id || req.user.id);

    if (guide.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this guide." });
    }

    const { name, email, phone, location, languages, experience, bio } = req.body;

    guide.name = name || guide.name;
    guide.email = email || guide.email;
    guide.phone = phone || guide.phone;
    guide.location = location || guide.location;
    guide.languages = Array.isArray(languages) ? languages : languages.split(",");
    guide.experience = experience || guide.experience;
    guide.bio = bio || guide.bio;

    await guide.save();
    res.json(guide);

  } catch (error) {
    console.error("Error updating guide:", error);
    res.status(500).json({ error: "Error updating guide", message: error.message });
  }
});

// ✅ Delete guide — with log checks
router.delete("/guides/:id", isAuthenticatedUser, async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: "Guide not found" });

    console.log("Guide owner:", guide.userId);
    console.log("Requesting user:", req.user._id || req.user.id);

    if (guide.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this guide." });
    }

    await guide.deleteOne();
    res.status(200).json({ message: "Guide deleted successfully." });

  } catch (error) {
    console.error("Error deleting guide:", error);
    res.status(500).json({ error: "Error deleting guide", message: error.message });
  }
});

module.exports = router;

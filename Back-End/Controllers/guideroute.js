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

    res.status(201).json(guide);  
  } catch (error) {
    res.status(500).json({ message: "Error creating guide", error: error.message });
  }
});

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

router.get("/guides/:id", async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
});

router.put("/guides/:id", uploadGuide.single("photo"), async (req, res) => {
  try {
    const { name, email, phone, location, languages, experience, bio } = req.body;

    const updatedData = {
      name,
      email,
      phone,
      location,
      languages: languages?.split(",") || [],
      experience,
      bio,
      photo: req.file ? `/uploads/guides/${req.file.filename}` : undefined
    };

    const guide = await Guide.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!guide) return res.status(404).json({ error: "Guide not found" });

    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: "Error updating guide", message: error.message });
  }
});

router.delete("/guides/:id", async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);

    if (!guide) return res.status(404).json({ error: "Guide not found" });

    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting guide", message: error.message });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const UserPick = require("../models/UserPick");
const uploadUserPick = require("../middelware/uploadUserPick");

// POST: Create a new user-submitted place
router.post('/Post', uploadUserPick.single('image'), async (req, res) => {
  try {
    const { username, title, location, category, description } = req.body;

    // Validation
    if (!username || !title || !location || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/user-picks/${req.file.filename}`;

    const newPick = await UserPick.create({
      username,
      title,
      location,
      category,
      description,
      imageUrl
    });

    res.status(201).json(newPick);
  } catch (err) {
    console.error("Error saving user pick:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// GET: All picks
router.get('/get', async (req, res) => {
  try {
    const picks = await UserPick.find().sort({ createdAt: -1 });
    res.status(200).json(picks);
  } catch (err) {
    console.error("Error fetching picks:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Picks by username
router.get('/user/:id', async (req, res) => {
  try {
    const picks = await UserPick.find({ username: req.params.username });
    res.status(200).json(picks);
  } catch (err) {
    console.error("Error fetching picks by user:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT: Update by ID
router.put('/put/:id', async (req, res) => {
  try {
    const pick = await UserPick.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!pick) {
      return res.status(404).json({ message: 'Pick not found' });
    }

    res.status(200).json(pick);
  } catch (err) {
    console.error("Error updating pick:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE: Remove by ID
router.delete('/:id', async (req, res) => {
  try {
    const pick = await UserPick.findByIdAndDelete(req.params.id);

    if (!pick) {
      return res.status(404).json({ message: 'Pick not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Error deleting pick:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


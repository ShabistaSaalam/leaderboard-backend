// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");

// Claim points for a user
router.post("/claim", async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate random points (1–10)
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Update user points
    user.totalPoints += randomPoints;
    await user.save();

    // Save claim history
    const history = new ClaimHistory({
      userId: user._id,
      points: randomPoints
    });
    await history.save();

    res.status(200).json({
      message: `${randomPoints} points claimed for ${user.name}`,
      points: randomPoints,
      user
    });
  } catch (err) {
    console.error("Claim error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get leaderboard (sorted by totalPoints descending)
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints,
      _id: user._id
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Error loading leaderboard" });
  }
});

// Add new user
router.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });

    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name: name.trim() });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

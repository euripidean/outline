const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get All Users
router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create User
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

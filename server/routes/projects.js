const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const data = await Project.find({});
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get Project by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Project.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Last Updated Project
router.get("/lastUpdated/:userId", async (req, res) => {
  try {
    const data = await Project.find({ userId: req.params.userId })
      .sort({ lastUpdated: -1 })
      .limit(1);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create Project
router.post("/", async (req, res) => {
  try {
    // add the current date as the startDate and lastUpdated
    req.body.startDate = new Date();
    req.body.lastUpdated = new Date();
    const project = new Project(req.body);
    const data = await project.save();
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Project
router.put("/:id", async (req, res) => {
  try {
    // add the current date as the lastUpdated
    req.body.lastUpdated = new Date();
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get Projects by User ID
router.get("/user/:userId", async (req, res) => {
  try {
    const data = await Project.find({ userId: req.params.userId });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

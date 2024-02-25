const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Get All Cards
router.get("/", async (req, res) => {
  try {
    const data = await Card.find({});
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get Card by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Card.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Cards by Project ID
router.get("/project/:projectId", async (req, res) => {
  try {
    const data = await Card.find({ projectId: req.params.projectId });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create Card
router.post("/", async (req, res) => {
  try {
    const card = new Card(req.body);
    // add the current date as the dateCreated and lastUpdated
    card.dateCreated = new Date();
    card.lastUpdated = new Date();
    const data = await card.save();
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Card
router.put("/:id", async (req, res) => {
  try {
    const data = await Card.findByIdAndUpdate(req.params.id);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete Card
router.delete("/:id", async (req, res) => {
  try {
    const data = await Card.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

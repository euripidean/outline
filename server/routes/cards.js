const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

//Get all cards
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ success: true, data: cards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Create a new card
router.post("/cards", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ success: true, data: card });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//Get a single card
router.get("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, error: "Card not found" });
    }
    res.status(200).json({ success: true, data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Update a card
router.put("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) {
      return res.status(404).json({ success: false, error: "Card not found" });
    }
    res.status(200).json({ success: true, data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Delete a card
router.delete("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, error: "Card not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

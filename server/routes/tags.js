import express from "express";
import Tag from "../models/Tag.js";

const router = express.Router();

//Get all tags
router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ success: true, data: tags });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Create a new tag
router.post("/tags", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//Get a single tag
router.get("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ success: false, error: "Tag not found" });
    }
    res.status(200).json({ success: true, data: tag });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Update a tag
router.put("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) {
      return res.status(404).json({ success: false, error: "Tag not found" });
    }
    res.status(200).json({ success: true, data: tag });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Delete a tag
router.delete("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ success: false, error: "Tag not found" });
    }
    res.status(200).json({ success: true, data: tag });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

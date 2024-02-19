const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

//Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Create a new project
router.post("/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//Get a single project
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Update a project
router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Delete a project
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

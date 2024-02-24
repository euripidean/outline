const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get All Projects
router.get("/projects", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    const data = await projects.find({}).toArray();
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Create Project
router.post("/projects", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    // add the current date as the startDate and lastUpdated
    req.body.startDate = new Date();
    req.body.lastUpdated = new Date();
    const project = new Project(req.body);
    const data = await projects.insertOne(project);
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Update Project
router.put("/projects/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    // add the current date as the lastUpdated
    req.body.lastUpdated = new Date();
    const data = await projects.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Get Projects by User ID
router.get("/projects/:userId", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    const data = await projects.find({ userId: req.params.userId }).toArray();
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Get Project by ID
router.get("/projects/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    const data = await projects.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Delete Project
router.delete("/projects/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const projects = database.collection("Project");
    const data = await projects.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;

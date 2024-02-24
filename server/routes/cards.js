const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Create Card
router.post("/cards", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const cards = database.collection("Card");
    const card = new Card(req.body);
    const data = await cards.insertOne(card);
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Update Card
router.put("/cards/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const cards = database.collection("Card");
    const data = await cards.updateOne(
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

// Get Card by ID
router.get("/cards/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const cards = database.collection("Card");
    const data = await cards.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Get Cards by Project ID
router.get("/cards/project/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const cards = database.collection("Card");
    const data = await cards.find({ project: req.params.id }).toArray();
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Delete Card
router.delete("/cards/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const cards = database.collection("Card");
    const data = await cards.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;

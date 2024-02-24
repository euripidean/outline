const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create User
router.post("/users", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const users = database.collection("User");
    const user = new User(req.body);
    const data = await users.insertOne(user);
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

// Update User
router.put("/users/:id", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const users = database.collection("User");
    const data = await users.updateOne(
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

module.exports = router;

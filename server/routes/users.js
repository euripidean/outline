const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all users
router.get("/users", async (req, res) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("outline");
    const users = database.collection("User");
    const query = {};
    const data = await users.find(query).toArray();
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;

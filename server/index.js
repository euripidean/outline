const { MongoClient } = require("mongodb");
require("dotenv").config();

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;
console.log(uri);

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("outline");
    const users = database.collection("User");

    const query = { username: "euripidean" };
    const user = await users.findOne(query);

    console.log(user);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

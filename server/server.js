require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

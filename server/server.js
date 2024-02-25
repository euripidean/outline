require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users.js");
const projectRoutes = require("./routes/projects.js");
const cardRoutes = require("./routes/cards.js");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/cards", cardRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

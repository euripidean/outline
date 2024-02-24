require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users.js");
const projectRoutes = require("./routes/projects.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", projectRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

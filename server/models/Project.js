const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: false,
  },
  logline: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: false,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

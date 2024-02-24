const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  project: {
    // set as id of project
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    enum: ["menu", "grid"],
    required: true,
  },
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;

import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  card_id: {
    type: String,
    required: false,
  },
  project_id: {
    type: String,
    required: false,
  },
  user_id: {
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
  active: {
    type: Boolean,
    required: true,
  },
});

const Tag = mongoose.model("Tag", TagSchema);

export default Tag;

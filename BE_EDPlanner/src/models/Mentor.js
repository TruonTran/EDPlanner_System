const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lecturer: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  role: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  desc: {
    type: String
  }
});

module.exports = mongoose.model("Mentor", mentorSchema);
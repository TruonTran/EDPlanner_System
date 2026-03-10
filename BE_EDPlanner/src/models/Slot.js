const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },

  mentor: {
    type: String,
    required: true
  },

  field: {
    type: String,
    required: true
  },

  registered: {
    type: Number,
    default: 0
  },

  maxGroup: {
    type: Number,
    default: 3
  }

}, { timestamps: true });

module.exports = mongoose.model("Slot", slotSchema);
const mongoose = require("mongoose");

const totalSchema = new mongoose.Schema({
  purpose: { type: String, required: true, unique: true }, // e.g., "Donation", "Tree Planting Project"
  total: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Total", totalSchema);

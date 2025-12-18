const mongoose = require("mongoose");

const ambassadorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Changed from fullName
    email: { type: String, required: true },
    organization: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ambassador", ambassadorSchema);
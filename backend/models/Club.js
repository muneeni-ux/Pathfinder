const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    leader: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }, // Added this field
    region: { type: String, required: true },
    
    // Club Details
    station: { type: String, default: "" },
    members: { type: Number, default: 0 },
    trees: { type: Number, default: 0 },
    founded: { type: Number },
    activities: { type: String, default: "" },
    image: { type: String, default: "" },
    
    // Admin
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
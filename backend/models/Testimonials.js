const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["Pathfinder", "Parent", "Leader"], default: "Pathfinder" },
    story: { type: String, required: true, trim: true, maxlength: 220 },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    approved: { type: Boolean, default: false }, // Admin must approve
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);

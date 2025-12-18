const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["News", "Reports", "Events", "Sport", "Editorial"],
      required: true 
    },
    snippet: { type: String, required: true },
    content: { type: String }, // For the detailed view
    image: { type: String, required: true }, // Cloudinary URL
    date: { type: Date, default: Date.now }, // Backend handles date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
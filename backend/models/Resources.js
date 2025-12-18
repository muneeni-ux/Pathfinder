const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    
    // Determines where the item appears on the UI
    category: { 
      type: String, 
      enum: ["document", "video", "form"], 
      required: true 
    },

    // Sub-type text (e.g., "Policy", "Manual" for docs)
    type: { type: String, default: "General" }, 

    // Cloudinary URL for the main file (PDF or Video)
    fileUrl: { type: String, required: true },

    // Cloudinary URL for video thumbnail (Only used if category === 'video')
    thumbnailUrl: { type: String }, 

    // Optional description
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video", "entertainment"],
      default: "image",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);

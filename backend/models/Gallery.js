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
    category:{
      type: String,
      enum: ["tree-planting", "events", "scouts"],
      default: "events",
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);

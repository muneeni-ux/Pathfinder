const mongoose = require("mongoose");

const honorThemeSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      unique: true,
    },

    theme: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HonorTheme", honorThemeSchema);

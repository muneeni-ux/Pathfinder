const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    regionType: {
      type: String,
      enum: ["Conference", "Field"],
      default: "Conference"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conference", conferenceSchema);

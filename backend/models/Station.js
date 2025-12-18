const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    treesPlanted: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);

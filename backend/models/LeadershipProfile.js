const mongoose = require("mongoose");

const leadershipProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Leader name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Leadership role is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Profile image is required"],
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    socials: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    approved: {
      type: Boolean,
      default: false, // Admin must approve before frontend visibility
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeadershipProfile", leadershipProfileSchema);

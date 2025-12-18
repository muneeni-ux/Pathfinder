const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    organization: { type: String, required: true }, // Changed from organizationName
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
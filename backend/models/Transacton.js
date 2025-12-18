const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phone: { type: String }, // optional for non-MPesa donations
  amount: { type: Number, required: true },
  purpose: { type: String, required: true }, // e.g., "Donation", "Bank", "Partnership"
  paymentMethod: {
    type: String,
    enum: ["mpesa", "bank", "partner"],
    default: "mpesa",
  },
  checkoutRequestID: { type: String }, // For MPesa
  mpesaReceiptNumber: { type: String },
  resultDesc: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("Transaction", transactionSchema);

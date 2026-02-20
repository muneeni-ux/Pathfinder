const express = require("express");
const {
  donateViaMpesa,
  mpesaCallback,
  getDonationStatus,
  donateOther,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/donationController.js");

const router = express.Router();

// Handle donation form submission
router.post("/", (req, res) => {
  const { paymentMethod } = req.body;
  if (paymentMethod === "mpesa") return donateViaMpesa(req, res);
  return donateOther(req, res);
});

// Callback for Safaricom MPesa payment confirmation
router.post("/callback", mpesaCallback);

// Frontend polling endpoint
router.get("/status/:checkoutRequestID", getDonationStatus);

// Admin: Get all donations
router.get("/transactions", getAllTransactions);

// Admin: Get single donation
router.get("/transactions/:id", getTransaction);

// Admin: Update donation
router.put("/transactions/:id", updateTransaction);

// Admin: Delete donation
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;

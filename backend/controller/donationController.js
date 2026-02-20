const axios = require("axios");
const Transaction = require("../models/Transacton.js");
const Total = require("../models/Total.js");

const {
  DARAJA_CONSUMER_KEY,
  DARAJA_CONSUMER_SECRET,
  DARAJA_SHORTCODE,
  DARAJA_PASSKEY,
  DARAJA_CALLBACK_URL,
} = process.env;

// --------------------
// Helper: Get MPesa Access Token
// --------------------
async function getAccessToken() {
  const auth = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64");
  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
}

// --------------------
// Donate via MPesa
// --------------------
async function donateViaMpesa(req, res) {
  const { phone, amount, donorName, purpose = "Donation" } = req.body;

  if (!phone || !amount || !donorName) {
    return res.status(400).json({ message: "Missing donor name, phone, or amount" });
  }

  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const password = Buffer.from(`${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`).toString("base64");

  try {
    const access_token = await getAccessToken();

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: DARAJA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: DARAJA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: DARAJA_CALLBACK_URL,
        AccountReference: purpose,
        TransactionDesc: `Contribution from ${donorName}`,
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (stkRes.data.ResponseCode !== "0") {
      return res.status(400).json({ message: "STK Push failed", data: stkRes.data });
    }

    const newTransaction = new Transaction({
      phone,
      amount,
      purpose,
      donorName,
      paymentMethod: "mpesa",
      checkoutRequestID: stkRes.data.CheckoutRequestID,
    });

    await newTransaction.save();

    res.status(200).json({
      message: "STK Push sent successfully",
      checkoutRequestID: stkRes.data.CheckoutRequestID,
    });
  } catch (err) {
    console.error("MPesa donation error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to initiate MPesa payment" });
  }
}

// --------------------
// MPesa Callback Webhook
// --------------------
async function mpesaCallback(req, res) {
  try {
    const callbackData = req.body?.Body?.stkCallback;
    if (!callbackData) {
      console.error("Invalid MPesa callback payload");
      return res.status(400).send("Invalid payload");
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData;

    if (ResultCode === 0) {
      // Success
      let mpesaReceiptNumber = "";
      if (CallbackMetadata && CallbackMetadata.Item) {
        const receiptItem = CallbackMetadata.Item.find((item) => item.Name === "MpesaReceiptNumber");
        if (receiptItem) {
          mpesaReceiptNumber = receiptItem.Value;
        }
      }

      const txn = await Transaction.findOneAndUpdate(
        { checkoutRequestID: CheckoutRequestID },
        {
          status: "COMPLETED",
          mpesaReceiptNumber,
          resultDesc: ResultDesc,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (txn) {
        // Update total tracker
        await Total.findOneAndUpdate(
          { purpose: typeof txn.purpose === "string" ? txn.purpose : "Donation" },
          { $inc: { total: txn.amount }, updatedAt: new Date() },
          { upsert: true }
        );

        // Emit socket update if socket.io is configured
        const io = req.app.get("io");
        if (io) {
          io.emit("new-contribution", { amount: txn.amount, purpose: txn.purpose });
        }
      }
    } else {
      // Failed / Cancelled
      await Transaction.findOneAndUpdate(
        { checkoutRequestID: CheckoutRequestID },
        {
          status: "FAILED",
          resultDesc: ResultDesc,
          updatedAt: new Date(),
        }
      );
    }

    // Always return 200 to Safaricom to acknowledge receipt
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("MPesa callback error:", err);
    res.status(500).send("Server Error");
  }
}

// --------------------
// Get Donation Status (Frontend Polling)
// --------------------
async function getDonationStatus(req, res) {
  const { checkoutRequestID } = req.params;
  try {
    const txn = await Transaction.findOne({ checkoutRequestID });
    if (!txn) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      status: txn.status,
      resultDesc: txn.resultDesc,
      mpesaReceiptNumber: txn.mpesaReceiptNumber,
    });
  } catch (err) {
    console.error("Error fetching donation status:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// --------------------
// Donate via Bank / Partnership / Other
// --------------------
async function donateOther(req, res) {
  const { donorName, amount, method } = req.body;

  if (!donorName || !amount || !method) {
    return res.status(400).json({ message: "Missing donation info" });
  }

  try {
    // Record transaction as PENDING
    const newTransaction = await Transaction.create({
      donorName,
      amount,
      purpose: method,
      paymentMethod: method,
      status: "PENDING",
    });

    // Update total collection
    await Total.findOneAndUpdate(
      { purpose: method },
      { $inc: { total: amount }, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Emit socket update if available
    const io = req.app.get("io");
    io?.emit("new-contribution", { amount, purpose: method });

    res.status(200).json({
      message: `Donation via ${method} recorded. Please complete the payment.`,
      transactionId: newTransaction._id,
    });
  } catch (err) {
    console.error("Other donation error:", err);
    res.status(500).json({ message: "Failed to record donation" });
  }
}

// --------------------
// Get all transactions (Admin)
// --------------------
async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error fetching donations" });
  }
}

// --------------------
// Get single transaction
// --------------------
async function getTransaction(req, res) {
  const { id } = req.params;
  try {
    const txn = await Transaction.findById(id);
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(txn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
}

// --------------------
// Update transaction (Admin)
async function updateTransaction(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const txn = await Transaction.findByIdAndUpdate(id, updates, { new: true });
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(txn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update transaction" });
  }
}

// --------------------
// Delete transaction (Admin)
// --------------------
async function deleteTransaction(req, res) {
  const { id } = req.params;

  try {
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
}

module.exports = {
  donateViaMpesa,
  mpesaCallback,
  getDonationStatus,
  donateOther,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};

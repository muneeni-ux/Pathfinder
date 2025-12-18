const express = require("express");
const { sendContactEmail } = require("../controller/contactController");

const router = express.Router();

// Route to send contact form email
router.post("/send-mail", sendContactEmail);

module.exports = router;

const nodemailer = require("nodemailer");

// Send contact form email
const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Receiving email
      subject: subject || "Contact Form Message",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: "Email sent successfully." });
  } catch (err) {
    console.error("Contact email error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = { sendContactEmail };

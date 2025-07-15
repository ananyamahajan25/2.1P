const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Configure SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route: GET home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route: POST subscribe
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Welcome to DEV@Deakin!",
    text: "Thank you for subscribing to DEV@Deakin. We're glad to have you!",
    html: "<strong>Thank you for subscribing to DEV@Deakin. We're glad to have you!</strong>",
  };

  try {
    await sgMail.send(msg);
    res.send("✅ Welcome email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

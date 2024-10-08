const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();
const hostReg = process.env.SMTP_REG;
const smptPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: hostReg,
  port: smptPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

app.post("/discount", (req, res) => {
  console.log("Received form data:", req.body);
  const { fullName, email, phone, city } = req.body;

  if (!email) {
    res.status(400).json({ success: false, error: "Email is required" });
    return;
  }

  const mailToUser = {
    from: "SmartHVACUS@gmail.com",
    to: email,
    subject: "Schedule Submitted Successfully",
    html: `
    <p>Thank you for choosing our services! We will contact you shortly.</p>
    <p>Please note that this is an automated message, and there is no need to reply to it.</p>
    `,
  };

  const mailOptions = {
    from: "SmartHVACUS@gmail.com",
    to: "valllarisa76@gmail.com",
    subject: "New customer's discount!",
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      City: ${city}
    `,
  };

  console.log("Attempting to send user notification email...");
  transporter.sendMail(mailToUser, (error, info) => {
    if (error) {
      console.error("Error sending user notification:", error.message);
      res.status(500).json({
        success: false,
        error: "Error sending email: " + error.message,
      });
    } else {
      console.log("User notification sent successfully:", info.response);
      console.log("Attempting to send admin notification email...");
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending admin email:", error.message);
          res.status(500).json({
            success: false,
            error: "Error sending email: " + error.message,
          });
        } else {
          console.log("Admin email sent successfully:", info.response);
          res.status(200).json({
            success: true,
            message: "Service booking submitted successfully",
          });
        }
      });
    }
  });
});

app.use((err, req, res, next) => {
  if (err) {
    console.error("General error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "General error: " + err.message });
  } else {
    next();
  }
});

module.exports = app;
module.exports.handler = serverless(app);

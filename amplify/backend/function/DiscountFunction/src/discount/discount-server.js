const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: "AKIATS4UT5RW4WTKT7ON",
    pass: "BEQc91dkWshh8tEeRpua0T1Kt+mQ1iCSghnjgfZ33+7P",
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
    from: "notification@smart-hvacus.com",
    to: email,
    subject: "Schedule Submitted Successfully",
    html: `
      <p>Thank you for scheduling a service. We will contact you shortly.</p>
      <p>Please note that this is an automated message, and there is no need to reply to it.</p>
    `,
  };

  const mailOptions = {
    from: "schedule-notification@smart-hvacus.com",
    to: "valllarisa76@gmail.com",
    subject: "New customer's discount!",
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      City: ${city}
    `,
  };

  transporter.sendMail(mailToUser, (error, info) => {
    if (error) {
      console.error("Error sending user notification:", error.message);
      res.status(500).json({
        success: false,
        error: "Error sending email: " + error.message,
      });
    } else {
      console.log("User notification sent successfully:", info.response);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error.message);
          res.status(500).json({
            success: false,
            error: "Error sending email: " + error.message,
          });
        } else {
          console.log("Email sent successfully to admin:", info.response);
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

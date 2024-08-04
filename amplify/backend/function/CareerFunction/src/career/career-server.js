const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const serverless = require("serverless-http");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: "AKIAY42MH4QIOIT2OQFD",
    pass: "BPfbFWEy4PWzHkRp8nVq4YZGThDIDUaF4as468fGHzsL",
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP server connection error:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

app.post("/career", upload.single("resume"), (req, res) => {
  console.log("Received form data:", req.body);
  console.log("Received file data:", req.file);

  const {
    firstName,
    lastName,
    email,
    phone,
    state,
    city,
    education,
    previousCompany,
    workStartDate,
    workEndDate,
    yearsExperience,
    licenses,
    softSkills,
    ethnicity,
    veteran,
    disability,
    workAuthorization,
  } = req.body;

  if (!email) {
    res.status(400).json({ success: false, error: "Email is required" });
    return;
  }

  const mailToUser = {
    from: "notification@smart-hvacus.com",
    to: email,
    subject: "Application Submitted Successfully",
    html: `
      <p>Thank you for your application! We will get in touch with you as soon as we review your request.</p>
      <p>Please note that this is an automated message, and there is no need to reply to it.</p>
    `,
  };

  const mailOptions = {
    from: "notification@smart-hvacus.com",
    to: "valllarisa76@gmail.com",
    subject: "New Job Application",
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone: ${phone}
      State: ${state}
      City: ${city}
      Education: ${education}
      Previous Company: ${previousCompany}
      Worked from: ${workStartDate} to ${workEndDate}
      Years Experience: ${yearsExperience}
      Licenses: ${
        Array.isArray(licenses) ? licenses.join(", ") : licenses || ""
      }
      Soft Skills: ${
        Array.isArray(softSkills) ? softSkills.join(", ") : softSkills || ""
      }
      Ethnicity: ${ethnicity}
      Veteran status: ${veteran}
      Disability status: ${disability}
      Work Authorization: ${workAuthorization}
    `,
    attachments: req.file
      ? [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
          },
        ]
      : [],
  };

  transporter.sendMail(mailToUser, (error, info) => {
    if (error) {
      console.error("Error sending user notification:", error.message);
    } else {
      console.log("User notification sent successfully:", info.response);
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      res.status(500).json({
        success: false,
        error: "Error sending email: " + error.message,
      });
    } else {
      console.log("Email sent successfully to admin:", info.response);
      res
        .status(200)
        .json({ success: true, message: "Application submitted successfully" });
    }
  });
});

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Multer error: " + err.message });
  } else if (err) {
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

// test-email-direct.js
import nodemailer from "nodemailer";

// SMTP credentials
const EMAIL_SERVER_HOST = "smtppro.zoho.in";
const EMAIL_SERVER_PORT = 465;
const EMAIL_SERVER_USER = "admin@techutsavtce.tech";
const EMAIL_SERVER_PASSWORD = "hMyHzsV6rXWe";
const EMAIL_FROM = "TechUtsav Team";

// Create transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_SERVER_HOST,
  port: EMAIL_SERVER_PORT,
  secure: true, // true for 465
  auth: {
    user: EMAIL_SERVER_USER,
    pass: EMAIL_SERVER_PASSWORD,
  },
});

// Email details
const mailOptions = {
  from: `"${EMAIL_FROM}" <${EMAIL_SERVER_USER}>`,
  to: "clement@student.tce.edu", 
  subject: "Test Email from Node",
  text: "This is a test email sent directly using Zoho SMTP!",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});

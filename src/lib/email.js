import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, otp) {
  // Create a Nodemailer transporter using Brevo's SMTP settings
  let transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false, // Set to true if using port 465
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: email,
    subject: "Verify your email for Techutsav",
    html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log("Verification email sent: %s", info.messageId);
  return info;
}

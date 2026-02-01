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

export async function sendResetPasswordEmail(email, resetToken) {
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

  // Construct the reset password URL
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  // Define the email options
  const mailOptions = {
    from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: email,
    subject: "Reset Your Password - Techutsav",
    html: `
      <p>You requested to reset your password for Techutsav.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log("Reset password email sent: %s", info.messageId);
  return info;
}

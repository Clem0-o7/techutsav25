// /app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_name, user_email, message } = body;

    // Validate required fields
    if (!user_name || !user_email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Create a Nodemailer transporter using Brevo SMTP credentials
    let transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false, // use true if port is 465
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    // Compose the email content
    const mailOptions = {
      from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
      // Send the message to the designated contact email (could be the same as the sender)
      to: process.env.BREVO_SENDER_EMAIL,
      subject: `Contact Form Message from ${user_name}`,
      html: `<p><strong>Name:</strong> ${user_name}</p>
             <p><strong>Email:</strong> ${user_email}</p>
             <p><strong>Message:</strong><br/> ${message}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent:", info.messageId);

    return new Response(JSON.stringify({ message: "Message sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}

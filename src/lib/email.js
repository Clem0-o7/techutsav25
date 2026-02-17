import nodemailer from "nodemailer"

export async function sendVerificationEmail(
  email,
  token
) {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `
      <p>Click the link to verify your email:</p>
      <a href="${url}">${url}</a>
    `,
  })
}

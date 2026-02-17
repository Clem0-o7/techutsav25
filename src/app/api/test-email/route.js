import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    // Get env vars
    const config = {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      user: process.env.EMAIL_SERVER_USER,
      from: process.env.EMAIL_FROM?.replace(/['"]/g, '').trim(),
    };

    console.log("[TEST EMAIL] Configuration:", {
      host: config.host,
      port: config.port,
      user: config.user,
      from: config.from,
      secure: config.port === 465
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Verify connection
    console.log("[TEST EMAIL] Verifying SMTP connection...");
    await transporter.verify();
    console.log("[TEST EMAIL] SMTP connection verified successfully!");

    return NextResponse.json({
      success: true,
      message: "SMTP connection verified successfully",
      config: {
        host: config.host,
        port: config.port,
        user: config.user,
        from: config.from,
        secure: config.port === 465
      }
    });
  } catch (error) {
    console.error("[TEST EMAIL ERROR]", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    }, { status: 500 });
  }
}

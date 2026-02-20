import nodemailer from "nodemailer"

/**
 * Get configured email transporter
 * @returns {nodemailer.Transporter}
 */
function getEmailTransporter() {
  // Validate required environment variables
  const requiredEnvVars = {
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  const port = Number(process.env.EMAIL_SERVER_PORT);
  const isSecure = port === 465;

  const config = {
    host: process.env.EMAIL_SERVER_HOST,
    port: port,
    secure: isSecure, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  };

  // Additional configuration for port 587 (TLS)
  if (!isSecure) {
    config.requireTLS = true;
    config.tls = {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    };
  }

  console.log(`[EMAIL CONFIG] Host: ${config.host}, Port: ${config.port}, Secure: ${config.secure}, User: ${config.auth.user}`);

  return nodemailer.createTransport(config);
}

/**
 * Generate professional HTML email template for verification
 */
function getVerificationEmailTemplate(verificationUrl, email) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
        .button { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; transition: transform 0.2s; }
        .button:hover { transform: translateY(-2px); }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666666; font-size: 12px; border-top: 1px solid #e0e0e0; }
        .security-notice { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-size: 14px; }
        .link-backup { word-break: break-all; color: #667eea; font-size: 12px; padding: 10px; background: #f8f9fa; border-radius: 4px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Verify Your Email</h1>
        </div>
        <div class="content">
          <h2>Welcome to TechUtsav!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up! To complete your registration and access your account, please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <div class="security-notice">
            <strong>⚠️ Security Notice:</strong> This link will expire in 24 hours for your security.
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <div class="link-backup">${verificationUrl}</div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            If you didn't create an account with us, please ignore this email.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} TechUtsav. All rights reserved.</p>
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Get properly formatted FROM address
 * @returns {string} Formatted email address
 */
function getFromAddress() {
  const emailFrom = process.env.EMAIL_FROM?.replace(/['"]/g, '').trim(); // Remove quotes
  const emailUser = process.env.EMAIL_SERVER_USER;
  
  // If EMAIL_FROM contains @, use it directly, otherwise format as "Name" <email>
  if (emailFrom && emailFrom.includes('@')) {
    return emailFrom;
  } else if (emailFrom) {
    return `"${emailFrom}" <${emailUser}>`;
  }
  return emailUser;
}

/**
 * Send verification email to user
 * @param {string} email - User's email address
 * @param {string} token - Verification token
 * @throws {Error} If email sending fails
 */
export async function sendVerificationEmail(email, token) {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    
    // Log for monitoring (even in production)
    console.log(`[EMAIL] Sending verification email to: ${email}`);
    
    const transporter = getEmailTransporter();
    const htmlContent = getVerificationEmailTemplate(verificationUrl, email);
    
    const fromAddress = getFromAddress();
    console.log(`[EMAIL] From address: ${fromAddress}`);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "Verify Your Email Address - TechUtsav",
      html: htmlContent,
      text: `Welcome to TechUtsav! Please verify your email by clicking this link: ${verificationUrl}. This link will expire in 24 hours.`,
    });

    console.log(`[EMAIL] Verification email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL ERROR] Failed to send verification email to ${email}:`, error.message);
    console.error(`[EMAIL ERROR] Full error:`, error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}

/**
 * Generate professional HTML email template for password reset
 */
function getResetPasswordEmailTemplate(resetUrl, email) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
        .button { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; transition: transform 0.2s; }
        .button:hover { transform: translateY(-2px); }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666666; font-size: 12px; border-top: 1px solid #e0e0e0; }
        .security-notice { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-size: 14px; }
        .warning-box { background: #f8d7da; border-left: 4px solid #dc3545; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-size: 14px; color: #721c24; }
        .link-backup { word-break: break-all; color: #f5576c; font-size: 12px; padding: 10px; background: #f8f9fa; border-radius: 4px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Reset Your Password</h1>
        </div>
        <div class="content">
          <h2>Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset the password for your TechUtsav account (<strong>${email}</strong>).</p>
          <p>Click the button below to reset your password:</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          
          <div class="security-notice">
            <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour for your security.
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <div class="link-backup">${resetUrl}</div>
          
          <div class="warning-box">
            <strong>⚠️ Important:</strong> If you didn't request a password reset, please ignore this email or contact support if you're concerned about your account security.
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} TechUtsav. All rights reserved.</p>
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send password reset email to user
 * @param {string} email - User's email address
 * @param {string} token - Reset token
 * @throws {Error} If email sending fails
 */
export async function sendResetPasswordEmail(email, token) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/api/auth/reset-password?token=${token}`;
    
    console.log(`[EMAIL] Sending password reset email to: ${email}`);
    
    const transporter = getEmailTransporter();
    const htmlContent = getResetPasswordEmailTemplate(resetUrl, email);
    const fromAddress = getFromAddress();

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "Reset Your Password - TechUtsav",
      html: htmlContent,
      text: `Reset your TechUtsav password by clicking this link: ${resetUrl}. This link will expire in 1 hour. If you didn't request this, please ignore this email.`,
    });

    console.log(`[EMAIL] Password reset email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL ERROR] Failed to send password reset email to ${email}:`, error.message);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}


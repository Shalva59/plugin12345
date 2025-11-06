const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // false for port 587, true for 465
    auth: {
      user: process.env.EMAIL_USER || 'pluginappgeo@gmail.com',
      pass: process.env.EMAIL_PASS || ''
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
};

// Email templates
const emailTemplates = {
  verifyEmail: (name, verificationUrl) => ({
    subject: 'Verify Your Email - Plugin ValueFlight',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .button {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            opacity: 0.9;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
          .warning {
            background: #fff5f5;
            border-left: 4px solid #fc8181;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Plugin ValueFlight</div>
          </div>

          <h1>Welcome, ${name}!</h1>

          <p>Thank you for registering with Plugin ValueFlight. To complete your registration and activate your account, please verify your email address.</p>

          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f7fafc; padding: 10px; border-radius: 4px; font-size: 14px;">
            ${verificationUrl}
          </p>

          <div class="warning">
            <strong>Important:</strong> This verification link will expire in 24 hours. If you didn't create an account with us, please ignore this email.
          </div>

          <div class="footer">
            <p>Best regards,<br>The Plugin ValueFlight Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              © ${new Date().getFullYear()} Plugin ValueFlight. All rights reserved.<br>
              plugin.valueflight.dev
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome, ${name}!

      Thank you for registering with Plugin ValueFlight. To complete your registration, please verify your email address by clicking the link below:

      ${verificationUrl}

      This link will expire in 24 hours.

      If you didn't create an account with us, please ignore this email.

      Best regards,
      The Plugin ValueFlight Team
    `
  }),

  welcomeEmail: (name) => ({
    subject: 'Welcome to Plugin ValueFlight!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .success-icon {
            width: 60px;
            height: 60px;
            margin: 20px auto;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
          }
          .button {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
          .features {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .feature-item {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .feature-item:last-child {
            border-bottom: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Plugin ValueFlight</div>
          </div>

          <div class="success-icon">✓</div>

          <h1>Welcome aboard, ${name}!</h1>

          <p>Your email has been successfully verified and your account is now fully activated. We're excited to have you as part of the Plugin ValueFlight community!</p>

          <div class="features">
            <h3>What you can do now:</h3>
            <div class="feature-item">✓ Access all platform features</div>
            <div class="feature-item">✓ Explore our services and software solutions</div>
            <div class="feature-item">✓ Connect with our support team</div>
            <div class="feature-item">✓ Manage your account settings</div>
          </div>

          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'https://plugin.valueflight.dev'}/login" class="button">Go to Dashboard</a>
          </div>

          <div class="footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br>The Plugin ValueFlight Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              © ${new Date().getFullYear()} Plugin ValueFlight. All rights reserved.<br>
              plugin.valueflight.dev
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome aboard, ${name}!

      Your email has been successfully verified and your account is now fully activated. We're excited to have you as part of the Plugin ValueFlight community!

      What you can do now:
      - Access all platform features
      - Explore our services and software solutions
      - Connect with our support team
      - Manage your account settings

      Visit your dashboard: ${process.env.FRONTEND_URL || 'https://plugin.valueflight.dev'}/login

      If you have any questions, feel free to contact our support team.

      Best regards,
      The Plugin ValueFlight Team
    `
  }),

  resetPassword: (name, resetUrl) => ({
    subject: 'Password Reset Request - Plugin ValueFlight',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #f56565 0%, #ed8936 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .button {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #f56565 0%, #ed8936 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
          }
          .warning {
            background: #fffaf0;
            border-left: 4px solid #ed8936;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
          .security-note {
            background: #f0fff4;
            border-left: 4px solid #48bb78;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Plugin ValueFlight</div>
          </div>

          <h1>Password Reset Request</h1>

          <p>Hi ${name},</p>

          <p>We received a request to reset your password. Click the button below to create a new password:</p>

          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>

          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f7fafc; padding: 10px; border-radius: 4px; font-size: 14px;">
            ${resetUrl}
          </p>

          <div class="warning">
            <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons.
          </div>

          <div class="security-note">
            <strong>Security Tip:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged. You may want to review your account security settings.
          </div>

          <div class="footer">
            <p>Best regards,<br>The Plugin ValueFlight Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              © ${new Date().getFullYear()} Plugin ValueFlight. All rights reserved.<br>
              plugin.valueflight.dev
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${name},

      We received a request to reset your password. Click the link below to create a new password:

      ${resetUrl}

      This link will expire in 1 hour for security reasons.

      If you didn't request this password reset, please ignore this email and your password will remain unchanged.

      Best regards,
      The Plugin ValueFlight Team
    `
  }),

  passwordChanged: (name) => ({
    subject: 'Password Successfully Changed - Plugin ValueFlight',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .success-icon {
            width: 60px;
            height: 60px;
            margin: 20px auto;
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
          }
          h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .alert {
            background: #fff5f5;
            border-left: 4px solid #fc8181;
            padding: 12px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Plugin ValueFlight</div>
          </div>

          <div class="success-icon">✓</div>

          <h1>Password Successfully Changed</h1>

          <p>Hi ${name},</p>

          <p>Your password has been successfully changed. You can now log in with your new password.</p>

          <div class="alert">
            <strong>Security Alert:</strong> If you didn't make this change, please contact our support team immediately and secure your account.
          </div>

          <p><strong>When:</strong> ${new Date().toLocaleString()}</p>

          <div class="footer">
            <p>Best regards,<br>The Plugin ValueFlight Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              © ${new Date().getFullYear()} Plugin ValueFlight. All rights reserved.<br>
              plugin.valueflight.dev
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${name},

      Your password has been successfully changed. You can now log in with your new password.

      When: ${new Date().toLocaleString()}

      Security Alert: If you didn't make this change, please contact our support team immediately.

      Best regards,
      The Plugin ValueFlight Team
    `
  })
};

// Send email function
const sendEmail = async (to, template) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Plugin ValueFlight" <${process.env.EMAIL_USER || 'pluginappgeo@gmail.com'}>`,
      to,
      subject: template.subject,
      html: template.html,
      text: template.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  emailTemplates
};
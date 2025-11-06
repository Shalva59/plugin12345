const nodemailer = require('nodemailer');

  // Send email function
  const sendEmail = async (to, template) => {
    try {
      // Create transport (not transporter!) - this was the issue
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || 'pluginappgeo@gmail.com',
          pass: process.env.EMAIL_PASS || ''
        },
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false
        }
      });

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
      console.error('Email sending error:', error.message);
      return { success: false, error: error.message };
    }
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
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for registering with Plugin ValueFlight. Please verify your email address to activate your account.</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f7fafc; padding: 10px; border-radius: 4px; font-size: 14px;">
              ${verificationUrl}
            </p>
            <p><strong>Important:</strong> This verification link will expire in 24 hours.</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome, ${name}!

        Thank you for registering with Plugin ValueFlight. Please verify your email by clicking the link below:

        ${verificationUrl}

        This link will expire in 24 hours.
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
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px;">
            <h1 style="color: #2d3748;">Welcome aboard, ${name}!</h1>
            <p>Your email has been successfully verified and your account is now fully activated.</p>
            <p>You can now log in and start using all our features.</p>
            <a href="${process.env.FRONTEND_URL || 'https://plugin.valueflight.dev'}/login"
               style="display: inline-block; padding: 14px 30px; background: #48bb78; color: white; text-decoration: none; border-radius: 8px; font-weight:       
  600; margin: 20px 0;">
              Go to Login
            </a>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome aboard, ${name}!

        Your email has been successfully verified and your account is now fully activated.

        You can now log in at: ${process.env.FRONTEND_URL || 'https://plugin.valueflight.dev'}/login
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
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px;">
            <h1 style="color: #2d3748;">Password Reset Request</h1>
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="${resetUrl}"
               style="display: inline-block; padding: 14px 30px; background: #f56565; color: white; text-decoration: none; border-radius: 8px; font-weight:       
  600; margin: 20px 0;">
              Reset Password
            </a>
            <p>Or copy and paste this link:</p>
            <p style="word-break: break-all; background: #f7fafc; padding: 10px; border-radius: 4px; font-size: 14px;">
              ${resetUrl}
            </p>
            <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${name},

        We received a request to reset your password. Click the link below to create a new password:

        ${resetUrl}

        This link will expire in 1 hour.

        If you didn't request this password reset, please ignore this email.
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
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px;">
            <h1 style="color: #2d3748;">Password Successfully Changed</h1>
            <p>Hi ${name},</p>
            <p>Your password has been successfully changed.</p>
            <p><strong>When:</strong> ${new Date().toLocaleString()}</p>
            <p style="background: #fff5f5; border-left: 4px solid #fc8181; padding: 12px; margin: 20px 0; border-radius: 4px;">
              <strong>Security Alert:</strong> If you didn't make this change, please contact our support team immediately.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${name},

        Your password has been successfully changed.

        When: ${new Date().toLocaleString()}

        Security Alert: If you didn't make this change, please contact our support team immediately.
      `
    })
  };

  module.exports = {
    sendEmail,
    emailTemplates
  };
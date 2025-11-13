const express = require('express');
const rateLimit = require('express-rate-limit');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// Contact form rate limiter - 1 per hour per IP
const contactHourlyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1,
  message: 'You can only send one contact message per hour. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use IP address as key
    return req.ip || req.connection.remoteAddress;
  }
});

// Contact form rate limiter - 5 per day per IP
const contactDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5,
  message: 'You have reached the maximum number of contact messages (5) per day. Please try again tomorrow.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use IP address as key
    return req.ip || req.connection.remoteAddress;
  }
});

// @desc    Send contact form email
// @route   POST /api/contact/send
// @access  Public
router.post('/send', contactHourlyLimiter, contactDailyLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Create email template for contact form
    const emailTemplate = {
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2d3748; border-bottom: 3px solid #4299e1; padding-bottom: 10px;">New Contact Form Submission</h1>

            <div style="margin: 20px 0;">
              <h3 style="color: #4299e1; margin-bottom: 5px;">From:</h3>
              <p style="margin: 5px 0; padding: 10px; background: #f7fafc; border-radius: 4px;">
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #4299e1;">${email}</a>
              </p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #4299e1; margin-bottom: 5px;">Subject:</h3>
              <p style="margin: 5px 0; padding: 10px; background: #f7fafc; border-radius: 4px;">${subject}</p>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #4299e1; margin-bottom: 5px;">Message:</h3>
              <div style="padding: 15px; background: #f7fafc; border-radius: 4px; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px;">
              <p style="margin: 5px 0;"><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>IP Address:</strong> ${req.ip || req.connection.remoteAddress}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

From:
Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
${message}

---
Sent at: ${new Date().toLocaleString()}
IP Address: ${req.ip || req.connection.remoteAddress}
      `
    };

    // Send email to pluginplugin84@gmail.com
    const emailResult = await sendEmail('pluginplugin84@gmail.com', emailTemplate);

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      });
    }

    res.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

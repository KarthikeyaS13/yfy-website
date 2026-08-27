require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER || 'info@yfy.ai',
    pass: process.env.SMTP_PASS || 'Yfyapp@013',
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP is configured correctly and ready to take our messages");
  }
});

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const emailConfig = require("../config/email");

const transporter = nodemailer.createTransport(emailConfig);

// Generate a random 6-digit code
const generateRandomCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

// Send the code to the user's email
const sendCodeByEmail = (userEmail, code) => {
  const mailOptions = {
    from: emailConfig.auth.user,
    to: userEmail,
    subject: "Your Two-Factor Authentication Code",
    text: `Your two-factor authentication code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { generateRandomCode, sendCodeByEmail };

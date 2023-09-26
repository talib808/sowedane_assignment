const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv"); 

dotenv.config(); 

const EMAIL_SECRET = process.env.EMAIL_SECRET; 
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      username,
      email,
      password,
      confirmed: false, // Email confirmation not done yet
    });

    // Save the user to the database
    await newUser.save();

    // Generate an email confirmation token with a shorter expiration time
    const token = jwt.sign({ userId: newUser._id }, EMAIL_SECRET, {
      expiresIn: "24h", 
    });

    // Send a confirmation email with a link to /confirm/:token
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const confirmationLink = `http://app-url/confirm/${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Confirm Your Email",
      html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Email Confirmation
exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the token
    const decodedToken = jwt.verify(token, EMAIL_SECRET);

    // Update the user's email confirmation status
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.confirmed = true;
    await user.save();

    // Redirect to a success page
    res.redirect("/confirmation-success");
  } catch (error) {
    console.error(error);
    res.redirect("/confirmation-failure");
  }
};

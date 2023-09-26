const express = require("express");
const router = express.Router();
const { generateRandomCode, sendCodeByEmail } = require("../utils/email");

// Generate a random code and send it via email
router.post("/send-code", (req, res) => {
  const userEmailAddress = req.body.email;
  const code = generateRandomCode();
  sendCodeByEmail(userEmailAddress, code);
  res.json({ message: "Code sent successfully" });
});

// Verify the user's input code
router.post("/verify-code", (req, res) => {
  const userInputCode = req.body.code;
  const generatedCode = req.session.generatedCode;
  const isCodeValid = userInputCode === generatedCode;

  if (isCodeValid) {
    res.json({ message: "Code is valid" });
  } else {
    res.status(401).json({ message: "Code is not valid" });
  }
});

module.exports = router;

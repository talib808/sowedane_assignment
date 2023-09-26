const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User Registration
router.post("/register", authController.register);

// Email Confirmation
router.get("/confirm/:token", authController.confirmEmail);

module.exports = router;

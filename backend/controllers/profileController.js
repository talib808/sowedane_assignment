const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator'); 

// Update the user's profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { _id } = req.user; 
    const { username, email } = req.body; 

    // Check if the new email is already in use by another user
    const existingUserWithNewEmail = await User.findOne({ email, _id: { $ne: _id } });
    if (existingUserWithNewEmail) {
      return res.status(400).json({ success: false, error: 'Email is already in use' });
    }

    // Find and update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, email },
      { new: true } 
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, error: 'Profile update failed' });
  }
};

module.exports = exports;

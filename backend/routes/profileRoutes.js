const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/:id", profileController.updateUserProfile);

// Protected user profile route
router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  profileController.getUserProfile
);

// Admin profile route (requires both authentication and admin access)
router.get(
  "/admin/profile",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  profileController.getAdminProfile
);

module.exports = router;

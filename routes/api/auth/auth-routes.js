require("dotenv").config();
const express = require("express");
const { authMiddleware } = require("../../../utils/authMiddleware");

const {
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../../../controllers/auth-controllers");

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);

module.exports = router;

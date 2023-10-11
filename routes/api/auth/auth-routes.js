require("dotenv").config();
const express = require("express");
const { authMiddleware } = require("../../../middlewares/authMiddleware");

const {
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../../../controllers/auth-controllers");

const router = express.Router();

router.post("/admin/login", login);
router.post("/admin/forgot-password", forgotPassword);
router.post("/admin/reset-password/:resetToken", resetPassword);
router.get("/admin/logout", authMiddleware, logout);
router.get("/admin/current", authMiddleware, getCurrentUser);

module.exports = router;
require("dotenv").config();
const express = require("express");
const authMiddleware = require("../../../middlewares/authMiddleware");

const {
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../../../controllers/auth-controllers");

const router = express.Router();

router.post("/admin/login", login);
router.post("/admin/forgot-password", forgotPassword);
router.post("/admin/reset-password/:id/:resetToken", resetPassword);
router.post("/admin/logout", authMiddleware, logout);
router.get("/admin/current", authMiddleware, getCurrentUser);
router.patch("/admin/change-password", authMiddleware, changePassword);

module.exports = router;
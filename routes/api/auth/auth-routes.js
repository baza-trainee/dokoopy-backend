require("dotenv").config();
const express = require("express");
const { authMiddleware } = require("../../../utils/authMiddleware");

const {
  login,
  logout,
  getCurrentUser,
} = require("../../../controllers/auth-controllers");

const router = express.Router();

router.post("/login", login);

router.use(authMiddleware);
router.get("/logout", logout);
router.get("/current", getCurrentUser);

module.exports = router;

require("dotenv").config();
const express = require('express');

const { updateBank} = require('../../../controllers/bank-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.put('/', authMiddleware, updateBank);

module.exports = router;
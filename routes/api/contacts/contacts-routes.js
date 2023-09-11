require("dotenv").config();
const express = require('express');

const { updateContact } = require('../../../controllers/contacts-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.put('/', authMiddleware, updateContact);

module.exports = router;
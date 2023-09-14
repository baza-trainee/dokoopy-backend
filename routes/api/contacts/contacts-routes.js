require("dotenv").config();
const express = require('express');

const { updateContact, getAllContacts } = require('../../../controllers/contacts-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.put('/admin', authMiddleware, updateContact);
router.get('/', getAllContacts);
router.get('/admin', authMiddleware, getAllContacts);

module.exports = router;
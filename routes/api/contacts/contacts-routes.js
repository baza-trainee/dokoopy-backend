require("dotenv").config();
const express = require('express');

const { updateContact, getAllContacts } = require('../../../controllers/contacts-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.patch('/admin', updateContact);
router.get('/', getAllContacts);
router.get('/admin', getAllContacts);

module.exports = router;
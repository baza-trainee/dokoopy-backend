require("dotenv").config();
const express = require('express');
const { updateContact, getAllContacts } = require('../../../controllers/contacts-controllers');
const authMiddleware  = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.patch('/admin/:id', authMiddleware, updateContact);
router.get('/', getAllContacts);
router.get('/admin', authMiddleware, getAllContacts);

module.exports = router;
require("dotenv").config();
const express = require('express');

const { updateBank, getAllRequisites} = require('../../../controllers/bank-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.put('/admin', authMiddleware, updateBank);
router.get('/', getAllRequisites);
router.get('/admin', authMiddleware, getAllRequisites);

module.exports = router;
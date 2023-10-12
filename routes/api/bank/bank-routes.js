require("dotenv").config();
const express = require('express');
const { updateBank, getAllRequisites} = require('../../../controllers/bank-controllers');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.patch('/admin/:id', authMiddleware, updateBank);
router.get('/', getAllRequisites);
router.get('/admin', authMiddleware, getAllRequisites);

module.exports = router;
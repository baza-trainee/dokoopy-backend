require("dotenv").config();
const express = require('express');

const { updateBank, getAllRequisites} = require('../../../controllers/bank-controllers');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.put('/admin', updateBank);
router.get('/', getAllRequisites);
router.get('/admin', getAllRequisites);

module.exports = router;
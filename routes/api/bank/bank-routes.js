require("dotenv").config();
const express = require('express');

const { updateBank, getAllRequisites} = require('../../../controllers/bank-controllers');
const { authMiddleware } = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.patch('/admin/:id', updateBank);
router.get('/', getAllRequisites);
router.get('/admin', getAllRequisites);

module.exports = router;
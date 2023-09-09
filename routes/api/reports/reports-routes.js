require("dotenv").config();
const express = require('express');

const { addReport, updateReport } = require('../../../controllers/reports-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('reportURL'), addReport);
router.put('/:id', authMiddleware, upload.single('reportURL'), updateReport);

module.exports = router;
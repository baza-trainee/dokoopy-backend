require("dotenv").config();
const express = require('express');

const { addReport, updateReport, getAllReports } = require('../../../controllers/reports-controllers');
const upload = require('../../../middlewares/upload');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/admin', authMiddleware, upload.single('reportURL'), addReport);
router.patch('/admin/:id', authMiddleware, upload.single('reportURL'), updateReport);
router.get('/', getAllReports);
router.get('/admin', authMiddleware, getAllReports);

module.exports = router;
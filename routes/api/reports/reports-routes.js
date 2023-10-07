require("dotenv").config();
const express = require('express');

const { addReport, updateReport, getAllReports } = require('../../../controllers/reports-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/admin', upload.single('reportURL'), addReport);
router.put('/admin/:id', upload.single('reportURL'), updateReport);
router.get('/', getAllReports);
router.get('/admin', getAllReports);

module.exports = router;
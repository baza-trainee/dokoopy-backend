require("dotenv").config();
const express = require('express');

const { addPartner, deletePartner, updatePartner, getAllPartners } = require('../../../controllers/partners-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/admin', authMiddleware, upload.single('imageURL'), addPartner);
router.delete('/admin/:id', authMiddleware, deletePartner);
router.put('/admin/:id', authMiddleware, upload.single('imageURL'), updatePartner);
router.get('/', getAllPartners);
router.get('/admin', authMiddleware, getAllPartners);

module.exports = router;
require("dotenv").config();
const express = require('express');

const { addPartner, deletePartner, updatePartner, getAllPartners } = require('../../../controllers/partners-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/admin', upload.single('imageURL'), addPartner);
router.delete('/admin/:id', deletePartner);
router.put('/admin/:id', upload.single('imageURL'), updatePartner);
router.get('/', getAllPartners);
router.get('/admin', getAllPartners);

module.exports = router;
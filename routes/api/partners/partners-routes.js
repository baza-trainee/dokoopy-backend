require("dotenv").config();
const express = require('express');

const { addPartner, deletePartner, updatePartner } = require('../../../controllers/partners-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('imageURL'), addPartner);
router.delete('/:id', authMiddleware, deletePartner);
router.put('/:id', authMiddleware, upload.single('imageURL'), updatePartner);

module.exports = router;
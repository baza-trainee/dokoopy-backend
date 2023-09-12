require("dotenv").config();
const express = require('express');

const { addHero, deleteHero, updateHero } = require('../../../controllers/hero-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('imageURL'), addHero);
router.delete('/:id', authMiddleware, deleteHero);
router.put('/:id', authMiddleware, upload.single('imageURL'), updateHero);

module.exports = router;
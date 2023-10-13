require("dotenv").config();
const express = require('express');

const { addHero, deleteHero, updateHero, getAllHeroes } = require('../../../controllers/hero-controllers');
const upload = require('../../../middlewares/upload');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/admin', authMiddleware, upload.single('imageURL'), addHero);
router.delete('/admin/:id', authMiddleware, deleteHero);
router.patch('/admin/:id', authMiddleware, upload.single('imageURL'), updateHero);
router.get('/', getAllHeroes);
router.get('/admin', authMiddleware, getAllHeroes);

module.exports = router;
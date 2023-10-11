require("dotenv").config();
const express = require('express');

const { addHero, deleteHero, updateHero, getAllHeroes } = require('../../../controllers/hero-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/admin', upload.single('imageURL'), addHero);
router.delete('/admin/:id', deleteHero);
router.patch('/admin/:id', upload.single('imageURL'), updateHero);
router.get('/', getAllHeroes);
router.get('/admin', getAllHeroes);

module.exports = router;
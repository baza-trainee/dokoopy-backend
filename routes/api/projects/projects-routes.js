require("dotenv").config();
const express = require('express');

const { addProject, deleteProject, updateProject } = require('../../../controllers/projects-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('imageURL'), addProject);
router.delete('/:id', authMiddleware, deleteProject);
router.put('/:id', authMiddleware, upload.single('imageURL'), updateProject);

module.exports = router;
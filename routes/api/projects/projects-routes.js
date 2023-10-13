require("dotenv").config();
const express = require('express');

const { addProject, deleteProject, updateProject, getAllProjects } = require('../../../controllers/projects-controllers');
const upload = require('../../../middlewares/upload');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.post('/admin', authMiddleware, upload.single('imageURL'), addProject);
router.delete('/admin/:id', authMiddleware, deleteProject);
router.patch('/admin/:id', authMiddleware, upload.single('imageURL'), updateProject);
router.get('/', getAllProjects);
router.get('/admin', authMiddleware, getAllProjects)

module.exports = router;
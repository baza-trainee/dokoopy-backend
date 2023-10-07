require("dotenv").config();
const express = require('express');

const { addProject, deleteProject, updateProject, getAllProjects } = require('../../../controllers/projects-controllers');
const upload = require('../../../middlewares/upload');
const { authMiddleware } = require('../../../utils/authMiddleware');

const router = express.Router();

router.post('/admin', upload.single('imageURL'), addProject);
router.delete('/admin/:id', deleteProject);
router.put('/admin/:id', upload.single('imageURL'), updateProject);
router.get('/', getAllProjects);
router.get('/admin', getAllProjects)

module.exports = router;
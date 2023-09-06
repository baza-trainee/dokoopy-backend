require("dotenv").config();
const express = require('express');

const { addProject, deleteProject, updateProject } = require('../../../controllers/projects-controllers');
const upload = require('../../../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('imageURL'), addProject);
router.delete('/:id', deleteProject);
router.put('/:id', upload.single('imageURL'), updateProject);

module.exports = router;
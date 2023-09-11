const fs = require('fs/promises');
require("dotenv").config();
const { nanoid } = require('nanoid');
const path = require('path');
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");


const projectsPath = path.join(__dirname, '../db/projects/projects.json');
const projectsDir = path.join(__dirname, '../', 'public', 'projects');

const addProject = async(req, res) => {

    const date = new Date();

    const projects_data = await fs.readFile(projectsPath, 'utf-8');
    const projects = JSON.parse(projects_data)
    const image_id = nanoid();
    const { path: tempUpload, originalname } = req.file;
    const filename = `${image_id}_${originalname}`;
    const resultUpload = path.join(projectsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const imageURL = path.join('projects', filename);
    
    const newProject = {
        id: nanoid(),
        title: req.body.title,
        description: req.body.description,
        imageURL,
        date,
    }

    projects.push(newProject);
    await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));

    res.status(201).json({
        status: 'success',
        code: 201,
        newProject,
    });
};

const deleteProject = async(req, res) => {
    const projects_data = await fs.readFile(projectsPath, 'utf-8');
    const projects = JSON.parse(projects_data);

    const index = projects.findIndex(project => project.id === req.params.id);
    if (index === -1) {
        return null
    }
    projects.splice(index, 1);
    await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Project deleted",
    });
};

const updateProject = async(req, res) => {
    const projects_data = await fs.readFile(projectsPath, 'utf-8');
    const projects = JSON.parse(projects_data);

    const index = projects.findIndex(project => project.id === req.params.id);
    if (index === -1) {
        return null
    };

    let imageURL = "";
    const image_id = nanoid();
    if (req.file) {
        const { path: tempUpload, originalname } = req.file;
        const filename = `${image_id}_${originalname}`;
        const resultUpload = path.join(projectsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        imageURL = path.join('projects', filename);
    }

    const updProject = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageURL,
        date: req.body.date,
    }

    projects.splice(index, 1, updProject);
    await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updProject,
    });
};

module.exports = {
    addProject: controllerWrapper(addProject),
    deleteProject: controllerWrapper(deleteProject),
    updateProject: controllerWrapper(updateProject),
};
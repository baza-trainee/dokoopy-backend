require("dotenv").config();
const HttpError = require("../utils/httpError");
const controllerWrapper = require("../utils/controllerWrapper");
const { Project } = require("../db/models/projects");

const addProject = async(req, res) => {

    let data;
    if (req.file) {
        const uploaded = req.file.path;
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }
    const newProject = await Project.create(data);


    res.status(201).json({
        status: 'success',
        code: 201,
        newProject,
    });
};

const deleteProject = async(req, res) => {
    const { id } = req.params;

    const result = await Project.findByIdAndDelete(id);
    if (!result) {
        throw HttpError.NotFoundError("Project not found");
    }
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Project deleted",
    });
};

const updateProject = async(req, res) => {
    const { id } = req.params;
    let data;
    if (req.file) {
        const uploaded = req.file.path;
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }

    const updProject = await Project.findByIdAndUpdate(id, data, { new: true });

    if (!updProject) {
        throw new HttpError(404, 'Project not found');
    }
        res.status(200).json({
            status: 'success',
            code: 200,
            updProject,
    });
};

const getAllProjects = async(req, res) => {

    const projects = await Project.find({}).sort({ createdAt: -1 });

    if (projects.length === 0) {
        throw HttpError.NotFoundError("Projects not found");
    }

    res.status(200).json({
        projects,
    });
};

module.exports = {
    addProject: controllerWrapper(addProject),
    deleteProject: controllerWrapper(deleteProject),
    updateProject: controllerWrapper(updateProject),
    getAllProjects: controllerWrapper(getAllProjects),
};
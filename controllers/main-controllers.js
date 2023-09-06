const fs = require('fs/promises');
const path = require('path');
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");


const projectsPath = path.join(__dirname, '../db/projects/projects.json');
const partnersPath = path.join(__dirname, '../db/partners/partners.json');

const getAllProjectsAndPartners = async(req, res) => {

    const projectsData = await fs.readFile(projectsPath, 'utf-8');
    if (projectsData.length === 0) {
        throw HttpError.NotFoundError("Projects not found");
    }
    const projects = JSON.parse(projectsData)

    const partnersData = await fs.readFile(partnersPath, 'utf-8');
    if (partnersData.length === 0) {
        throw HttpError.NotFoundError("Partners not found");
    }
    const partners = JSON.parse(partnersData)

    res.status(200).json({
        projects,
        partners,
    });

    return {projects, partners};
}

module.exports = {
    getAllProjectsAndPartners: controllerWrapper(getAllProjectsAndPartners),
};
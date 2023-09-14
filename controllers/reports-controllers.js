const fs = require('fs/promises');
require("dotenv").config();
const { nanoid } = require('nanoid');
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const reportsPath = path.join(__dirname, '../db/reports/reports.json');
const reportsDir = path.join(__dirname, '../', 'public', 'reports');

const addReport = async(req, res) => {

    const reports_data = await fs.readFile(reportsPath, 'utf-8');
    const reports = JSON.parse(reports_data)
    const image_id = nanoid();
    const { path: tempUpload, originalname } = req.file;
    const filename = `${image_id}_${originalname}`;
    const resultUpload = path.join(reportsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const reportURL = path.join('reports', filename);
    
    const newReport = {
        id: nanoid(),
        reportURL,
    }

    reports.push(newReport);
    await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2));

    res.status(201).json({
        status: 'success',
        code: 201,
        newReport,
    });
};

const updateReport = async(req, res) => {
    const reports_data = await fs.readFile(reportsPath, 'utf-8');
    const reports = JSON.parse(reports_data);

    const index = reports.findIndex(report => report.id === req.params.id);
    if (index === -1) {
        return null
    };

    let reportURL = "";
    const image_id = nanoid();
    if (req.file) {
        const { path: tempUpload, originalname } = req.file;
        const filename = `${image_id}_${originalname}`;
        const resultUpload = path.join(reportsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        reportURL = path.join('reports', filename);
    }

    const updReport = {
        id: req.params.id,
        reportURL,
    }

    reports.splice(index, 1, updReport);
    await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updReport,
    });
};

const getAllReports = async(req, res) => {

    const reportsData = await fs.readFile(reportsPath, 'utf-8');
    if (reportsData.length === 0) {
        throw HttpError.NotFoundError("Reports not found");
    }
    const reports = JSON.parse(reportsData)

    res.status(200).json({
        reports,
    });
};

module.exports = {
    addReport: controllerWrapper(addReport),
    updateReport: controllerWrapper(updateReport),
    getAllReports: controllerWrapper(getAllReports),
};
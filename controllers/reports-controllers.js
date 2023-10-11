const { Report } = require("../db/models/reports");
const HttpError = require("../utils/httpError");
const controllerWrapper = require("../utils/controllerWrapper");

const addReport = async (req, res) => {

  const uploaded = req.file.path;
  const newReport = await Report.create({reportURL: uploaded});

  res.status(201).json({
      status: 'success',
      code: 201,
      newReport,
  });  
}

const updateReport = async (req, res) => {

    const { id } = req.params;
    const uploaded = req.file.path;
    const updReport = await Report.findByIdAndUpdate(id, {reportURL: uploaded}, { new: true });

    if (!updReport) {
        throw new HttpError(404, 'Report not found');
    }

        res.status(200).json({
            status: 'success',
            code: 200,
            updReport,
    });
}

const getAllReports = async (req, res) => {
    const result = await Report.find({}).sort({ createdAt: -1 });
    
      if (result.length === 0) {
        throw HttpError.NotFoundError("Notices not found");
      }
	
    res.status(200).json({
      result,
    });  
}

module.exports = {
    addReport: controllerWrapper(addReport),
    updateReport: controllerWrapper(updateReport),
    getAllReports: controllerWrapper(getAllReports),
};
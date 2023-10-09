// const fs = require('fs/promises');
// require("dotenv").config();
// const { nanoid } = require('nanoid');
// const path = require('path');
// const controllerWrapper = require("../utils/controllerWrapper");

// const reportsPath = path.join(__dirname, '../db/reports/reports.json');
// const reportsDir = path.join(__dirname, '../', 'public', 'reports');

// const addReport = async(req, res) => {

//     const reports_data = await fs.readFile(reportsPath, 'utf-8');
//     const reports = JSON.parse(reports_data)
//     const image_id = nanoid();
//     const { path: tempUpload, originalname } = req.file;
//     const filename = `${image_id}_${originalname}`;
//     const resultUpload = path.join(reportsDir, filename);
//     await fs.rename(tempUpload, resultUpload);
//     const reportURL = path.join('reports', filename);
    
//     const newReport = {
//         id: nanoid(),
//         reportURL,
//     }

//     reports.push(newReport);
//     await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2));

//     res.status(201).json({
//         status: 'success',
//         code: 201,
//         newReport,
//     });
// };

// const updateReport = async(req, res) => {
//     const reports_data = await fs.readFile(reportsPath, 'utf-8');
//     const reports = JSON.parse(reports_data);

//     const index = reports.findIndex(report => report.id === req.params.id);
//     if (index === -1) {
//         return null
//     };

//     let reportURL = "";
//     const image_id = nanoid();
//     if (req.file) {
//         const { path: tempUpload, originalname } = req.file;
//         const filename = `${image_id}_${originalname}`;
//         const resultUpload = path.join(reportsDir, filename);
//         await fs.rename(tempUpload, resultUpload);
//         reportURL = path.join('reports', filename);
//     }

//     const updReport = {
//         id: req.params.id,
//         reportURL,
//     }

//     reports.splice(index, 1, updReport);
//     await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2));

//         res.status(200).json({
//             status: 'success',
//             code: 200,
//             updReport,
//     });
// };

// const getAllReports = async(req, res) => {

//     const reportsData = await fs.readFile(reportsPath, 'utf-8');
//     if (reportsData.length === 0) {
//         throw HttpError.NotFoundError("Reports not found");
//     }
//     const reports = JSON.parse(reportsData)

//     res.status(200).json({
//         reports,
//     });
// };

const { Report } = require("../db/models/reports");
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");


const addReport = async (req, res) => {

    console.log(req.file);

    // const { path: tempUpload, originalname } = req.file;
    // const filename = `${id}_${originalname}`;
    // const resultUpload = path.join("https://uashared15.twinservers.net:2083/cpsess3364396298/frontend/jupiter/filemanager/index.html?dirselect=homedir&dir=/public_html/dokoopy_images", filename);
    // await fs.rename(tempUpload, resultUpload);
    // const reportURL = path.join("https://uashared15.twinservers.net:2083/cpsess3364396298/frontend/jupiter/filemanager/index.html?dirselect=homedir&dir=/public_html", filename);
    // console.log(reportURL)
    // const report = {
    //     data: fs.readFileSync(
    //       path.join(__dirname, "../temp/" + req.file.filename), "binary"
    //     ),
    //     contentType: "image/jpg",
    //   }
	
    // const result = await Report.create({report: reportURL});
  
    // res.status(201).json({
    //   result,
    // });  
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
    // updateReport: controllerWrapper(updateReport),
    getAllReports: controllerWrapper(getAllReports),
};
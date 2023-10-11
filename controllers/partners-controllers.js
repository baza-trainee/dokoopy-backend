require("dotenv").config();
const HttpError = require("../utils/httpError");
const controllerWrapper = require("../utils/controllerWrapper");
const { Partner } = require("../db/models/partners");

const addPartner = async(req, res) => {
    let data;
    if (req.file) {
        const uploaded = req.file.path;
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }
    const newPartner = await Partner.create(data);

    res.status(201).json({
        status: 'success',
        code: 201,
        newPartner,
    });  
};

const deletePartner = async(req, res) => {
    const { id } = req.params;

    const result = await Partner.findByIdAndDelete(id);
    if (!result) {
        throw HttpError.NotFoundError("Partner not found");
    }
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Partner deleted",
    });
};

const updatePartner = async(req, res) => {
    const { id } = req.params;
    let data;
    if (req.file) {
        const uploaded = req.file.location;
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }

    const updPartner = await Partner.findByIdAndUpdate(id, data, { new: true });

    if (!updPartner) {
        throw new HttpError(404, 'Partner not found');
    }

        res.status(200).json({
            status: 'success',
            code: 200,
            updPartner,
    });
};

const getAllPartners = async(req, res) => {

    const partners = await Partner.find({}).sort({ createdAt: -1 });

    if (partners.length === 0) {
        throw HttpError.NotFoundError("Partners not found");
    }

    res.status(200).json({
        partners,
    });
}

module.exports = {
    addPartner: controllerWrapper(addPartner),
    deletePartner: controllerWrapper(deletePartner),
    updatePartner: controllerWrapper(updatePartner),
    getAllPartners: controllerWrapper(getAllPartners),
};
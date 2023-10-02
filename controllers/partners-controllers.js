const fs = require('fs/promises');
require("dotenv").config();
const { nanoid } = require('nanoid');
const path = require('path');
const HttpError = require("../utils/HttpError");
const controllerWrapper = require("../utils/controllerWrapper");


const partnersPath = path.join(__dirname, '../db/partners/partners.json');
const partnersDir = path.join(__dirname, '../', 'public', 'partners');

const addPartner = async(req, res) => {

    const partners_data = await fs.readFile(partnersPath, 'utf-8');
    const partners = JSON.parse(partners_data)
    const image_id = nanoid();
    const { path: tempUpload, originalname } = req.file;
    const filename = `${image_id}_${originalname}`;
    const resultUpload = path.join(partnersDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const imageURL = path.join('partners', filename);
    
    const newPartner = {
        id: nanoid(),
        title: req.body.title,
        link: req.body.link,
        imageURL,
    }

    partners.push(newPartner);
    await fs.writeFile(partnersPath, JSON.stringify(partners, null, 2));

    res.status(201).json({
        status: 'success',
        code: 201,
        newPartner,
    });
};

const deletePartner = async(req, res) => {
    const partners_data = await fs.readFile(partnersPath, 'utf-8');
    const partners = JSON.parse(partners_data);

    const index = partners.findIndex(partner => partner.id === req.params.id);
    if (index === -1) {
        return null
    }
    partners.splice(index, 1);
    await fs.writeFile(partnersPath, JSON.stringify(partners, null, 2));
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Partner deleted",
    });
};

const updatePartner = async(req, res) => {
    const partners_data = await fs.readFile(partnersPath, 'utf-8');
    const partners = JSON.parse(partners_data);

    const index = partners.findIndex(partner => partner.id === req.params.id);
    if (index === -1) {
        return null
    };

    let imageURL = "";
    const image_id = nanoid();
    if (req.file) {
        const { path: tempUpload, originalname } = req.file;
        const filename = `${image_id}_${originalname}`;
        const resultUpload = path.join(partnersDir, filename);
        await fs.rename(tempUpload, resultUpload);
        imageURL = path.join('partners', filename);
    } else imageURL = req.body.imageURL;

    const updPartner = {
        id: req.params.id,
        title: req.body.title,
        link: req.body.link,
        imageURL,
    }

    partners.splice(index, 1, updPartner);
    await fs.writeFile(partnersPath, JSON.stringify(partners, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updPartner,
    });
};

const getAllPartners = async(req, res) => {

    const partnersData = await fs.readFile(partnersPath, 'utf-8');
    if (partnersData.length === 0) {
        throw HttpError.NotFoundError("Partners not found");
    }
    const partners = JSON.parse(partnersData)

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
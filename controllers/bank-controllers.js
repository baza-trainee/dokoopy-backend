require("dotenv").config();
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/HttpError");
const { Bank } = require("../db/models/bank");

const updateBank = async(req, res) => {
    const { id } = req.params;
    const { link } = req.body;
    const updBank = await Bank.findByIdAndUpdate(id, {link: link}, {new: true});
    if(!updBank) {
      throw new HttpError(404, 'Bank link not found');
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      updBank,
    });
};

const getAllRequisites = async(req, res) => {

    const bank = await Bank.find({})
  
    if (bank.length === 0) {
      throw HttpError.NotFoundError("Bank link not found");
    }
  
    res.status(200).json({
      bank,
    });
};

module.exports = {
    updateBank: controllerWrapper(updateBank),
    getAllRequisites: controllerWrapper(getAllRequisites),
};
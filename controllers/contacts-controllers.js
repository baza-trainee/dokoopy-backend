require("dotenv").config();
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/HttpError");
const { Contact } = require("../db/models/contacts");

const updateContact = async(req, res) => {
    const { id } = req.params;
    const { email, telegram } = req.body;

    const updContact = await Contact.findByIdAndUpdate(id, {email: email, telegram: telegram}, {new: true});
    if(!updContact) {
        throw new HttpError(404, 'Contacts not found');
    }
    res.status(201).json({
        status: 'success',
        code: 200,
        updContact,
    });
};

const getAllContacts = async(req, res) => {
    const contacts = await Contact.find({}, "-createdAt -updatedAt",)

    if (contacts.length === 0) {
        throw HttpError.NotFoundError("Contacts not found");
    }

    res.status(200).json({
        contacts,
    });
};

module.exports = {
    updateContact: controllerWrapper(updateContact),
    getAllContacts: controllerWrapper(getAllContacts),
};
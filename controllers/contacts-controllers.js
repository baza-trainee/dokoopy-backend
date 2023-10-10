require("dotenv").config();
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/HttpError");
const { Contact } = require("../db/models/contacts");

const updateContact = async(req, res) => {
    const updContact = {
        email: req.body.email,
        data: req.body.telegram,
    }

    await fs.writeFile(contactsPath, JSON.stringify(updContact, null, 2));
    
    res.status(200).json({
        status: 'success',
        code: 200,
        updContact,
    });
};

const getAllContacts = async(req, res) => {
    const contacts = await Contact.find({})

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
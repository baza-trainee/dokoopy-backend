const fs = require('fs/promises');
require("dotenv").config();
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const contactsPath = path.join(__dirname, '../db/contacts/contacts.json');

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

module.exports = {
    updateContact: controllerWrapper(updateContact),
};
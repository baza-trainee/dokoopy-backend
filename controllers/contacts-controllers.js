const fs = require('fs/promises');
require("dotenv").config();
const { nanoid } = require('nanoid');
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const contactsPath = path.join(__dirname, '../db/contacts/contacts.json');

const updateContact = async(req, res) => {
    const contacts_data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contacts_data);

    const index = contacts.findIndex(contact => contact.id === req.params.id);
    if (index === -1) {
        return null
    };

    const updContact = {
        id: req.params.id,
        name: req.body.name,
        data: req.body.data,
    }

    contacts.splice(index, 1, updContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updContact,
    });
};

module.exports = {
    updateContact: controllerWrapper(updateContact),
};
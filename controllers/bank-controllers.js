const fs = require('fs/promises');
require("dotenv").config();
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const bankPath = path.join(__dirname, '../db/bank/bank.json');

const updateBank = async(req, res) => {
    const updBank = {
        link: req.body.link,
    }

    await fs.writeFile(bankPath, JSON.stringify(updBank, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updBank,
    });
};

module.exports = {
    updateBank: controllerWrapper(updateBank),
};
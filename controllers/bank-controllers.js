const fs = require('fs/promises');
require("dotenv").config();
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const bankPath = path.join(__dirname, '../db/bank/bank.json');

const updateBank = async(req, res) => {
    const bank_data = await fs.readFile(bankPath, 'utf-8');
    const bank = JSON.parse(bank_data);

    const updBank = {
        link: req.body.link,
    }

    bank.splice(0, 1, updBank);
    await fs.writeFile(bankPath, JSON.stringify(bank, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updBank,
    });
};

module.exports = {
    updateBank: controllerWrapper(updateBank),
};
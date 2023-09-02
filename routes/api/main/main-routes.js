require("dotenv").config();
const express = require('express');

const { getAllProjectsAndPartners} = require('../../../controllers/main-controllers')

const router = express.Router();

router.get('/', getAllProjectsAndPartners);

module.exports = router;
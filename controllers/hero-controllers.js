require("dotenv").config();
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/httpError");
const { Hero } = require("../db/models/heroes");

const addHero = async(req, res) => {
    let data;
    if (req.file) {
        console.log(req.file)
        const uploaded = req.file.path;
        console.log(uploaded)
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }
    const newHero = await Hero.create(data);

    res.status(201).json({
        status: 'success',
        code: 201,
        newHero,
    });  
};

const deleteHero = async(req, res) => {
    const { id } = req.params;

    const result = await Hero.findByIdAndDelete(id);
    if (!result) {
        throw HttpError.NotFoundError("Hero not found");
    }
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Hero deleted",
    });
};

const updateHero = async(req, res) => {
    const { id } = req.params;
    let data;
    if (req.file) {
        console.log(req.file)
        const uploaded = req.file.location;
        data = { ...req.body, imageURL: uploaded}
    } else {
        data = { ...req.body }
    }

    const updHero = await Hero.findByIdAndUpdate(id, data, { new: true });

    if (!updHero) {
        throw new HttpError(404, 'Hero not found');
    }

    res.status(200).json({
        status: 'success',
        code: 200,
        updHero,
    });
};

const getAllHeroes = async(req, res) => {

    const heroes = await Hero.find({}).sort({ createdAt: -1 });

    if (heroes.length === 0) {
        throw HttpError.NotFoundError("Heroes not found");
    }

    res.status(200).json({
        heroes,
    });
};

module.exports = {
    addHero: controllerWrapper(addHero),
    deleteHero: controllerWrapper(deleteHero),
    updateHero: controllerWrapper(updateHero),
    getAllHeroes: controllerWrapper(getAllHeroes),
};
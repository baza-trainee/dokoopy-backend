const fs = require('fs/promises');
require("dotenv").config();
const { nanoid } = require('nanoid');
const path = require('path');
const controllerWrapper = require("../utils/controllerWrapper");

const heroesPath = path.join(__dirname, '../db/heroes/heroes.json');
const heroesDir = path.join(__dirname, '../', 'public', 'heroes');

const addHero = async(req, res) => {
    const date = new Date();

    const heroes_data = await fs.readFile(heroesPath, 'utf-8');
    const heroes = JSON.parse(heroes_data)
    const image_id = nanoid();
    const { path: tempUpload, originalname } = req.file;
    const filename = `${image_id}_${originalname}`;
    const resultUpload = path.join(heroesDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const imageURL = path.join('heroes', filename);
    
    const newHero = {
        id: nanoid(),
        title: req.body.title,
        description: req.body.description,
        imageURL,
        date,
    }

    heroes.push(newHero);
    await fs.writeFile(heroesPath, JSON.stringify(heroes, null, 2));

    res.status(201).json({
        status: 'success',
        code: 201,
        newHero,
    });
};

const deleteHero = async(req, res) => {
    const heroes_data = await fs.readFile(heroesPath, 'utf-8');
    const heroes = JSON.parse(heroes_data);

    const index = heroes.findIndex(hero => hero.id === req.params.id);
    if (index === -1) {
        return null
    }
    heroes.splice(index, 1);
    await fs.writeFile(heroesPath, JSON.stringify(heroes, null, 2));
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: "Hero deleted",
    });
};

const updateHero = async(req, res) => {
    const heroes_data = await fs.readFile(heroesPath, 'utf-8');
    const heroes = JSON.parse(heroes_data);

    const index = heroes.findIndex(hero => hero.id === req.params.id);
    if (index === -1) {
        return null
    };

    let imageURL = "";
    const image_id = nanoid();
    if (req.file) {
        const { path: tempUpload, originalname } = req.file;
        const filename = `${image_id}_${originalname}`;
        const resultUpload = path.join(heroesDir, filename);
        await fs.rename(tempUpload, resultUpload);
        imageURL = path.join('heroes', filename);
    }

    const updHero = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageURL,
        date: req.body.date,
    }

    heroes.splice(index, 1, updHero);
    await fs.writeFile(heroesPath, JSON.stringify(heroes, null, 2));

        res.status(200).json({
            status: 'success',
            code: 200,
            updHero,
    });
};

const getAllHeroes = async(req, res) => {

    const heroesData = await fs.readFile(heroesPath, 'utf-8');
    if (heroesData.length === 0) {
        throw HttpError.NotFoundError("Heroes not found");
    }
    const heroes = JSON.parse(heroesData)

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
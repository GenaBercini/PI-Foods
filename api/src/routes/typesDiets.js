const { Router } = require('express');
const { Diets } = require('../db.js');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        await Diets.bulkCreate([
            {name: "gluten free"},
            {name: "lacto ovo vegetarian"},
            {name: "vegan"},
            {name: "pescatarian"},
            {name: "paleolithic"},
            {name: "primal"},
            {name: "fodmap friendly"},
            {name: "dairy free"},
            {name: "whole 30"},
        ]);
        let allDiets = await Diets.findAll();
        res.json(allDiets);

    }
    catch(e) {
        res.status(404).json({ message: 'An error has occurred', error: e });
    }
});

module.exports = router;
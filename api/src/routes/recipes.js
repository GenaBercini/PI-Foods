const { Router } = require('express');
const { Op } = require('sequelize');
const { Recipe, Diets } = require('../db.js');
const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById
} = require('./utils.js');

const router = Router();

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            let recipeNameAPI = await getRecipeByQuery(name);
            let recipeNameDB = await Recipe.findAll({
                where: {
                    name: { [Op.substring]: name }
                }
            });
            if (recipeNameDB.length > 0) {
                return res.json(recipeNameDB);
            }
            else if (recipeNameAPI.length > 0) {
                return res.json(recipeNameAPI);
            }
            else {
                return res.status(404).json({ message: 'Recipe Not Found' })
            }
        }
        else {
            return res.status(404).json({ message: 'Recipe Not Found' })
        }
    }
    catch (e) {
        res.status(404).json({ message: 'An error has occurred', error: e })
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id) {
            if (id.length > 15) {
                let recipeIdDB = await Recipe.findByPk(parseInt(id), {
                    include: [{
                        model: Diets,
                        attributes: ['name'],
                    }]
                });
                if (recipeIdDB) {
                    return res.json(recipeIdDB);
                }
                else {
                    res.status(404).json({ message: 'Recipe Not Found' })
                }
            }

            let recipeIdAPI = await getRecipeById(parseInt(id));
            if (recipeIdAPI.length > 0) {
                return res.json(recipeIdAPI)
            }
            else {
                res.status(404).json({ message: 'Recipe Not Found' });
            }
        }
    }
    catch (e) {
        res.status(404).json({ message: 'An error has occurred', error: e })
    }
});


router.post('/', async (req, res, next) => {
    const { name, healthScore, spoonacularScore, image, summary, steps, diets } = req.body;
    try {
        let newRecipe = await Recipe.create({
            name,
            healthScore,
            spoonacularScore,
            image,
            summary,
            steps,
            diets
        });

        let dietDB = await Diets.findAll({
            where: {
                name: diets
            }
        });

        newRecipe.addDiets(dietDB);
        res.send('Successfully created recipe');
    }
    catch (e) {
        res.status(404).json({ message: 'An error has occurred', error: e });
    }
});

module.exports = router;
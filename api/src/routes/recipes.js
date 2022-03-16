const { Router } = require('express');
const { Op } = require('sequelize');
const { Recipe, Diets } = require('../db.js');
const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById
} = require('./utils.js');

const router = Router();

router.get('/all', async (req, res, next) => {
    try {
        let allRecipes = await getAllRecipes();
        res.json(allRecipes);
    }
    catch (e) {
        next(e)
    }
})

router.get('/', (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            let recipeNameAPI = getRecipeByQuery(name);
            let recipeNameDB = Recipe.findAll({
                where: {
                    name: { [Op.substring]: name }
                }
            });
            Promise.all([recipeNameAPI, recipeNameDB])
                .then(response => {
                    const responseAPI = response[0];
                    const responseDB = response[1]

                    if (responseAPI) {
                        return res.json(responseAPI)
                    }
                    else if (responseDB) {
                        return res.json(responseDB);
                    }
                    return res.status(404).json({ message: 'Recipe Not Found' })
                })
        }
    }
    catch (e) {
        next(e);
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
            if (recipeIdAPI) {
                res.json(recipeIdAPI);
            }
            else {
                res.status(404).json({ message: 'Recipe Not Found' });
            }
        }
    }
    catch (e) {
        next(e);
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
        next(e);
    }
});

module.exports = router;
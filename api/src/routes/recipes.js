const { Router } = require('express');
const { Op } = require('sequelize');
const { Recipe, Diets } = require('../db.js');
const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById
} = require('./utils.js');

const router = Router();

router.get('/', (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            let recipeNameAPI = getRecipeByQuery(name);
            let recipeNameDB = Recipe.findAll({
                where: {
                    title: { [Op.iLike]: `%${name}%`}
                },
                include: Diets,
            });
            Promise.all([recipeNameAPI, recipeNameDB])
                .then(response => {
                    const responseAPI = response[0];
                    const responseDB = response[1]

                    if (responseAPI.length > 0) {
                        return res.json(responseAPI)
                    }
                    else if (responseDB) {
                        return res.json(responseDB);
                    }
                })
        }
        else {
                return getAllRecipes()
                .then(response => {
                    res.json(response);
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
                let recipeIdDB = await Recipe.findByPk(id, {
                    include: {
                        model: Diets,
                        attributes: ['name'],
                    },
                });
                if (recipeIdDB) {
                    return res.json(recipeIdDB);
                }
                else {
                    res.status(404).json({ message: 'Recipe Not Found' })
                }
            }

            let recipeIdAPI = await getRecipeById(id);
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
    const { title, healthScore, spoonacularScore, image, summary, steps, diets } = req.body;
    try {
        let newRecipe = await Recipe.create({
            title,
            healthScore,
            spoonacularScore,
            image,
            summary,
            steps
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
        res.status(404).json({msg:"Error", error: e});
    }
});

module.exports = router;
const { Router } = require('express');
const { Op } = require('sequelize');
const { Recipe, Diets } = require('../db.js');
const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById,
    getAllRecipeForApi
} = require('./utils.js');

const router = Router();

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            //--WHIT API--
            // let recipeNameAPI = getRecipeByQuery(name);
            //--WHITOUT API--
            let recipeNameDB = await Recipe.findAll({
                where: {
                    title: { [Op.iLike]: `%${name}%` }
                },
                include: Diets,
            });
            return res.json(recipeNameDB)
            //--WHIT API--
            // Promise.all([recipeNameAPI, recipeNameDB])
            //     .then(response => {
            //         const responseAPI = response[0];
            //         const responseDB = response[1]

            //         if (responseAPI.length > 0) {
            //             return res.json(responseAPI)
            //         }
            //         else if (responseDB) {
            //             return res.json(responseDB);
            //         }
            //     })
        }
        else {
            let response = await getAllRecipes()
            return res.json(response)
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
            if (id.length > 30) {
                //--WHITOUT API--
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
            //--WHIT API--
            // let recipeIdAPI = await getRecipeById(id);
            // if (recipeIdAPI) {
            //     res.json(recipeIdAPI);
            // }
            // else {
            //     res.status(404).json({ message: 'Recipe Not Found' });
            // }
        }
    }
    catch (e) {
        next(e);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        let recipeDeleted = await Recipe.findByPk(id)
        await recipeDeleted.destroy();
        res.send('Successfully deleted recipe');
    }
    catch (e) {
        res.status(404).json({ msg: "Error", error: e });
    }
})


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
        res.status(404).json({ msg: "Error", error: e });
    }
});

router.post('/create', async (req, res, next) => {
    try {
        // let allRecipesFromApi = []
        // if(allRecipesFromApi.length < 1) allRecipesFromApi = await getAllRecipeForApi();
        // let DBRecipes = await getAllRecipes();
        // let missingRecipes = allRecipesFromApi.filter(recipe => recipe.title.toLowerCase() !== DBRecipes.title.toLowerCase());
        // if (allRecipesFromApi.length > 0) {
        //     allRecipesFromApi.map(async (element) => {
        //         let instructions = element.analyzedInstructions[0]?.steps.map(e => e.step);
        //         let step = instructions?.toString();
        //         let diet = element.diets;
        //         let recipeNew = await Recipe.create({
        //                 title: element.title,
        //                 healthScore: element.healthScore,
        //                 spoonacularScore: element.spoonacularScore,
        //                 image: element.image,
        //                 summary: element.summary,
        //                 steps: step
        //             });
        //         let arrayDiets = await Diets.findAll({
        //             where: {
        //                 name: diet
        //             }
        //         });
        //         recipeNew.addDiets(arrayDiets);
        //     })
        // };
        let allRecipesFromApi = await getAllRecipeForApi();
        allRecipesFromApi.map(async (element) => {
            let instructions = element.analyzedInstructions[0]?.steps.map(e => e.step);
            let step = instructions?.toString();
            let diet = element.diets;
            let recipeNew = await Recipe.create({
                title: element.title,
                healthScore: element.healthScore,
                spoonacularScore: element.spoonacularScore,
                image: element.image,
                summary: element.summary,
                steps: step
            });
            let arrayDiets = await Diets.findAll({
                where: {
                    name: diet
                }
            });
            recipeNew.addDiets(arrayDiets);
        });
        res.send('Succesfully')
    }
    catch (e) {
        res.status(404).json({ msg: "Error", error: e });
    }
});

module.exports = router;
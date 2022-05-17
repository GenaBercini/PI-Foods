const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById,
    getAllRecipeForApi
} = require('./utils');
const { Recipe, Diets } = require('../db.js');

const recipeControllers = {
    getRecipes: async (req, res, next) => {
        const { name } = req.query;
        try {
            if (name) {
                let allRecipes = await getAllRecipes();
                let response = await getRecipeByQuery(name, allRecipes);
                return res.json(response);
            }
            else {
                let response = await getAllRecipes();
                return res.json(response);
            }
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
    getOneRecipe: async (req, res, next) => {
        const { id } = req.params;
        try {
            if (id) {
                //-- WITH API --
                // if (id.length > 30) {
                //     let recipeIdDB = await Recipe.findByPk(id, {
                //         include: {
                //             model: Diets,
                //             attributes: ['name'],
                //         },
                //     });
                //     if (recipeIdDB) {
                //         return res.json(recipeIdDB);
                //     }
                //     else {
                //         return res.status(404).json({ message: 'Recipe Not Found' })
                //     }
                // }
                // let recipeIdAPI = await getRecipeById(id);
                // if (recipeIdAPI) {
                //     return res.json(recipeIdAPI);
                // }
                // else {
                //     return res.status(404).json({ message: 'Recipe Not Found' });
                // }
                // -- WITHOUT API --
                if (id.length > 30) {
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
                        return res.status(404).json({ message: 'Recipe Not Found' })
                    }
                }
            }
            else {
                return res.status(404).json({ message: 'All parameters are required' })
            }
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
    deleteRecipe: async (req, res, next) => {
        const { id } = req.params;
        try {
            let recipeDeleted = await Recipe.findByPk(id);
            if(recipeDeleted.dataValues.createDB) {
                await recipeDeleted.destroy();
                return res.send('Successfully deleted recipe');
            }
            else {
                return res.status(404).json({ msg: "Can't delete api recipes", error: e });
            }
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
    postRecipe: async (req, res, next) => {
        const { title, healthScore, spoonacularScore, image, summary, steps, minutes, diets } = req.body;
        try {
            let newRecipe = await Recipe.create({
                title,
                healthScore,
                minutes,
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
    },
    allToDb: async (req, res, next) => {
        try {
            let allRecipesFromApi = await getAllRecipeForApi();
            allRecipesFromApi.map(async (element) => {
                let steps = element.analyzedInstructions[0]?.steps.map(e => e.step);
                let diet = element.diets;
                let recipeNew = await Recipe.create({
                    title: element.title,
                    healthScore: element.healthScore,
                    minutes: element.readyInMinutes,
                    spoonacularScore: element.spoonacularScore,
                    image: element.image,
                    summary: element.summary,
                    steps: steps,
                    createDB: false
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
    }
}

module.exports = recipeControllers;
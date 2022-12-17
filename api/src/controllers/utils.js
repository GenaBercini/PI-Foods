const axios = require('axios');
const { Recipe, Diets } = require('../db.js');
const {
    API_KEY
} = process.env;
module.exports = {
    getAllRecipeForApi: async () => {
        let responseAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        return responseAPI.data.results;
    },
    getAllRecipes: async () => {
        try {
            //-- WITH API --
            // let responseAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
            // let responseDB = Recipe.findAll({ include: Diets })
            // return Promise.all([responseAPI, responseDB]).then(response => {
            //     let dataAPI = [];
            //     response[0].data.results.map(recipe => {
            //         let steps = recipe.analyzedInstructions[0]?.steps.map(e => e.step);
            //         let obj = {
            //             id: recipe.id,
            //             minutes: recipe.readyInMinutes,
            //             title: recipe.title,
            //             healthScore: recipe.healthScore,
            //             spoonacularScore: recipe.spoonacularScore,
            //             image: recipe.image,
            //             summary: recipe.summary,
            //             steps: steps,
            //             diets: recipe.diets,
            //             createDB: false
            //         }
            //         dataAPI.push(obj)
            //     });
            //     if (response[1].length > 0) {
            //         return [...dataAPI, ...response[1]];
            //     }
            //     return dataAPI;
            // })
            //-- WITHOUT API --
            let responseDB = await Recipe.findAll({ include: Diets })
            return responseDB;
        }
        catch (e) {
            return e;
        }
    },
    getRecipeById: async (id) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            let steps = response.data.analyzedInstructions[0]?.steps.map(e => e.step);
            let dataAPI = {
                id: response.data.id,
                minutes: response.data.readyInMinutes,
                title: response.data.title,
                healthScore: response.data.healthScore,
                pricePerServing: Math.trunc(response.data.pricePerServing),
                image: response.data.image,
                summary: response.data.summary,
                steps: steps,
                diets: response.data.diets,
                createDB: false
            }
            return dataAPI;
        }
        catch (e) {
            return e;
        }
    },
    getRecipeByQuery: async (query, obj) => {
        try {
            const recipeFound = obj.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));
            return recipeFound;
        }
        catch (e) {
            return e;
        }
    }
}
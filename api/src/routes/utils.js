const axios = require('axios');
// const API_KEY = 'e9e6d803bb254bcea0206478920fe94d';
// const API_KEY = 'bbb4b96713e54cff8ac0b727485510b3';
// const API_KEY = 'f5e5da7d1c1b43ccbf1bf374699dbc54';
const API_KEY = '94105a04c38d4791ab6ca621339a8221';
const { Recipe, Diets } = require('../db.js');

module.exports = {
    getAllRecipes: () => {
        try {
            let responseAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&`);
            let responseDB = Recipe.findAll({
                include: {
                    model: Diets,
                }
            });
            return Promise.all([responseAPI, responseDB])
                .then(resp => {
                    const [respAPI, respDB] = resp
                    console.log(respDB)
                    return [...respAPI.data.results, ...respDB];
                });
        }
        catch (e) {
            return e;
        }
    },
    getRecipeById: async (id) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            return response.data;
        }
        catch (e) {
            return e;
        }
    },
    getRecipeByQuery: async (query) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
            const recipeFound = response.data.results.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));
            return recipeFound;
        }
        catch (e) {
            return e;
        }
    }
}
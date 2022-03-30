const axios = require('axios');
const { Recipe, Diets } = require('../db.js');
const {
    API_KEY
  } = process.env;
module.exports = {
    getAllRecipes: () => {
        try {
            let responseAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
            let responseDB = Recipe.findAll({
                include: {
                    model: Diets,
                }
            });
            return Promise.all([responseAPI, responseDB])
                .then(resp => {
                    const [respAPI, respDB] = resp
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
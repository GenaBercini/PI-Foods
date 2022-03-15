const axios = require('axios');
const API_KEY = 'e9e6d803bb254bcea0206478920fe94d';

module.exports = {
    getAllRecipes: async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
            return response.data.results;
        }
        catch (e) {
            return e;
        }
    },
    getRecipeById: async (id) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
            const recipeId = response.data.results.filter(element => element.id === id);
            return recipeId;
        }
        catch (e) {
            return e;
        }
    },
    getRecipeByQuery: async (query) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
            const recipeFound = response.data.results.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));
            return recipeFound;
        }
        catch (e) {
            return e;
        }
    }
}
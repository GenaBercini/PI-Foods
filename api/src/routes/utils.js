const axios = require('axios');
// const API_KEY = 'e9e6d803bb254bcea0206478920fe94d';
// const API_KEY = 'bbb4b96713e54cff8ac0b727485510b3';
// const API_KEY = 'bf4b5a80a2024be1b681d466a4e0c99e';
// const API_KEY = '64a78f4484a244ce932be990c783fce9';
const { Recipe, Diets } = require('../db.js');
const {
    API_KEY
  } = process.env;
// &number=100
module.exports = {
    getAllRecipes: () => {
        try {
            let responseAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
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
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
            const recipeFound = response.data.results.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));
            return recipeFound;
        }
        catch (e) {
            return e;
        }
    }
}
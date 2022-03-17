import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_RECIPES_BY_QUERY = "GET_RECIPES_BY_QUERY"
export const CREATE_RECIPE = "CREATE_RECIPE";

export function getRecipes() {
    return function(dispatch) {
        axios.get('http://localhost:3001/recipes')
        .then(response => {
            dispatch({type: GET_RECIPES, payload: response.data});
        })
        .catch(error => console.log(error));
    }
};

export function getRecipeById(id) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(response => {
            dispatch({type: GET_RECIPE_BY_ID, payload: response.data});
        })
        .catch(error => console.log(error))
    }
};

export function getRecipeByQuery(query) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/recipes?name=${query}`)
        .then(response => {
            dispatch({type: GET_RECIPES_BY_QUERY, payload: response.data})
        })
        .catch(error => console.log(error))
    }
}

export function createRecipe() {
    return async function(dispatch) {
        let response = await axios.post('http://localhost:3001/recipes');
        dispatch({type: CREATE_RECIPE, payload: response});
    }
}
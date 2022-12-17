import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS"
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_RECIPES_BY_QUERY = "GET_RECIPES_BY_QUERY"
export const CREATE_RECIPE = "CREATE_RECIPE";
export const LOADING = "LOADING";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const DELETE_RECIPE = "DELETE_RECIPE";

export function getRecipes(query) {
    return function (dispatch) {
        dispatch({ type: LOADING })
        if (query) {
            axios.get(`/recipes?name=${query}`)
                .then(response => {
                    console.log(response.data)
                    return dispatch({ type: GET_RECIPES_BY_QUERY, payload: response.data })
                })
                .catch(error => console.log(error));
        }
        else {
            axios.get('/recipes')
                .then(response => {
                    return dispatch({ type: GET_RECIPES, payload: response.data });
                })
                .catch(error => console.log(error));
        }
    }
};

export function getRecipeById(id) {
    return function (dispatch) {
        dispatch({ type: LOADING })
        axios.get(`/recipes/${id}`)
            .then(response => {
                return dispatch({ type: GET_RECIPE_BY_ID, payload: response.data });
            })
            .catch(error => console.log(error))
    }
};

export function getDiets() {
    return function (dispatch) {
        axios.get(`/types`)
            .then(response => {
                return dispatch({ type: GET_DIETS, payload: response.data })
            })
            .catch(error => console.log(error))
    }
}

export function createRecipe(input) {
    return function () {
        axios.post('/recipes', input)
            .then((response) => {
                return response.json;
            })
    }
}

export function deleteRecipe(id) {
    return function () {
        axios.delete(`/recipes/delete/${id}`)
            .then(response => {
                return response;
            })
            .catch(error => console.log(error))
    }
}

export function filterByName(payload) {
    return {
        type: FILTER_BY_NAME,
        payload,
    }
}

export function filterByScore(payload) {
    return {
        type: FILTER_BY_SCORE,
        payload,
    }
}

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload,
    }
}
import {GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPES_BY_QUERY, CREATE_RECIPE} from './actions.js';

let initialState = {
    recipes: [],
    recipesDetail: [],
    infoCreate: [],
}

export default function foodReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipesDetail: action.payload
            }
        case GET_RECIPES_BY_QUERY:
            return{
                ...state,
                recipes: action.payload
            }
        default:
            return state;
    }
}


import {
    GET_RECIPES,
    GET_RECIPE_BY_ID,
    GET_RECIPES_BY_QUERY,
    LOADING, GET_DIETS,
    FILTER_BY_NAME,
    FILTER_BY_SCORE,
    FILTER_BY_DIETS } from './actions.js';

let initialState = {
    filtered: [],
    recipes: [],
    recipesDetail: [],
    diets: [],
    loading: false,
}

export default function foodReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filtered: action.payload,
                loading: false,
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipesDetail: action.payload,
                loading: false,
            }
        case GET_RECIPES_BY_QUERY:
            return{
                ...state,
                filtered: action.payload,
                loading: false,
            }
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            }
        case FILTER_BY_SCORE:
            let scoreArray = action.payload === 'Lowerest' ?
            state.filtered.sort((a,b) => {
                if(a.spoonacularScore > b.spoonacularScore) return 1;
                if(b.spoonacularScore > a.spoonacularScore) return -1;
                return 0;
            }) : state.filtered.sort((a,b) => {
                if(a.spoonacularScore < b.spoonacularScore) return 1;
                if(b.spoonacularScore < a.spoonacularScore) return -1;
                return 0;
            });
            return {
                ...state,
                filtered: scoreArray,
            } 
        case FILTER_BY_NAME:
            let nameArray = action.payload ==='A-Z' ?
            state.filtered.sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
                return 0;
            }) 
            : state.filtered.sort(function(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
                return 0;
            });
            return {
                ...state,
                filtered: nameArray,
            }
        case FILTER_BY_DIETS:
            const dietsFiltered = action.payload === "All"
            ? state.recipes
            : state.filtered.filter(e => e.diets.includes(action.payload) || e.diets.map((e) => e.name).includes(action.payload)
            );
            return {
                ...state,
                filtered: dietsFiltered,
            };
            default:
                return state;
            }
        }
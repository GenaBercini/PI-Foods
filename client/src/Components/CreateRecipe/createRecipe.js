import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './createRecipe.module.css';
import CreateRecipeFirst from './createRecipeFirst';
import CreateRecipeSecond from './createRecipeSecond';

export default function CreateRecipe() {
    let recipes = useSelector((state) => state.recipes)
    let [button, SetButton] = useState(true);
    let [form, setForm] = useState(true);
    let [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        minutes: "",
        spoonacularScore: "",
        stepsOne: '',
        stepsTwo: '',
        stepsThree: '',
        stepsFour: '',
        stepsFive: '',
        steps: [],
        diets: [],
        image: "",
    });
    let [error, setError] = useState({
        title: "Invalid Name or this name already exist, please use at least one letter at the beginning",
        summary: "Invalid Summary, please use at least one letter at the beginning",
        healthScore: "Invalid Health Score, please write a number between 0 and 100",
        minutes: "Invalid Minutes, please write a number",
        spoonacularScore: "Invalid Score, please write a number between 0 and 100",
        steps: "Invalid Steps, please write use at least one letter at the beginning",
        diets: "Invalid Diets, select one or more diets",
        image: "Invalid Image, please upload a image",
    });

    function validate(input) {
        let errorData = {
            title: "Invalid Name or this name already exist, please use at least one letter at the beginning",
            summary: "Invalid Summary, please use at least one letter at the beginning",
            healthScore: "Invalid Health Score, please write a number between 0 and 100",
            minutes: "Invalid Minutes, please write a number",
            spoonacularScore: "Invalid Score, please write a number between 0 and 100",
            steps: "Invalid Steps, please write use at least one letter at the beginning",
            diets: "Invalid Diets, select one or more diets",
            image: "Invalid Image, please upload a image",
        }

        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.title.trim()) && input.title.trim().length > 0) {
            let recipeExists = recipes.filter(e => e.title.toLowerCase() === input.title.toLowerCase());
            recipeExists.length === 0 && delete errorData.title;
        }
        if (typeof input.image === 'string' && input.image.trim().length > 0) {
            delete errorData.image;
        }
        if (typeof input.summary === 'string' && input.summary.trim().length > 0) {
            delete errorData.summary;
        }
        if (parseInt(input.healthScore) >= 0 && parseInt(input.healthScore) <= 100) {
            delete errorData.healthScore;
        }
        if (typeof parseInt(input.minutes) === 'number' && input.minutes.trim().length > 0) {
            delete errorData.minutes;
        }
        if (parseInt(input.spoonacularScore) >= 0 && parseInt(input.spoonacularScore) <= 100) {
            delete errorData.spoonacularScore;
        }
        if ((typeof input.stepsOne === 'string' && input.stepsOne.trim().length > 0) ||
        (typeof input.stepsTwo === 'string' && input.stepsTwo.trim().length > 0) ||
        (typeof input.stepsThree === 'string' && input.stepsThree.trim().length > 0) ||
        (typeof input.stepsFour === 'string' && input.stepsFour.trim().length > 0) ||
        (typeof input.stepsFive === 'string' && input.stepsFive.trim().length > 0)) {
            delete errorData.steps;
        }
        if (input.diets.length > 0) {
            delete errorData.diets;
        }
        Object.keys(errorData).length === 0 ? SetButton(false) : SetButton(true);
        return errorData;
    }

    return (
        <div className={s.formDiv}>
            {form ? 
            <CreateRecipeFirst setInput={setInput} input={input} error={error} setError={setError} validate={validate} setForm={setForm}/>
            :
            <CreateRecipeSecond setInput={setInput} input={input} error={error} setError={setError} validate={validate} setForm={setForm} button={button}/>
            }
        </div>
    )
};
import React from "react";

export default function CreateRecipe() {
    return (
            <form>
                <label>Name: </label><input type="text" placeholder="Recipe name"></input>
                <label>Summary: </label><input type="text" placeholder="Summary of recipe"></input>
                <label>Health Level: </label><input type="number" placeholder="Level"></input>
                <label>Score: </label><input type="number" placeholder="Score"></input>
                <label>Steps: </label><input type="text" placeholder="Steps"></input>
                <label>Diets: </label><div>Opciones de Diets</div>
                <button type="submit">Create</button>
            </form>
    )
};
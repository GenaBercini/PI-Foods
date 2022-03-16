import React from "react";

export default function RecipeCard(id, img, name,diets) {
    return(
        <div>
            <div>
                <img src={props.img}/>
            </div>
            <h1>{props.name}</h1>
            <p>Diets: </p><p>{props.diets}</p>
            <Link to={`/recipe/${props.id}`}><div>Details</div></Link>
        </div>
    )
}


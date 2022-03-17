import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
    let recipeDiets = []
    if (props.diets) {
        props.diets.forEach(diet => diet.name && recipeDiets.push(diet.name));
    }
    let diets = recipeDiets.length > 0 ? recipeDiets : props.diets;
    return (
        <div>
            <img src={props.img} alt={props.title} width="280px" height="200px"/>
            <div>
                <span>{props.title}</span>
                <div>
                {
                    diets ?
                        diets.map(e => (
                            <span>{e}</span>
                        )) : ""
                }
                </div>
                <Link to={`/recipes/${props.id}`}><button>More</button></Link>
            </div>
        </div>
    )
}


import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export default function Card(props) {
    let recipeDiets = []
    if (props.diets) {
        props.diets.forEach(diet => diet.name && recipeDiets.push(diet.name));
    }
    let diets = recipeDiets.length > 0 ? recipeDiets : props.diets;
    return (
        <div className="card">
            <div className="card-text">
                <span className="card-title">{props.title}</span>
                <span className="card-score"><b>Score: </b>{props.spoonacularScore}</span>
                <div className="card-diets">
                <span><b>Diets</b></span>
                {
                    diets ?
                        diets.map(e => (
                            <span key={e}>{e}</span>
                        )) : ""
                }
                </div>
                <img className="card-image" src={props.img} alt={props.title}/>
                <Link to={`/recipes/${props.id}`}><button className="card-btn">More</button></Link>
            </div>
        </div>
    )
}


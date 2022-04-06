import React from "react";
import { useNavigate } from "react-router-dom";
import './Card.css'

export default function Card(props) {
    let navigate = useNavigate()
    let recipeDiets = []
    if (props.diets) {
        props.diets.forEach(diet => diet.name && recipeDiets.push(diet.name));
    }
    let diets = recipeDiets.length > 0 ? recipeDiets : props.diets;

    function handleDetails() {
        navigate(`/recipes/${props.id}`)
    }
    return (
        <div className="card" onClick={handleDetails}>
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
                </div>
            <div className="card-image" >
                <img src={props.img} alt={props.title}/>
            </div>
        </div>
    )
}


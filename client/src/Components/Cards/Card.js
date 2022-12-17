import React from "react";
import { useNavigate } from "react-router-dom";
import s from './Card.module.css'

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
        <div className={s.cardContainer} onClick={handleDetails}>
             <h3 className={s.cardTitle}>{props.title}</h3>
            <div className={s.cardText}>
                <div className={s.cardDiets}>
                <span><b>Diets</b></span>
                {
                    diets ?
                        diets.map(e => (
                            <span key={e}>{e}</span>
                        )) : ""
                }
                </div>
                <span><b>Price per serving: </b>{props.pricePerServing}</span>
                <span className={s.data}><b>Ready: </b>in {props.minutes} minutes</span>
                </div>
                <img className={s.cardImg} src={props.img} alt={props.title}/>
        </div>
    )
}


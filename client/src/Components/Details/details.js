import { React, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getRecipeById } from '../../Reducer/actions';
import Loading from '../Loading/loading';

export default function DetailRecipe() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipeById(id))
    },[dispatch]);
    let {id} = useParams();
    let details = useSelector((state) => state.recipesDetail)

    let diets = details.diets && details.diets.length > 0 ? details.diets[0].name : details.diets;

    let instructions = details.analizedInstructions && details.analizedInstructions.length > 0 ? details.analizedInstructions[0].steps : details.steps;
    if(details) {
        return (
        <div>
            <div>
                <img src={details.image}/>
            </div>
            <div>
                <h1>{details.title}</h1>
                <h2>{diets}</h2>
                <p>{details.summary}   </p>
                <span>{details.healthScore}</span>
                <span>{details.spoonacularScore}</span>
                <p>{instructions}Steps</p>
            </div>
        </div>
    )
    }
    else {
        return (
            <div>
                <Loading/>
            </div>
        )
    }
}
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../Reducer/actions';
import Loading from '../Loading/loading';
import Card from './Card';

export default function Cards() {

    let allRecipes = useSelector((state)=> state.recipes);

    let dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getRecipes());
    },[]);

    if(allRecipes && allRecipes.length > 0) {
    return (
        <div>
            {
                allRecipes?.map((e) => {
                    return (
                    <Card
                    id= {e.id}
                    key= {e.id}
                    title= {e.title}
                    img= {e.image}
                    diets= {e.diets}/>
                )})
            }
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
import { React, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../Reducer/actions';
import Loading from '../Loading/loading';
import notFounded from '../../Utils/notfounded.png'
import './details.css'

export default function DetailRecipe() {
    let dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getRecipeById(id))
    }, [id, dispatch]);

    let details = useSelector((state) => state.recipesDetail);
    let loading = useSelector((state) => state.loading);

    let diets = details.createDB ? details.diets.map(e => e.name) : details.diets;
    let instructions = details.analyzedInstructions && details.analyzedInstructions.length > 0 ? details.analyzedInstructions[0].steps.map(e => e.step) : details.steps;
    let founded = details.name ? false : true;
    if (details) {
        return (
            <div className='details'>
                {
                    loading ? (<div className='details-loading'>
                        <Loading />
                    </div>)
                        : founded ? (

                            <div className='details-card'>
                                <div className='details-img-btn'>
                                    <img className='detals-image' src={details.image} alt={details.title}/>
                                    <Link className='details-btn' to={'/home'}><div>BACK</div></Link>
                                </div>
                                <div className='details-text'>
                                    <h1 className='text-title'>{details.title}</h1>
                                    <p><b className='text-title'>Diets: </b>{diets}</p>
                                    <p><b className='text-title'>Summary</b></p>
                                    <div className='summary' dangerouslySetInnerHTML={{ __html: details.summary }}></div>
                                    <p className='health'><b className='text-title'>Health Score: </b>{details.healthScore}</p>
                                    <p className='score'><b className='text-title'>Food Score: </b>{details.spoonacularScore}</p>
                                    <p className='steps'><b className='text-title'>Instructions: </b>{instructions}</p>
                                </div>
                            </div>
                        )
                            :
                            (
                                <div className='error-recipe'>
                                    <img src={notFounded} alt='notFound'/>
                                    <p>Details Not Exist For That</p>
                                </div>
                            )
                }
            </div>
        )
    }
}
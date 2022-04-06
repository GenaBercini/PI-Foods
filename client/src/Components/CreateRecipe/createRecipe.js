import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecipe, getDiets, getRecipes } from '../../Reducer/actions';
import imgDefault from '../../Utils/default.png';
import Footer from '../Footer/footer.js';
import './createRecipe.css';

export default function CreateRecipe() {

    let navigate = useNavigate();

    let recipes = useSelector((state) => state.recipes)

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    let dietTypes = useSelector((state) => state.diets)

    let [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        spoonacularScore: "",
        steps: "",
        diets: [],
        image: "",
    });
    let [error, setError] = useState({
        title: "Invalid Name or this name already exist, please use at least one letter at the beginning",
        summary: "Invalid Summary, please use at least one letter at the beginning",
        healthScore: "Invalid Health Score, please write a number between 0 and 100",
        spoonacularScore: "Invalid Score, please write a number between 0 and 100",
        steps: "Invalid Steps, please write use at least one letter at the beginning",
        diets: "Invalid Diets, select one or more diets",
        image: "Invalid Image, please upload a image",
    });

    let [button, SetButton] = useState(true);

    function handleBack(e) {
        e.preventDefault()
        navigate('/home');
    }

    function onSubmit(e) {
        e.preventDefault()
        if (!Object.keys(error).length &&
            input.title &&
            input.summary &&
            input.healthScore &&
            input.spoonacularScore &&
            input.steps &&
            input.diets &&
            input.image) {
            dispatch(createRecipe(input));
            alert('Recipe created!')
            setInput({
                title: "",
                summary: "",
                healthScore: "",
                spoonacularScore: "",
                steps: "",
                diets: [],
                image: "",
            });
            navigate('/home');
        }
        else {
            alert('ERROR, Recipe not created');
        }
    }

    function onChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function onCheck(e) {
        !input.diets.includes(e.target.value) &&
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        setError(validate({
            ...input,
            diets: [...input.diets, e.target.value]
        }))
    };

    function onDelete(element) {
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== element)
        })
        setError(validate({
            ...input,
            diets: input.diets.filter(e => e !== element)
        }))
    }

    function validate(input) {
        let errorData = {
            title: "Invalid Name or this name already exist, please use at least one letter at the beginning",
            summary: "Invalid Summary, please use at least one letter at the beginning",
            healthScore: "Invalid Health Score, please write a number between 0 and 100",
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
        if (parseInt(input.spoonacularScore) >= 0 && parseInt(input.spoonacularScore) <= 100) {
            delete errorData.spoonacularScore;
        }
        if (typeof input.steps === 'string' && input.steps.trim().length > 0) {
            delete errorData.steps;
        }
        if (input.diets.length > 0) {
            delete errorData.diets;
        }
        Object.keys(errorData).length === 0 ? SetButton(false) : SetButton(true);
        return errorData;
    }

    return (
        <div className='form-div'>
            <form className='form' onSubmit={onSubmit}>
            <div className='column-one'>
                <div>
                    <div>Name</div>
                    <input
                        type="text"
                        value={input.title}
                        placeholder="Name"
                        name="title"
                        onChange={onChange} />
                    <p className='danger'>{error.title}</p>
                </div>
                <div>
                    <div>Health Level</div>
                    <input
                        type="range"
                        value={input.healthScore}
                        placeholder="Health"
                        name="healthScore"
                        min='0'
                        max='100'
                        step='1'
                        onChange={onChange} />
                    <div>{input.healthScore ? input.healthScore : 50}</div>
                    <p className='danger'>{error.healthScore}</p>
                </div>
                <div>
                    <div>Score</div>
                    <input
                        type="range"
                        value={input.spoonacularScore}
                        placeholder="Score"
                        name="spoonacularScore"
                        min='0'
                        max='100'
                        step='1'
                        onChange={onChange} />
                    <div>{input.spoonacularScore ? input.spoonacularScore : 50}</div>
                    <p className='danger'>{error.spoonacularScore}</p>
                </div>
                <div>
                    <div>Diets Options </div>
                    <select value={input.diets.length > 0 ? 'Select Another' : 'Select Diet'} onChange={onCheck}>
                        <option disabled>{input.diets.length > 0 ? 'Select Another' : 'Select Diet'}</option>
                        {
                            dietTypes.map(e => (
                                <option value={e.name}>{e.name}</option>
                            ))
                        }
                    </select>
                    <div className='diets-btn'>
                        {
                            input.diets.map(e => (
                                <div className='div-diets'>
                                    <p>{e}</p><button className='delete-btn' type='button' onClick={() => onDelete(e)}>X</button>
                                </div>
                            ))}
                    </div>
                </div>
                <p className='danger'>{error.diets}</p>
                </div>
                <div className='column-two'>
                <div>
                    <div>
                        <div>Image</div>
                        <input
                        type="text"
                        value={input.image}
                        placeholder="image"
                        name="image"
                        onChange={onChange} />
                    </div>
                    <div className='image'>
                    <img src={input.image ? input.image : imgDefault} alt='imgForm'/>
                    </div>
                    <p className='danger'>{error.image}</p>
                </div>
                <div>
                    <div>Summary</div>
                    <input
                        type="text"
                        value={input.summary}
                        placeholder="Summary"
                        name="summary"
                        onChange={onChange} />
                    <p className='danger'>{error.summary}</p>
                </div>
                <div>
                    <label>Steps:</label>
                    <textarea
                        type="text"
                        value={input.steps}
                        placeholder="Steps"
                        name="steps"
                        onChange={onChange}
                        cols="60"
                        rows="10" />
                    <p className='danger'>{error.steps}</p>
                </div>
                </div>
                <div className='form-btn'>
                    <button disabled={button} className={button ? 'btn-disable' : 'btn-form'} type="submit">Create</button>
                    <button type='button' className='btn-form' onClick={handleBack}>Back</button>
                </div>
            </form>
            <Footer />
        </div>
    )
};
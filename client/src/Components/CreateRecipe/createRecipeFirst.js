import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDiets, getRecipes } from '../../Reducer/actions';
import s from './createRecipe.module.css';

export default function CreateRecipeFirst({ setInput, input, error, setError, validate, setForm }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let dietTypes = useSelector((state) => state.diets)
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    function handleNext(e) {
        e.preventDefault();
        setForm(false);
    }

    function handleBack(e) {
        e.preventDefault()
        navigate('/home');
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

    return (
        <div>
            <form>
                <div className={s.firstForm}>
                    <button type='button' className={s.btnForm} onClick={handleBack}>Back</button>
                    <div>
                        <div>Name</div>
                        <input
                            className={s.formInput}
                            type="text"
                            value={input.title}
                            placeholder="Name"
                            name="title"
                            onChange={onChange} />
                        <p className={s.danger}>{error.title}</p>
                    </div>
                    <div>
                        <div>Preparation Time in Minutes</div>
                        <input
                            className={s.formInput}
                            type="number"
                            value={input.minutes}
                            placeholder="minutes"
                            name="minutes"
                            onChange={onChange} />
                        <p className={s.danger}>{error.minutes}</p>
                    </div>
                    <div className={s.rangesContainer}>
                        <div className={s.rangeContainer}>
                            <div>Health Level</div>
                            <input
                                className={s.formRange}
                                type="range"
                                value={input.healthScore}
                                placeholder="Health"
                                name="healthScore"
                                min='0'
                                max='100'
                                step='1'
                                onChange={onChange} />
                            <div>{input.healthScore ? input.healthScore : 50}</div>
                            <p className={s.dangerRange}>{error.healthScore}</p>
                        </div>
                        <div className={s.rangeContainer}>
                            <div>Price</div>
                            <input
                                className={s.formRange}
                                type="range"
                                value={input.pricePerServing}
                                placeholder="Price"
                                name="pricePerServing"
                                min='0'
                                max='1000'
                                step='1'
                                onChange={onChange} />
                            <div>{input.pricePerServing ? input.pricePerServing : 500}</div>
                            <p className={s.dangerRange}>{error.pricePerServing}</p>
                        </div>
                    </div>
                    <div>
                        <div>Diets Options </div>
                        <select className={s.formInput} value={input.diets.length > 0 ? 'Select Another' : 'Select Diet'} onChange={onCheck}>
                            <option disabled>{input.diets.length > 0 ? 'Select Another' : 'Select Diet'}</option>
                            {
                                dietTypes.map(e => (
                                    <option value={e.name}>{e.name}</option>
                                ))
                            }
                        </select>
                        <div className={s.dietsBlock}>
                            <div className={s.dietsBtn}>
                                {
                                    input.diets.map(e => (
                                        <div className={s.divDiets}>
                                            <p>{e}</p><button className={s.deleteBtn} type='button' onClick={() => onDelete(e)}>X</button>
                                        </div>
                                    ))}
                            </div>
                            <p className={s.danger}>{error.diets}</p>
                        </div>
                    </div>
                    <button className={s.btnForm} type='button' onClick={handleNext}>Next</button>
                </div>
            </form>
        </div>
    )
};
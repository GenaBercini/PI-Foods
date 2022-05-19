import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../Reducer/actions';
import imgDefault from '../../Utils/default.png';
import s from './createRecipe.module.css';

export default function CreateRecipeSecond({ setInput, input, error, setError, validate, setForm, button }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    function handleBack(e) {
        e.preventDefault()
        navigate('/home');
    }

    function onSubmit(e) {
        e.preventDefault()
        input.stepsOne.length > 0 ? input.steps.push(input.stepsOne) : delete input.stepsOne
        input.stepsTwo.length > 0 ?  input.steps.push(input.stepsTwo) : delete input.stepsTwo
        input.stepsThree.length > 0 ?  input.steps.push(input.stepsThree) : delete input.stepsThree
        input.stepsFour.length > 0 ? input.steps.push(input.stepsFour) : delete input.stepsFour
        input.stepsFive.length > 0 ? input.steps.push(input.stepsFive) : delete input.stepsFive
        if (!Object.keys(error).length &&
            input.title &&
            input.summary &&
            input.healthScore &&
            input.spoonacularScore &&
            input.diets &&
            input.steps &&
            input.image &&
            input.minutes) {
            dispatch(createRecipe(input));
            alert('Recipe created!')
            setInput({
                title: "",
                summary: "",
                healthScore: "",
                minutes: "",
                spoonacularScore: "",
                stepsOne: '',
                stepsTwo: '',
                stepsThree: '',
                stepsFour: '',
                stepsFive: '',
                steps: [],
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

    function handleStep(e) {
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

    function handleBack(e) {
        e.preventDefault()
        setForm(true);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={s.secondForm}>
                    <button type='button' className={s.btnForm} onClick={handleBack}>Back</button>
                    <div>
                        <div>
                            <div>Image</div>
                            <input
                            className={s.formInput}
                                type="text"
                                value={input.image}
                                placeholder="image"
                                name="image"
                                onChange={onChange} />
                        </div>
                        <div className={s.img}>
                            <img src={input.image ? input.image : imgDefault} alt='imgForm' />
                        </div>
                        <p className={s.danger}>{error.image}</p>
                    </div>
                    <div>
                        <div>Summary</div>
                        <input
                        className={s.formInput}
                            type="text"
                            value={input.summary}
                            placeholder="Summary"
                            name="summary"
                            onChange={onChange} />
                        <p className={s.danger}>{error.summary}</p>
                    </div>
                    <div>
                        <div>Steps:</div>
                        <div><label>1º</label><input className={s.formInput} type="text" value={input.stepsOne} placeholder="Step 1º" name="stepsOne" onChange={handleStep} /></div>
                        <div><label>2º</label><input className={s.formInput} type="text" value={input.stepsTwo} placeholder="Step 2º" name="stepsTwo" onChange={handleStep} /></div>
                        <div><label>3º</label><input className={s.formInput} type="text" value={input.stepsThree} placeholder="Step 3º" name="stepsThree" onChange={handleStep} /></div>
                        <div><label>4º</label><input className={s.formInput} type="text" value={input.stepsFour} placeholder="Step 4º" name="stepsFour" onChange={handleStep} /></div>
                        <div><label>5º</label><input className={s.formInput} type="text" value={input.stepsFive} placeholder="Step 5º" name="stepsFive" onChange={handleStep} /></div>
                        <p className={s.danger}>{error.steps}</p>
                    </div>
                    <button disabled={button} className={button ? s.btnDisable : s.btnForm} type="submit">Create</button>
                </div>
            </form>
        </div>
    )
};

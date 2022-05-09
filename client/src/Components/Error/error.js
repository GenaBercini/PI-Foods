import React from "react";
import notFounded from "../../Utils/notfounded.png"
import s from './error.module.css';
import { useNavigate } from "react-router-dom";

export default function Error({message, handleReset, error}) {
    const navigate = useNavigate();
    function handleBack(e) {
        e.preventDefault();
        if(error) {
          navigate('/home');
        }
        else {
            handleReset(e);
        }
        
    }
    return (
        <div className={s.errorContainer}>
                <img className={s.errorImg} src={notFounded} alt='notFound' />
                <p>{message}</p>
                <button className={s.errorBtn} onClick={(e) => handleBack(e)}>Go back</button>
        </div>
    )
}
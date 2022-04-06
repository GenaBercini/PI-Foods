import React from "react";
import notFounded from "../../Utils/notfounded.png"
import './error.css';

export default function Error({message}) {
    return (
        <div className='error-url'>
                <img src={notFounded} alt='notFound' />
                <p>{message}</p>
        </div>
    )
}
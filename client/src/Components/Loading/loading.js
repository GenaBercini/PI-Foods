import React from "react";
import loadingGif from '../../Utils/vietnamese.gif'
import s from './loading.module.css';

export default function Loading() {
    return (
        <div className={s.loadingContainer}>
            <img className={s.loadingImg} src={loadingGif} alt="loading-gif"/>
        </div>
    )
}
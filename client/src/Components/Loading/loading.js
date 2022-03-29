import React from "react";
import "./loading.css";
import loadingGif from '../../Utils/vietnamese.gif'
import './loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <img className="loading-image" src={loadingGif} alt="loading-gif"/>
        </div>
    )
}
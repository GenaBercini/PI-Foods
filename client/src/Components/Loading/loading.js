import React from "react";
import "./loading.css";
import loading from '../../Utils/vietnamese.gif'
import './loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <img className="loading-image" src={loading} alt="loading-gif"/>
        </div>
    )
}
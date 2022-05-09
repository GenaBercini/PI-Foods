import React from "react";
import { Link } from "react-router-dom";
import s from "./landingPage.module.css"

export default function LandingPage() {
    return (
        <div className={s.container}>
            <div className={s.textContainer}>
                    <h1>Be Happy Cooking!</h1>
                    <Link to='/home'>
                        <button className={s.button}>JOIN NOW</button>
                    </Link>
            </div>
        </div>
    );
}
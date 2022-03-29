import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="container-join">
                <div className="text">
                    <h1>Be Happy Cooking!</h1>
                </div>
                <div>
                    <Link to='/home'>
                        <button className="button">JOIN NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
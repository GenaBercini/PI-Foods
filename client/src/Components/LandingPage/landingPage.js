import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="container-join">
                <div className="text">
                    <h1>Welcome</h1>
                    <h1>To</h1>
                    <h1>Gena Foods</h1>
                </div>
                <div className="landing-page-button">
                    <Link to='/home'>
                        <button className="button">¡JOIN!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
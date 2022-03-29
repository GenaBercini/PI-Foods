import React from "react";
import Logo from '../../Utils/receta.png';
import './footer.css';

export default class Footer extends React.Component {
    render() {
        return (
        <footer className="footer">
            <img className="footer-logo" src={Logo} alt="Logo"></img>
            <p>Copyright © 2022 Henry. Genaro Bercini</p>
        </footer>
        )
    }
}
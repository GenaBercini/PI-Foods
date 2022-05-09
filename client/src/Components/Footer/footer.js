import React from "react";
import Logo from '../../Utils/receta.png';
import s from './footer.module.css';

export default class Footer extends React.Component {
    render() {
        return (
        <footer className={s.footerContainer}>
            <img className={s.footerImg} src={Logo} alt="Logo"></img>
            <p>Copyright © 2022 Henry. Genaro Bercini</p>
        </footer>
        )
    }
}
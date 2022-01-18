import React from "react";
import './Menu.css';
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="menu">
            <ul className="menu__container">
                <Link to="/gallery"><li className="menu__item">Gallery</li></Link>
                <Link to="/"><li className="menu__item">About</li></Link>
            </ul>
        </div>
    );
}

export default Menu;

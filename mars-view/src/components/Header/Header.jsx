import React from "react";
import Menu from "../Menu/Menu";
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__name">Mars View</div>
                <Menu />
            </div>
        </div>
    );
}

export default Header;

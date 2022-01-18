import React from "react";
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__mars">
                <div className="loader__rotate_2">
                    <div className="loader__deimos"></div>
                    <div className="loader__rotate_1">
                        <div className="loader__phobos"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;

import React from "react";
import './PhotoPreview.css';

const PhotoPreview = (props) => {
    return (
        <div className="preview">
            <img src={props.img} alt="" />
        </div>
    );
}

export default PhotoPreview;

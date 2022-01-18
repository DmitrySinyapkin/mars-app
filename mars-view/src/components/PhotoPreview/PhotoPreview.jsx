import React from "react";
import './PhotoPreview.css';

const PhotoPreview = (props) => {
    return (
        <div className="preview">
            <figure><img src={props.img} alt="" /></figure>
        </div>
    );
}

export default PhotoPreview;

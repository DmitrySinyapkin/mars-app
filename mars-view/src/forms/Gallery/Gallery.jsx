import React, { useState } from "react";
import './Gallery.css';
import Loader from "../../components/Loader/Loader";

const Gallery = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="gallery">
            {loading && <Loader />}
        </div>
    );
}

export default Gallery;

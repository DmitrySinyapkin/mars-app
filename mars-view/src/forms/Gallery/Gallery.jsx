import React, { useEffect, useState } from "react";
import './Gallery.css';
import { getRoverPhotos } from "../../api/nasaApi";
import Loader from "../../components/Loader/Loader";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getRoverPhotos('curiosity', 150)
            .then(response => {
                setPhotos(response.photos);
                setLoading(false);
            });
    }, [])

    return (
        <div className="gallery">
            {loading ? <Loader />
                : <div className="gallery__cantainer">
                    {photos.map((item, index) => 
                        <PhotoPreview img={item.img_src} key={index} />
                    )}
                </div>
            }
        </div>
    );
}

export default Gallery;

import React, { useEffect, useState } from "react";
import './Gallery.css';
import { getRoverPhotos } from "../../api/nasaApi";
import Loader from "../../components/Loader/Loader";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getRoverPhotos('curiosity', 150, page)
            .then(response => {
                setPhotos(response.photos);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        setPage(page + 1);
        if (fetching) {
            getRoverPhotos('curiosity', 150, page + 1)
            .then(response => {
                setPhotos([...photos, ...response.photos]);
            })
            .finally(() => setFetching(false));
        }
    }, [fetching])

    const handleScroll = (event) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }

    return (
        <div className="gallery">
            {loading ? <div className="loader__container"><Loader /></div>
                : <div className="gallery__cantainer">
                    {photos.map((item, index) => 
                        <PhotoPreview img={item.img_src} key={index} />
                    )}
                </div>
            }
            {fetching && <div className="loader__container"><Loader /></div>}
        </div>
    );
}

export default Gallery;

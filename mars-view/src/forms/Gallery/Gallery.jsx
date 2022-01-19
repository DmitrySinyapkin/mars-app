import React, { useEffect, useState } from "react";
import './Gallery.css';
import { getRoverPhotos, getRoverInfo } from "../../api/nasaApi";
import Loader from "../../components/Loader/Loader";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [rover, setRover] = useState('curiosity');
    const [sol, setSol] = useState(2);
    const [total, setTotal] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getRoverInfo(rover)
            .then(response => setTotal(response.photo_manifest.photos[sol].total_photos));
        getRoverPhotos(rover, sol, page)
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
        console.log('fetching');
        if (fetching) {
            setPage(page + 1);
            getRoverPhotos(rover, sol, page + 1)
            .then(response => setPhotos([...photos, ...response.photos]))
            .finally(() => setFetching(false));
        }
    }, [fetching])

    const handleScroll = (event) => {
        if ((event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 50) && photos.length < total) {
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

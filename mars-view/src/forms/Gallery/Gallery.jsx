import React, { useEffect, useState } from "react";
import './Gallery.css';
import { getRoverPhotos, getRoverInfo } from "../../api/nasaApi";
import Loader from "../../components/Loader/Loader";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import SelectionBlock from "../../components/SelectionBlock/SelectionBlock";

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
        getRoverInfo(rover)
            .then(response => setTotal(response.photo_manifest.photos[sol].total_photos));
        getRoverPhotos(rover, sol, page)
            .then(response => {
                setPhotos(response.photos);
                setLoading(false);
            });
    }, [rover, sol])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (fetching) {
            getRoverPhotos(rover, sol, page + 1)
            .then(response => {
                setPhotos([...photos, ...response.photos]);
                setPage(page + 1);
            })
            .finally(() => setFetching(false));
        }
    }, [fetching])

    const handleScroll = (event) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 20 && photos.length === total) {
            setFetching(true);
        }
    }

    const handleSelection = (rover, sol) => {
        setLoading(true);
        setRover(rover);
        setSol(sol);
    }

    return (
        <div className="gallery">
            <SelectionBlock handler={handleSelection} />
            {loading ? <div className="loader__container"><Loader /></div>
                : <div className="gallery__cantainer">
                    {photos.map((item, index) => 
                        <PhotoPreview img={item.img_src} key={index} />
                    )}
                </div>
            }
            {fetching && photos.length < total && <div className="loader__container"><Loader /></div>}
        </div>
    );
}

export default Gallery;

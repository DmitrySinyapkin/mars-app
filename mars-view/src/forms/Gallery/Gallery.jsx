import React, { useEffect, useState } from "react";
import './Gallery.css';
import Typewriter from "typewriter-effect";
import { getRoverPhotos, getRoverInfo } from "../../api/nasaApi";
import Loader from "../../components/Loader/Loader";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import SelectionBlock from "../../components/SelectionBlock/SelectionBlock";

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [rover, setRover] = useState('curiosity');
    const [sol, setSol] = useState(0);
    const [total, setTotal] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [noPhoto, setNoPhoto] = useState(false);

    useEffect(() => {
        setNoPhoto(false);
        getRoverInfo(rover)
            .then(response => setTotal(response.photo_manifest.photos[sol].total_photos));
        getRoverPhotos(rover, sol, page)
            .then(response => {
                setPhotos(response.photos);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        setNoPhoto(false);
        getRoverInfo(rover)
            .then(response => setTotal(response.photo_manifest.photos[sol].total_photos));
        getRoverPhotos(rover, sol, 1)
            .then(response => {
                if (response.photos.length === 0) {
                    setNoPhoto(true);
                    setPhotos([]);
                } else {
                    setPhotos(response.photos);
                    setPage(1);
                }
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
            {fetching && photos.length < total && <div className="loader__container_2"><Loader /></div>}
            {noPhoto && <div className="gallery__no-photo-message">
                    <Typewriter onInit={(typewriter) => {
                        typewriter
                            .typeString('There are no photos taken this sol')
                            .pauseFor(200)
                            .start()
                        }}
                    />
                </div>
            }
        </div>
    );
}

export default Gallery;

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import './Carousel.css';
import Typewriter from "typewriter-effect";
import { gsap } from 'gsap';

const Carousel = ({images, currentIndex, isOpen, closeHandler}) => {
    const [current, setCurrent] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [clickNext, setClickNext] = useState(false);
    const [clickPrev, setClickPrev] = useState(false);

    const imgRefs = useRef([]);
    imgRefs.current = [];

    useEffect(() => {
        setCurrent(currentIndex);
        setPhotos(images);
    }, []);

    useEffect(() => {
        gsap.to(imgRefs[current], {duration: 1, x: -35, rotationY: 90});
        gsap.to(imgRefs[current + 1], {duration: 1, delay: 0.5, x: -35, rotationY: 90});
    }, [clickNext]);

    useEffect(() => {
        gsap.to(imgRefs[current], {duration: 2, x: 35, rotationY: -90});
        gsap.to(imgRefs[current - 1], {duration: 2, delay: 1, x: 35, rotationY: -90});
    }, [clickPrev]);

    const addToRefs = (item) => {
        if (item && !imgRefs.current.includes(item)) {
            imgRefs.current.push(item);
        }
    }

    const handleNextClick = () => {
        if (current < photos.length - 1) {
            setClickNext(!clickNext);
            setCurrent(current + 1);
        }
    }

    const handlePrevClick = () => {
        if (current > 0) {
            setClickPrev(!clickPrev);
            setCurrent(current - 1);
        }
    }

    return (
        <div className={`carousel ${isOpen && "carousel_opened"}`}>
            <div className="carousel__wrapper">
                <div className="carousel__close">
                    <div className="carousel__close-btn" onClick={closeHandler}>X</div>
                </div>
                <div className="carousel__body">
                    <div className="carousel__container">
                        <div className="carousel__img-wrapper">
                            {photos.map((img, index) =>
                                <div
                                    className={`carousel__img ${index === current ? "img_current" : index < current ? "img_left" : "img_right"}`}
                                    key={index}
                                    ref={addToRefs}
                                    style={{zIndex: `${index === current ? 300 : index > current ? 300 + images.length - index : 300 + index}`}}
                                >
                                    <img src={img.img_src} alt=" " />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="carousel__description">
                        {/*<Typewriter onInit={(typewriter) => {
                            typewriter
                                .typeString(`Earth date: ${images[current].earth_date}<br>`)
                                .pauseFor(200)
                                .typeString(`Camera: ${images[current].camera.full_name}`)
                                .pauseFor(200)
                                .start()
                            }}
                        />*/}
                        <div>Earth date: {images[current].earth_date}</div>
                        <div>Camera: {images[current].camera.full_name}</div>
                    </div>
                </div>
                <div className="carousel__nav">
                    <div className="carousel__prev-btn" onClick={() => handlePrevClick()}>&lt;</div>
                    <div className="carousel__next-btn" onClick={() => handleNextClick()}>&gt;</div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;

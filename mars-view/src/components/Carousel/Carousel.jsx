import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import './Carousel.css';
import { gsap } from 'gsap';

const Carousel = ({images, currentIndex, isOpen, closeHandler}) => {
    const [current, setCurrent] = useState(0);
    const [clickNext, setClickNext] = useState(false);
    const [clickPrev, setClickPrev] = useState(false);

    const imgRefs = useRef([]);
    imgRefs.current = [];

    useEffect(() => {
        setCurrent(currentIndex);
    }, []);

    useEffect(() => {
        const onKeydown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick();
            } if (event.key === 'ArrowRight') {
                handleNextClick();
            } if (event.key === 'Escape') {
                closeHandler();
            }
        }
        document.addEventListener('keydown', onKeydown);
        return () => {
          document.removeEventListener('keydown', onKeydown);
        };
      }, []);

    useLayoutEffect(() => {
        gsap.to(imgRefs.current[current], {duration: 1, x: '-108.5%', transformOrigin: 'right center', rotationY: 60});
        gsap.to(imgRefs.current[current + 1], {duration: 1, delay: 0.5, x: '-108.5%', rotationY: 0});
        gsap.to(imgRefs.current[current - 1], {duration: 1, delay: 0.1, visibility: 'hidden'});
        gsap.to(imgRefs.current[current + 2], {duration: 0.2, delay: 1.5, visibility: 'visible'});
    }, [clickNext]);

    useLayoutEffect(() => {
        gsap.to(imgRefs.current[current], {duration: 1, x: "108.5%", transformOrigin: 'left center', rotationY: -60});
        gsap.to(imgRefs.current[current - 1], {duration: 1, delay: 1, x: "108.5%", rotationY: 0});
        gsap.to(imgRefs.current[current + 1], {duration: 1, delay: 0.5, visibility: 'hidden'});
        gsap.to(imgRefs.current[current - 2], {duration: 0.2, delay: 1.5, visibility: 'visible'});
    }, [clickPrev]);

    const addToRefs = (item) => {
        if (item && !imgRefs.current.includes(item)) {
            imgRefs.current.push(item);
        }
    }

    const handleNextClick = () => {
        if (current < images.length - 1) {
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
                            {images.map((img, index) =>
                                <div
                                    className={`carousel__img ${index === current ? "img_current" : index < current ? "img_left" : "img_right"}`}
                                    key={index}
                                    ref={addToRefs}
                                    style={{visibility: `${index < current - 1 || index > current + 1 ? "hidden" : "visible"}`}}
                                >
                                    <img src={img.img_src} alt=" " />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="carousel__description">
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

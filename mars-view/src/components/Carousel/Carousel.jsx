import React, { useState } from "react";
import './Carousel.css';
import Typewriter from "typewriter-effect";

const Carousel = ({images, currentIndex, isOpen, closeHandler}) => {
    const [current, setCurrent] = useState(currentIndex);

    return (
        <div className={`carousel ${isOpen && "carousel_opened"}`}>
            <div className="carousel__wrapper">
                <div className="carousel__close">
                    <div className="carousel__close-btn" onClick={closeHandler}>X</div>
                </div>
                <div className="carousel__body">
                    <div className="carousel__container">
                        <div className="carousel__img">
                            <img src={images[current].img_src} alt=" " />
                        </div>
                    </div>
                    <div className="carousel__description">
                        <Typewriter onInit={(typewriter) => {
                            typewriter
                                .typeString(`Earth date: ${images[current].earth_date}<br>`)
                                .pauseFor(200)
                                .typeString(`Camera: ${images[current].camera.full_name}`)
                                .pauseFor(200)
                                .start()
                            }}
                        />
                    </div>
                </div>
                <div className="carousel__nav">
                    <div className="carousel__prev-btn">&lt;</div>
                    <div className="carousel__next-btn">&gt;</div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;

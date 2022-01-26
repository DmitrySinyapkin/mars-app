import React, { useEffect, useRef } from "react";
import './About.css';
import Typewriter from "typewriter-effect";
import { ABOUT_TEXT } from "../../constants/aboutPageText";
import { Link } from "react-router-dom";
import { gsap } from 'gsap';

const About = () => {
    const linkRef = useRef(null);

    useEffect(() => {
        gsap.to(linkRef.current, {duration: 0.3, delay: 23.2, visibility: 'visible'});
    }, [])

    return (
        <div className="about">
            <Typewriter onInit={(typewriter) => {
                typewriter
                    .typeString(ABOUT_TEXT[0])
                    .pauseFor(200)
                    .typeString(ABOUT_TEXT[1])
                    .pauseFor(200)
                    .typeString(ABOUT_TEXT[2])
                    .pauseFor(200)
                    .typeString(ABOUT_TEXT[3])
                    .pauseFor(200)
                    .typeString(ABOUT_TEXT[4])
                    .pauseFor(200)
                    .start()
            }}
            />
            <div className="about__link" ref={linkRef}><Link to="/gallery">move to gallery</Link></div>
        </div>
    );
}

export default About;

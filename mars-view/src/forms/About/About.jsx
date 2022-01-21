import React from "react";
import './About.css';
import Typewriter from "typewriter-effect";
import { ABOUT_TEXT } from "../../constants/aboutPageText";

const About = () => {
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
        </div>
    );
}

export default About;

import React, { useState } from "react";
import './SelectionBlock.css';

const SelectionBlock = ({handler}) => {
    const [rover, setRover] = useState('curiosity');
    const [sol, setSol] = useState(0);

    return (
        <div className="selection">
            <div className="selection__label">Select rover:</div>
            <select className="selection__rover" value={rover} onChange={(event) => setRover(event.target.value)}>
                <option value="curiosity">Curiosity</option>
                <option value="opportunity">Opportunity</option>
                <option value="spirit">Spirit</option>
            </select>
            <div className="selection__label">Choose Martian sol:</div>
            <input className="selection__sol" type="text" onChange={(event) => setSol(event.target.value)} />
            <button className="selection__button" onClick={() => handler(rover, sol)}>Show photos</button> 
        </div>
    );
}

export default SelectionBlock;

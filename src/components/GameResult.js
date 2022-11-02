import React from "react";
import "./GameResult.css";
import win from "../assets/win.png";
import lose from "../assets/lose.png";
import Button from "./Button";

const GameResult = (props) => {

    return (props.trigger) ? (
        <div className="game-result-popup">
            <div className="popup-inner">
                <Button text="Close" onClick={() => props.setTrigger(false)}/>
                { props.children }
                <p style={{color: "black"}}>Win Screen</p>
                <img src={win} alt="win-screen" />
                <p style={{ color: "black" }}>Loss Screen</p>
                <img src={lose} alt="loss-screen" />
            </div>
        </div>
    ) : "";
}

export default GameResult;

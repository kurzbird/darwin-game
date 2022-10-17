import React from "react";
import "./GameResult.css";
import win from "../assets/win.png";
import lose from "../assets/lose.png";

const GameResult = (props) => {


    return (props.trigger) ? (
        <div className="game-result-popup">
            <div className="popup-inner">
                <button className="try-again" onClick={() => props.setTrigger(false)}>Close</button>
                { props.children }
                <p>Win Screen</p>
                <img src={win} alt="win-screen" />
                <p>Loss Screen</p>
                <img src={lose} alt="loss-screen" />
            </div>
        </div>
    ) : "";
}

export default GameResult;

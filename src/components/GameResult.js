import React from "react";
import "./GameResult.css";
import win from "../assets/win.png";
import lose from "../assets/lose.png";

const GameResult = ({ result }) => {

    const resultScreen = (result) => {
        if (result) {
            return <img src={win} alt="win-screen" />
        } else {
            return <img src={lose} alt="loss-screen" />
        }
    }

    return (
        <div className="game-result">
            <div className="game-result-inner">
                {resultScreen(result)}
            </div>
        </div>
    )
}

export default GameResult;

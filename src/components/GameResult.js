import React from "react";
import "./GameResult.css";
import win from "../assets/win.png";
import lose from "../assets/lose.png";
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from "./Backdrop";

const GameResult = ({ result }) => {

    const resultScreen = (result) => {
        if (result) {
            return <img src={win} alt="win-screen" />
        } else {
            return <img src={lose} alt="loss-screen" />
        }
    }

    return (
        <Backdrop>
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="popup"
                >
                    <div className="game-result">
                        <div className="game-result-inner">
                            {resultScreen(result)}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Backdrop>
    )
}

export default GameResult;

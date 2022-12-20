import React from "react";
import "./GameResult.css";
import win from "../assets/win.png";
import lose from "../assets/lose.png";
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from "./Backdrop";

const GameResult = ({ result, resetGame }) => {

    const resultScreen = (result) => {
        if (result) {
            return <img src={win} alt="win-screen" />
        } else {
            return <img src={lose} alt="loss-screen" />
        }
    }

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 10,
                stiffness: 150,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };



    return (
        <Backdrop onClick={resetGame}>
            <AnimatePresence>
                <motion.div
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
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

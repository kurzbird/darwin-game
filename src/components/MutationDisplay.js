import { useState } from "react";
import Button from "./Button";
import "./MutationDisplay.css";
import { AnimatePresence, motion } from 'framer-motion';
import styled from "styled-components";

const DisplayContainer = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0, 2);

    display: flex;
    justify-content: center;
    align-items: center;
`

const DisplayHeader = styled.h4`
    color: navy;
`

const RandomMutations = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    grid-template-rows: 33.3% 33.3% 33.3%;
    grid-column-start: 2;
    grid-column-end: 5;
    row-gap: 35px;

    min-width: 100px;
    min-height: 200px;
`

function MutationDisplay({ genePool, onSelectMutation, text, refreshGenePool, closeDisplay, starterDisplay }) {

    const [selections, setSelections] = useState([])
    const [mutationsToDisplay, setMutationsToDisplay] = useState(genePool)

    const selectMutation = (selection) => {
        onSelectMutation(selection)
        setSelections([...selections, selection])
    }

    const moreMutations = () => {
        setMutationsToDisplay(refreshGenePool)
    }

    const containerVariants = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="popup"
            >
                <DisplayContainer>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mutation-display-inner"
                    >
                        <DisplayHeader>{text} <br /><br /></DisplayHeader>
                        <RandomMutations>
                            {mutationsToDisplay.map((Mutation, i) =>
                                <motion.p onClick={() => selectMutation(Mutation)} key={i} variants={itemVariants}>
                                    Mutation {i + 1}: {Mutation.legs}, {Mutation.size}, {Mutation.horns}, {Mutation.hair}, {Mutation.camo}
                                </motion.p>)}
                        </RandomMutations>

                        <Button text="More Mutations" onClick={moreMutations} />
                        {!starterDisplay && <Button text="Close" onClick={closeDisplay} />}
                    </motion.div>
                </DisplayContainer>
            </motion.div >
        </AnimatePresence >
    )
}

export default MutationDisplay;

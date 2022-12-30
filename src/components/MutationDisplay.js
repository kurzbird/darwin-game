import { useState } from "react";
import Button from "./Button";
import "./MutationDisplay.css";
import { AnimatePresence, motion } from 'framer-motion';

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
                <div className="mutation-display">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mutation-display-inner"
                    >
                        <h4 className="display-header">{text} <br /><br /></h4>
                        <div className="random-mutations">
                            {mutationsToDisplay.map((Mutation, i) =>
                                <motion.p onClick={() => selectMutation(Mutation)} key={i} variants={itemVariants}>
                                    Mutation {i + 1}: {Mutation.legs}, {Mutation.size}, {Mutation.horns}, {Mutation.hair}, {Mutation.camo}
                                </motion.p>)}
                        </div>

                        <Button text="More Mutations" onClick={moreMutations} />
                        {!starterDisplay && <Button text="Close" onClick={closeDisplay} />}
                    </motion.div>
                </div>
            </motion.div >
        </AnimatePresence >
    )
}

export default MutationDisplay;

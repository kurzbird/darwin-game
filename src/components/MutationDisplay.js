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

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="popup"
            >
                <div className="mutation-display">
                    <div className="mutation-display-inner">
                        <h4 className="display-header">{text} <br /><br /></h4>
                        <div className="random-mutations">
                            {mutationsToDisplay.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i + 1}: {Mutation.legs}, {Mutation.size}, {Mutation.horns}, {Mutation.hair}, {Mutation.camo}</p>)}
                        </div>

                        <Button text="More Mutations" onClick={moreMutations} />
                        {!starterDisplay && <Button text="Close" onClick={closeDisplay} />}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence >
    )
}

export default MutationDisplay;

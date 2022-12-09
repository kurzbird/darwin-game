import { useState } from "react";
import Button from "./Button";
import "./MutationDisplay.css";

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
        <div className="mutation-display">
            <div className="mutation-display-inner">
                <h4 className="display-header">{text} <br /><br /></h4>
                <div className="random-mutations">
                    {mutationsToDisplay.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i + 1}: {Mutation.legs}, {Mutation.size}, {Mutation.horns}, {Mutation.hair}, {Mutation.camo}</p>)}
                </div>

                <Button text="More Mutations" onClick={moreMutations} />
                {!starterDisplay && <Button text="Close" onClick={closeDisplay}/>}
            </div>
        </div>
    )
}

export default MutationDisplay;

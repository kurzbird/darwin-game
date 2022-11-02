import { useState } from "react";
import Button from "./Button";

function MutationDisplay({ genePool, onSelectMutation, text, refreshGenePool }) {

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
        <div>
            <h3>{text}</h3>
            <div className="random-mutations">
                {mutationsToDisplay.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i + 1}: {Mutation.legs}, {Mutation.size}, {Mutation.neck}, {Mutation.hair}, {Mutation.camo}</p>)}
            </div>

            <Button text="More Mutations" onClick={moreMutations} />
        </div>
    )
}

export default MutationDisplay;

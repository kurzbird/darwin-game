import { useState } from "react";
import Button from "./Button";

function MutationDisplay({genePool, onSelectMutation}) {

    const [selections, setSelections] = useState([])

    const selectMutation = (selection) => {
        onSelectMutation(selection)
        setSelections([...selections, selection])
    }

    return (
        <div>
            <h3>Mutation Display - click mutations to add to population</h3>
            <div className="random-mutations">
                {genePool.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i+1}: {Mutation.legs}, {Mutation.size}, {Mutation.neck}, {Mutation.hair}, {Mutation.camo}</p>)}
            </div>

            <Button text="More Mutations"/>
        </div>
    )
}

export default MutationDisplay;

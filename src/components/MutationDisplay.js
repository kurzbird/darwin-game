import { useState } from "react";
import Button from "./Button";

function MutationDisplay({genePool}) {

    const [selections, setSelections] = useState([])

    const selectMutation = (selection) => {
        console.log(selection)
        setSelections([...selections, selection])
    }

    return (
        <div>
            <h3>Mutation Display - click mutations to add to population</h3>
            <div className="random-mutations">
                {genePool.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i+1}: {Mutation.legs}, {Mutation.size}, {Mutation.neck}, {Mutation.hair}, {Mutation.camo}</p>)}
            </div>

            <Button text="More Mutations"/>
            <p>Selected Mutations: {selections.map((selection, i) => <span key={i}>Picked: {selection.legs}, {selection.size}, {selection.neck}, {selection.hair}, {selection.camo} <br /></span>)}</p>
        </div>
    )
}

export default MutationDisplay;

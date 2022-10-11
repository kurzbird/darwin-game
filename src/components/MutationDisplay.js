import { useState } from "react";

function MutationDisplay({genePool}) {

    const [selections, setSelections] = useState([])

    const selectMutation = (selection) => {
        console.log(selection)
        setSelections([...selections, selection])
    }

    return (
        <div>
            <h3>Mutation Display</h3>
            <div className="random-mutations">
                {genePool.map((Mutation, i) => <p onClick={() => selectMutation(Mutation)} key={i}>Mutation {i+1}: {Mutation.legs}, {Mutation.size}, {Mutation.neck}, {Mutation.hair}, {Mutation.camo}</p>)}
            </div>

            <p>Selected Mutations: {selections.map((selection, i) => <span key={i}>{i}</span>)}</p>
        </div>
    )
}

export default MutationDisplay;

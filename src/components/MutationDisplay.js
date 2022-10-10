function MutationDisplay({genePool}) {

    return (
        <div>
            <h3>Mutation Display</h3>
            <div className="random-mutations">
                {genePool.map((Mutation, i) => <p key={i}>Mutation {i+1}: {Mutation.legs}, {Mutation.size}, {Mutation.neck}, {Mutation.hair}, {Mutation.camo}</p>)}
            </div>
        </div>
    )
}

export default MutationDisplay;

import createRandomOffspring from "./Game";

const randomMutations = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()];

function MutationChooser() {
    return (
        <div className="wrapper">
            <div className="accordion">

                {randomMutations.map((item, i) => (
                    <div className="mutation">
                        <h2>{item.legs}</h2>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MutationChooser;

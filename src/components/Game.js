import React from "react";
import traits from "../data/traits.json";
import survivalChance from "../data/survivalChance.json";

// function Game() {
//     const [page, setPage] = useState(0);
//     const [gameData, setGameData] = useState({
//         yearsLeft: 1000000,
//         populationCount: 6,
//     });

//     const Page = [
//         Logo,
//         InitialMutation,
//         SurvivalSimulation,
//     ][currentPosition];

//     return <div><Page goToNext={() => setPage(page + 1)} /></div>;
// }
class Traits {
    constructor(legs, size, neck, hair, camo) {
        this.legs = legs;
        this.size = size;
        this.neck = neck;
        this.hair = hair;
        this.camo = camo;
    }
};

function createRandomOffspring() {
    return new Traits(
        randomElement(traits.LEGS),
        randomElement(traits.SIZE),
        randomElement(traits.NECK),
        randomElement(traits.HAIR),
        randomElement(traits.CAMO)
    );
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

let population = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring()];

function firstRound() {
    for (let i = 0; i < 5; i++) {
        reproductionRound();
    }
    survivalRound();
    console.log(population.length);

    return population;
}

function reproductionRound() {
    const reproductionRate = population.length / 2;
    for (let i = 1; i <= reproductionRate; i++) {
        population.push(singleOffspring(randomElement(population), randomElement(population)));
    }
    return population;
}

// defaults to lower index instead of 50/50
function singleOffspring(animal_1, animal_2) {
    return new Traits(
        traits.LEGS[Math.floor((traits.LEGS.indexOf(animal_1.legs) + traits.LEGS.indexOf(animal_2.legs)) / 2)],
        traits.SIZE[Math.floor((traits.SIZE.indexOf(animal_1.size) + traits.SIZE.indexOf(animal_2.size)) / 2)],
        traits.NECK[Math.floor((traits.NECK.indexOf(animal_1.neck) + traits.NECK.indexOf(animal_2.neck)) / 2)],
        traits.HAIR[Math.floor((traits.HAIR.indexOf(animal_1.hair) + traits.HAIR.indexOf(animal_2.hair)) / 2)],
        traits.CAMO[Math.floor((traits.CAMO.indexOf(animal_1.camo) + traits.CAMO.indexOf(animal_2.camo)) / 2)]
    );
}
// should return population with changes
// references surivival test
function survivalRound() {
    const CATASTROPHES = ["COLD", "HOT", "PREDATORS", "TALL_PLANTS", "VIRUS", "VOLCANO"]
    const catastrophe = randomElement(CATASTROPHES);
    for (let i = 0; i < population.length; i++) {
        if (survivalTest(population[i], survivalChance[catastrophe]) === false) {
            population.splice(i, 1);
        }
    }

    return population
}

// bool on whether or not animal lives
// references survival chance
function survivalTest(animal, catastropheEvent) {
    let chance = 0;

    for (const trait in animal) {
        if (catastropheEvent.hasOwnProperty(trait)) {
            chance += catastropheEvent[trait][animal[trait]];
        }
    }

    // random integer between 1 to 100
    const rndInteger = Math.floor(Math.random() * 100) + 1;
    if (chance >= rndInteger) {
        return true
    }
    else {
        return false
    }
}

const Game = () => {
    return (
        <section>
            <h1>Current Population: {population.map((creature, index) => <p key={index}>creature</p>)}</h1>
            <button onClick={firstRound}>First Round</button>
            <button onClick={reproductionRound}>Reproduction Round</button>
            <button onClick={survivalRound}>Survival Round</button>
        </section>
    )
}

export default Game;

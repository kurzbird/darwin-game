import React from "react";
import { useState } from "react";
import traits from "../data/traits.json";
import survivalChance from "../data/survivalChance.json";
import MutationDisplay from "./MutationDisplay";

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

// for populating screen with creatures
// {population.map((creature, index) => <p key={index}>creature</p>)}

// TO-DO: change this to user selection from MutationDisplay + double it
let population = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring()];
const randomMutations = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()];

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

const Game = () => {
    const [popCount, setPopCount] = useState(3);
    const [currentRound, setCurrentRound] = useState(1);
    const [lifelines, setLifelines] = useState(2);
    const [showMutationDisplay, setShowMutationDisplay] = useState(false);

    const openDisplay = () => {
        setShowMutationDisplay(!showMutationDisplay)
    }

    const playGame = () => {
        if (currentRound === 1) {
            firstRound();
            setCurrentRound(2);
        }

        if (currentRound === 2) {
            reproductionRound();
            survivalRound();
            setCurrentRound(3);
        }

        if (currentRound === 3) {
            reproductionRound();
            survivalRound();
            setCurrentRound(4);
        }

        if (currentRound === 4) {
            reproductionRound();
            survivalRound();
            console.log("you win!");
        }

    }


    // Ensures larger starting population before catastrophes
    function firstRound() {
        for (let i = 0; i < 5; i++) {
            reproductionRound();
        }
        survivalRound();
        setPopCount(population.length);
        console.log(population);

        return population;
    }

    function reproductionRound() {
        const reproductionRate = population.length / 2;
        for (let i = 1; i <= reproductionRate; i++) {
            population.push(singleOffspring(randomElement(population), randomElement(population)));
        }
        setPopCount(population.length);
        console.log(population);

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
        console.log(catastrophe);
        for (let i = 0; i < population.length; i++) {
            if (survivalTest(population[i], survivalChance[catastrophe]) === false) {
                population.splice(i, 1);
            }
        }
        setPopCount(population.length);

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

    return (
        <section>
            <h1>Who Wants to Live a Million Years?</h1>
            <h2>Current Population: {popCount}</h2>
            <button onClick={firstRound}>First Round</button>
            <button onClick={reproductionRound}>Reproduction Round</button>
            <button onClick={survivalRound}>Survival Round</button>
            <button onClick={playGame}>Play Game</button>
            <button onClick={openDisplay}>Show Mutation Display</button>
            <div>
                {showMutationDisplay && <MutationDisplay genePool={randomMutations}></MutationDisplay>}
            </div>
        </section>
    )
}

export default Game;

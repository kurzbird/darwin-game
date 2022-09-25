import React from "react";
import traits from "../data/traits.json"

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

// function firstRound() {
//     for (i = 0; i < 5; i++) {
//         reproductionRound();
//     }
//     survivalRound();
//     console.log(population.length);

//     return population;
// }

// function reproductionRound() {
//     const reproductionRate = population.length / 2;
//     for (let i = 1; i <= reproductionRate; i++) {
//         population.push(singleOffspring(randomElement(population), randomElement(population)));
//     }
//     return population;
// }

// // defaults to lower index instead of 50/50
// function singleOffspring(animal_1, animal_2) {
//     return new Traits(
//         LEGS[Math.floor((LEGS.indexOf(animal_1.legs) + LEGS.indexOf(animal_2.legs)) / 2)],
//         SIZE[Math.floor((SIZE.indexOf(animal_1.size) + SIZE.indexOf(animal_2.size)) / 2)],
//         NECK[Math.floor((NECK.indexOf(animal_1.neck) + NECK.indexOf(animal_2.neck)) / 2)],
//         HAIR[Math.floor((HAIR.indexOf(animal_1.hair) + HAIR.indexOf(animal_2.hair)) / 2)],
//         CAMO[Math.floor((CAMO.indexOf(animal_1.camo) + CAMO.indexOf(animal_2.camo)) / 2)]
//     );
// }
// // should return population with changes
// // references surivival test
// function survivalRound() {
//     const catastrophe = randomElement(CATASTROPHES);
//     for (let i = 0; i < population.length; i++) {
//         if (survivalTest(population[i], SURVIVAL_CHANCE[catastrophe]) == false) {
//             population.splice(i, 1);
//         }
//     }

//     return population
// }

// // bool on whether or not animal lives
// // references survival chance
// function survivalTest(animal, catastropheEvent) {
//     let survivalChance = 0;

//     for (const trait in animal) {
//         if (catastropheEvent.hasOwnProperty(trait)) {
//             survivalChance += catastropheEvent[trait][animal[trait]];
//         }
//     }

//     // random integer between 1 to 100
//     const rndInteger = Math.floor(Math.random() * 100) + 1;
//     if (survivalChance >= rndInteger) {
//         return true
//     }
//     else {
//         return false
//     }
// }

const Game = () => {
    return (
        <section>
           <h1>Current Population: {population.map((creature, index) => <p key={index}>creature</p>)}</h1>
        </section>
    )
}

export default Game;

import React from "react";
import { useState } from "react";
import traits from "../data/traits.json";
import survivalChance from "../data/survivalChance.json";
import MutationDisplay from "./MutationDisplay";
import GameResult from "./GameResult";
import HintBook from "./HintBook";
import Button from "./Button";
import "./Game.css";

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

let population = [];

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
    const [years, setYears] = useState(1);
    const [catastrophe, setCatastrophe] = useState("")
    const [lifelines, setLifelines] = useState(2);
    const [showMutationDisplay, setShowMutationDisplay] = useState(false);
    const [showStarterDisplay, setShowStarterDisplay] = useState(true);
    const [buttonText, setButtonText] = useState("Play Game")
    const [endGame, setEndGame] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const openHints = () => {
        setShowHints(!showHints);
        setShowMutationDisplay(false);
    }

    const openDisplay = () => {
        if (population.length > 0 && years < 1000000 && currentRound > 2 &&
            catastrophe !== "VOLCANO" && catastrophe !== "VIRUS") {
            setShowMutationDisplay(!showMutationDisplay)
            setShowHints(false);
        }
    }

    const CATASTROPHES = ["COLD", "HOT", "PREDATORS", "TALL_PLANTS", "VIRUS", "VOLCANO"]
    const randomCatastrophe = () => {
        return randomElement(CATASTROPHES);
    }

    const playGame = () => {
        if (currentRound === 1 && population.length === 3) {
            firstRound();
            setCurrentRound(2);
            darwinTexts();
            setButtonText("Next Round");
        }

        if (currentRound === 2) {
            reproductionRound();
            survivalRound(randomCatastrophe());
            setCatastrophe(randomCatastrophe());
            darwinTexts();

            // TO-DO: insert popup message for win/loss
            if (popCount === 0) {
                setButtonText("Play Again?");
            } else {
                setYears(138888);
                setCurrentRound(3);
            }
        }

        if (currentRound === 3) {
            reproductionRound();
            survivalRound(catastrophe);
            setCatastrophe(randomCatastrophe());
            darwinTexts();

            if (popCount === 0) {
                setButtonText("Play Again?");
            } else {
                setYears(416666);
                setCurrentRound(4);
            }
        }

        if (currentRound === 4) {
            reproductionRound();
            survivalRound(catastrophe);
            setCatastrophe(randomCatastrophe());
            darwinTexts();

            if (popCount === 0) {
                setButtonText("Play Again?");
            } else {
                setYears(694444);
                setCurrentRound(5);
            }
        }

        if (currentRound === 5) {
            reproductionRound();
            survivalRound(catastrophe);
            setCatastrophe(randomCatastrophe());
            darwinTexts();
            setButtonText("Play Again?");

            if (popCount === 0) {
                console.log("you lose!");
            } else {
                setYears(1000000);
                console.log("you win!");
            }
        }
    }

    // Ensures larger starting population before catastrophes
    function firstRound() {
        for (let i = 0; i < 3; i++) {
            population.push(population[i]);
        }
        setPopCount(population.length);

        return population;
    }

    function reproductionRound() {
        const reproductionRate = population.length / 2;
        for (let i = 1; i <= reproductionRate; i++) {
            population.push(singleOffspring(randomElement(population), randomElement(population)));
        }
        setPopCount(population.length);

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

    // possibility of one or more traits being completely unique from its parents
    // if both parents have same trait, it will always default to the trait variation one below
    function singleMutantOffspring(animal_1, animal_2) {
        return new Traits(
            traits.LEGS.at(Math.floor((traits.LEGS.indexOf(animal_1.legs) + traits.LEGS.indexOf(animal_2.legs)) / 2) - 1),
            traits.SIZE.at(Math.floor((traits.SIZE.indexOf(animal_1.size) + traits.SIZE.indexOf(animal_2.size)) / 2) - 1),
            traits.NECK.at(Math.floor((traits.NECK.indexOf(animal_1.neck) + traits.NECK.indexOf(animal_2.neck)) / 2) - 1),
            traits.HAIR.at(Math.floor((traits.HAIR.indexOf(animal_1.hair) + traits.HAIR.indexOf(animal_2.hair)) / 2) - 1),
            traits.CAMO.at(Math.floor((traits.CAMO.indexOf(animal_1.camo) + traits.CAMO.indexOf(animal_2.camo)) / 2) - 1)
        );
    }

    // should return population with changes
    // references surivival test
    function survivalRound(catastrophe) {
        for (let i = 0; i < population.length; i++) {
            if (survivalTest(population[i], survivalChance[catastrophe]) === false) {
                population.splice(i, 1);
            }
        }
        setPopCount(population.length);
        setCatastrophe(catastrophe);

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
        return chance >= rndInteger;
    }

    const handleSelect = (selection) => {
        if (lifelines > 0) {
            population.push(selection);
            setPopCount(population.length);
            setLifelines(lifelines - 1);
            openDisplay();
        }
    }

    const handleStarterSelect = (selection) => {
        if (population.length < 3) {
            population.push(selection);
            setPopCount(population.length);
        }

        if (population.length === 3) {
            setShowStarterDisplay(false);
        }
    }

    const randomMutations = () => {
        return [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()]
    }

    // 9 random mutations from existing population
    const mutantGenePool = () => {
        if (population.length === 0) {
            return randomMutations;
        } else {
            return [singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population))]
        }
    }

    const darwinTexts = () => {
        if (years === 1 && population.length === 6) {
            return "You’ve made your selections. Now, as the environment changes, the animals with traits most suited to the new environment will thrive. Your goal: help your species survive the next 1 million years."
        }

        if (popCount > 0 && currentRound === 5) {
            return "Wow, your species survived for a million years! Who knows, one day their descendants could rule the planet. I hope you gained some insight into how natural selection works. Care to try again?"
        }

        if (years === 1) {
            return "The traits you choose will affect your species’ chance of survival, depending on the environment they will face. A little hint – diversity can ensure survival against even the harshest elements."
        }

        if (catastrophe === "COLD") {
            return "Brrr, it’s getting colder. We might be entering an ice age. Some animals will die off if they can’t stay warm. Would you like to introduce a mutation?"
        }

        if (catastrophe === "HOT") {
            return "Is it just me, or is it getting hot in here? I think we may be entering a period of global warming. Would you like to introduce a mutation?"
        }

        if (catastrophe === "PREDATORS") {
            return "The only thing we have to fear is fear itself… oh, and the hungry yeti predators invading the area. Would you like to introduce a mutation?"
        }

        if (catastrophe === "TALL_PLANTS") {
            return "A delicious fruit has begun to grow on tall stalks in your habitat. Are your animals tall enough? Would you like to introduce a mutation?"
        }

        if (catastrophe === "VOLCANO") {
            return "Run for cover! The volcano is erupting! It’s a cataclysmic event – unfortunately, there’s no time to introduce a mutation. Hopefully your species can survive."
        }

        if (catastrophe === "VIRUS") {
            return "Bad news! A deadly virus is quickly spreading through your species. It’s a cataclysmic event – unfortunately, there’s no time to introduce a mutation. Hopefully your species can survive."
        }
    }

    const resetGame = () => {
        population = [];
        setPopCount(0);
        setCurrentRound(1);
        setYears(1);
        setCatastrophe("");
        setLifelines(2);
        setShowMutationDisplay(false);
        setShowStarterDisplay(true);
        setButtonText("Play Game");
        setEndGame(false);
    }

    return (
        <section>
            <h1>Are We There, Yeti?</h1>
            <div className="display-container">
                {showStarterDisplay && <h3 className="instructions">Before we start the game, let's choose our first three yetis. Choose carefully because they will magically double when the game begins! </h3>}
                {showStarterDisplay && <MutationDisplay genePool={randomMutations} onSelectMutation={handleStarterSelect} refreshGenePool={randomMutations} text="Starter Population - click to add a mutation to population!"></MutationDisplay>}
            </div>
            <h3>Current Population: {population.map((yeti, i) => <span key={i} style={{ color: "navy" }}> Yeti {i + 1}: {yeti.legs}, {yeti.size}, {yeti.neck}, {yeti.hair}, {yeti.camo} <br /></span>)} </h3>
            <h3>Current Population Count: {popCount}</h3>
            <h3>Extra Mutations Remaining: {lifelines}</h3>
            <h3>Year: {years}</h3>
            <h3>Catastrophic Event: {catastrophe}</h3>
            <div className="display-container">
                <div className="text-display">
                    <h3 className="instructions">Darwin the Yeti: {darwinTexts()}</h3>
                </div>
            </div>
            <Button text={buttonText} onClick={buttonText === "Play Again?" ? resetGame : playGame} />
            <Button text="Game Result Popup" onClick={() => setEndGame(true)} />
            <GameResult trigger={endGame} setTrigger={setEndGame}>
                <h3 style={{ color: "black" }}>Game Over!</h3>
            </GameResult>
            <Button text="Reset Game" onClick={resetGame} />
            <Button text="Show Mutation Display" onClick={openDisplay} />
            <Button text="Hints" onClick={openHints} />
            <div className="display-container">
                {showMutationDisplay && <MutationDisplay genePool={mutantGenePool} onSelectMutation={handleSelect} text="Mutation Display - click to add a mutation to population!" refreshGenePool={mutantGenePool}></MutationDisplay>}
                {showHints && <HintBook />}
            </div>
        </section>
    )
}

export default Game;

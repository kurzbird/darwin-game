import React from "react";
import { useState, useEffect } from "react";
import traits from "../data/traits.json";
import survivalChance from "../data/survivalChance.json";
import MutationDisplay from "./MutationDisplay";
import GameResult from "./GameResult";
import HintBook from "./HintBook";
import Button from "./Button";
import "./Game.css";
import darwin from "../assets/darwin.png";
import PostGame from "./PostGame";

class Traits {
    constructor(legs, size, horns, hair, camo) {
        this.legs = legs;
        this.size = size;
        this.horns = horns;
        this.hair = hair;
        this.camo = camo;
    }
};

// let population = [];

// for all 16 position testing, uncomment below
// let population = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()]

// for initial 6 positions testing
// let population = [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()];

function createRandomOffspring() {
    return new Traits(
        randomElement(traits.LEGS),
        randomElement(traits.SIZE),
        randomElement(traits.HORNS),
        randomElement(traits.HAIR),
        randomElement(traits.CAMO)
    );
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

let openPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Shuffles an array in place; Fisher-Yates shuffle algorithm
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let shuffled = shuffle(openPositions);

const Game = () => {
    const [populationData, setPopulationData] = useState({
        population: [],
        popCount: 0,
    });
    // const [popCount, setPopCount] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    const [years, setYears] = useState(1);
    const [catastrophe, setCatastrophe] = useState("")
    const [lifelines, setLifelines] = useState(2);
    const [showMutationDisplay, setShowMutationDisplay] = useState(false);
    const [showStarterDisplay, setShowStarterDisplay] = useState(true);
    const [buttonText, setButtonText] = useState("Play Game")
    const [endGame, setEndGame] = useState(null);
    const [showHints, setShowHints] = useState(false);
    const [environmentalChanges, setEnvironmentalChanges] = useState(["COLD", "HOT", "PREDATORS", "TALL_PLANTS", "ASTEROID", "VIRUS", "VOLCANO"]);
    const [shuffledPositions, setShuffledPositions] = useState(shuffled);
    // const [genCount, setGenCount] = useState(0);

    const { population, popCount } = populationData;

    // useEffect(() => {
    //     const mapPop = () => {
    //         population.map((yeti, i) => {
    //             setTimeout(() => {
    //                 <span className={randomPosition(i)} key={i}> Yeti {i + 1}: 🦍 </span>
    //             }, 2000);
    //         });
    //     }; mapPop();
    // },
    //     [population]
    // );

    // useEffect(() => {
    // }, [popCount]);

    const openHints = () => {
        setShowHints(!showHints);
        setShowMutationDisplay(false);
    }

    const openDisplay = () => {
        if (popCount > 0 && years < 1000000 && currentRound > 2 &&
            catastrophe !== "VOLCANO" && catastrophe !== "VIRUS" && catastrophe !== "ASTEROID") {
            setShowMutationDisplay(!showMutationDisplay)
            setShowHints(false);
        }
    }

    const removeCatastrophe = (arr, catastrophe) => {
        let index = arr.indexOf(catastrophe);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const playGame = () => {
        const environmentalCopy = [...environmentalChanges];
        const currentCatastrophe = randomElement(environmentalCopy);
        // console.log('population:', population);
        // console.log('popCount:', popCount);

        if (showHints || showMutationDisplay) {
            setShowHints(false);
            setShowMutationDisplay(false);
        }

        if (currentRound === 1 && popCount === 3) {
            // Doubles user's first three choices
            let popCopy = [...population, ...population];
            let popCountCopy = popCopy.length;
            setPopulationData({
                population: popCopy,
                popCount: popCountCopy
            });
            setCurrentRound(2);
            setButtonText("Next Round");
        }

        if (currentRound === 2) {
            simGenerations(currentCatastrophe);

            if (popCount === 0) {
                setButtonText("Play Again?");
                setEndGame(false);
            } else {
                setYears(124860);
                setCurrentRound(3);
                setCatastrophe(currentCatastrophe);
                removeCatastrophe(environmentalCopy, currentCatastrophe);
                setEnvironmentalChanges(environmentalCopy);
                setShuffledPositions(shuffle(openPositions));
            }
        }

        if (currentRound === 3) {
            simGenerations(catastrophe);

            if (popCount === 0) {
                setButtonText("Play Again?");
                setEndGame(false);
            } else {
                setYears(419868);
                setCurrentRound(4);
                setCatastrophe(currentCatastrophe);
                removeCatastrophe(environmentalCopy, currentCatastrophe);
                setEnvironmentalChanges(environmentalCopy);
                setShuffledPositions(shuffle(openPositions));
            }
        }

        if (currentRound === 4) {
            simGenerations(catastrophe);

            if (popCount === 0) {
                setButtonText("Play Again?");
                setEndGame(false);
            } else {
                setYears(692853);
                setCurrentRound(5);
                setCatastrophe(currentCatastrophe);
                removeCatastrophe(environmentalCopy, currentCatastrophe);
                setEnvironmentalChanges(environmentalCopy);
                setShuffledPositions(shuffle(openPositions));
            }
        }

        if (currentRound === 5) {
            simGenerations(catastrophe);
            setButtonText("Play Again?");

            if (popCount === 0) {
                setEndGame(false);
            } else {
                setEndGame(true);
                setYears(1000000);
            }
        }

        darwinTexts();
    }

    // Simulates multiple generations of survival and reproduction rounds
    function simGenerations(catastrophe) {
        for (let i = 0; i < 2; i++) {
            oneGeneration(catastrophe);
        }
    }

    function oneGeneration(catastrophe) {
        reproductionRound();
        survivalRound(catastrophe);
    }

    function reproductionRound() {
        const reproductionRate = population.length / 2;

        // simulates carrying capacity is a max of 16 yetis
        if (population.length < 16) {
            for (let i = 1; i <= reproductionRate; i++) {
                setPopulationData({ population: [...population, singleOffspring(randomElement(population), randomElement(population))] });
            }
        }
    }

    // should return population with changes
    // references surivival test
    function survivalRound(catastrophe) {
        let popCopy = [...population];

        for (let i = 0; i < popCount; i++) {
            if (survivalTest(population[i], survivalChance[catastrophe]) === false) {
                popCopy.splice(i, 1);
            }
        }
        setPopulationData({
            population: popCopy,
            popCount: popCopy.length,
        });
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

    // defaults to lower index instead of 50/50
    function singleOffspring(animal_1, animal_2) {
        return new Traits(
            traits.LEGS[Math.floor((traits.LEGS.indexOf(animal_1.legs) + traits.LEGS.indexOf(animal_2.legs)) / 2)],
            traits.SIZE[Math.floor((traits.SIZE.indexOf(animal_1.size) + traits.SIZE.indexOf(animal_2.size)) / 2)],
            traits.HORNS[Math.floor((traits.HORNS.indexOf(animal_1.horns) + traits.HORNS.indexOf(animal_2.horns)) / 2)],
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
            traits.HORNS.at(Math.floor((traits.HORNS.indexOf(animal_1.horns) + traits.HORNS.indexOf(animal_2.horns)) / 2) - 1),
            traits.HAIR.at(Math.floor((traits.HAIR.indexOf(animal_1.hair) + traits.HAIR.indexOf(animal_2.hair)) / 2) - 1),
            traits.CAMO.at(Math.floor((traits.CAMO.indexOf(animal_1.camo) + traits.CAMO.indexOf(animal_2.camo)) / 2) - 1)
        );
    }

    const handleSelect = (selection) => {
        let popCopy = [...population, selection];

        if (lifelines > 0) {
            setPopulationData({
                population: popCopy,
                popCount: popCopy.length,
            });
            setLifelines(lifelines - 1);
            openDisplay();
        }
    }

    const handleStarterSelect = (selection) => {
        let popCopy = [...population, selection];

        if (population.length < 3) {
            setPopulationData({
                population: popCopy,
                popCount: popCopy.length,
            });
        }

        if (popCopy.length === 3) {
            setShowStarterDisplay(false);
        }
    }

    const randomMutations = () => {
        return [createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring(), createRandomOffspring()]
    }

    // 9 random mutations from existing population
    const mutantGenePool = () => {
        if (popCount === 0) {
            return randomMutations;
        } else {
            return [singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population)), singleMutantOffspring(randomElement(population), randomElement(population))]
        }
    }

    const darwinTexts = () => {
        if (years === 1 && population.length === 6) {
            return "You’ve made your selections. Now, as the environment changes, the animals with traits most suited to the new environment will thrive. Your goal: help your species survive the next 1 million years."
        } else if (popCount > 0 && buttonText === "Play Again?") {
            return "Wow, your species survived for a million years! Who knows, one day their descendants could rule the planet. I hope you gained some insight into how natural selection works. Care to try again?"
        } else if (years === 1) {
            return "The traits you choose will affect your species’ chance of survival, depending on the environment they will face. A little hint – diversity can ensure survival against even the harshest elements."
        } else if (catastrophe === "COLD" && popCount === 0) {
            return "Sorry, your species just couldn’t stay warm in this cold, harsh environment. If they had their longer hair, they might have fared better. Would you like to start from the beginning?"
        } else if (catastrophe === "HOT" && popCount === 0) {
            return "This heat is a killer. Your species found that out when they overheated under all that fur. Care to start again from the beginning?"
        } else if (catastrophe === "PREDATORS" && popCount === 0) {
            return "Oh, the horror. Your yetis just didn’t have the long, quick legs, horns, and stripes to avoid the nasty claws of those predators. Would you like to start from the beginning?"
        } else if (catastrophe === "TALL_PLANTS" && popCount === 0) {
            return "Your yetis saw the food, but they couldn't reach them. A tragedy that may have been avoided if they had longer legs and horns. Would you like to start from the beginning?"
        } else if ((catastrophe === "ASTEROID" || catastrophe === "VOLCANO" || catastrophe === "VIRUS") && popCount === 0) {
            return "The recent disaster has crippled your population. It didn’t wipe you out, but when a species has dwindled in size, any small problem can lead to extinction."
        } else if (catastrophe === "COLD") {
            return "Brrr, it’s getting colder. We might be entering an ice age. Some animals will die off if they can’t stay warm. Would you like to introduce a mutation?"
        } else if (catastrophe === "HOT") {
            return "Is it just me, or is it getting hot in here? I think we may be entering a period of global warming. Would you like to introduce a mutation?"
        } else if (catastrophe === "PREDATORS") {
            return "The only thing we have to fear is fear itself… oh, and the hungry yeti predators invading the area. Would you like to introduce a mutation?"
        } else if (catastrophe === "TALL_PLANTS") {
            return "A delicious fruit has begun to grow on tall stalks in your habitat. Are your animals tall enough? Would you like to introduce a mutation?"
        } else if (catastrophe === "ASTEROID") {
            return "Emergency! The planet has just been hit by an asteroid! It’s a cataclysmic event – unfortunately there’s no time to use a Life Preserver. Hopefully, your species are hardy enough to survive."
        } else if (catastrophe === "VOLCANO") {
            return "Run for cover! The volcano is erupting! It’s a cataclysmic event – unfortunately, there’s no time to introduce a mutation. Hopefully your species can survive."
        } else if (catastrophe === "VIRUS") {
            return "Bad news! A deadly virus is quickly spreading through your species. It’s a cataclysmic event – unfortunately, there’s no time to introduce a mutation. Hopefully your species can survive."
        }
    }

    const randomPosition = (i) => {
        if (currentRound < 3) {
            return 'position-' + (i + 1);
        } else {
            return 'position-' + shuffledPositions[i];
        }
    }

    const resetGame = () => {
        setPopulationData({
            population: [],
            popCount: 0,
        });
        setCurrentRound(1);
        setYears(1);
        setCatastrophe("");
        setLifelines(2);
        setShowMutationDisplay(false);
        setShowStarterDisplay(true);
        setButtonText("Play Game");
        setEndGame(null);
        setEnvironmentalChanges(["COLD", "HOT", "PREDATORS", "TALL_PLANTS", "ASTEROID", "VIRUS", "VOLCANO"]);
        setShuffledPositions(shuffle(openPositions));
    }

    return (
        <section>
            <div className="game-screen">
                <div className="header">
                    <h2>Are We There, Yeti?</h2>
                    {showStarterDisplay && <h4 className="instructions">Before we start the game, let's choose our first three yetis. Choose carefully because they will magically double when the game begins! </h4>}
                    {!showStarterDisplay && <pre className="instructions">Extra Mutations Remaining: {lifelines}        Current Population Count: {popCount}        Catastrophic Event: {catastrophe}        Year: {years}</pre>}
                </div>
                {/* <PostGame /> */}

                <div className="display-container">
                    <div className="population-container">
                        <div className="individual-yetis">
                            {population.map((yeti, i) => <span className={randomPosition(i)} key={i}> Yeti {i + 1}: 🦍 </span>)}
                        </div>
                        <div className="display-container">
                            {buttonText === "Play Again?" && <GameResult result={endGame} resetGame={resetGame} />}
                            {showStarterDisplay && <MutationDisplay genePool={randomMutations} onSelectMutation={handleStarterSelect} refreshGenePool={randomMutations} text="Starter Population - click to add a mutation to population!" closeDisplay={openDisplay} starterDisplay={showStarterDisplay}></MutationDisplay>}
                            {showMutationDisplay && <MutationDisplay genePool={mutantGenePool} onSelectMutation={handleSelect} text="Mutation Display - click to add a mutation to population!" refreshGenePool={mutantGenePool} closeDisplay={openDisplay}></MutationDisplay>}
                            {showHints && currentRound > 1 && <HintBook closeDisplay={openHints} />}
                        </div>
                    </div>
                </div>

                {/* remove when artwork is in */}
                <div className="population-descriptions">
                    <h5 style={{ color: "green" }}>(WIP) Current Population: <br />{population.map((yeti, i) => <span style={{ color: "white" }} key={i}> Yeti {i + 1}: {yeti.legs}, {yeti.size}, {yeti.horns}, {yeti.hair}, {yeti.camo} <br /></span>)} <br /></h5>
                </div>

                <div className="darwin-text-container">
                    <img src={darwin} alt="darwin" />
                    <div className="text-display">
                        <h4 className="instructions">Darwin the Yeti: {darwinTexts()}</h4>
                    </div>
                    <div className="buttons-container">
                        <Button text={buttonText} onClick={buttonText === "Play Again?" ? resetGame : playGame} />
                        <Button text="Reset Game" onClick={resetGame} />
                        <Button text="Show Mutation Display" onClick={openDisplay} />
                        <Button text="Hints" onClick={openHints} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Game;

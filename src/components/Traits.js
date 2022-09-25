const SHORT_LEGS = "short legs"
const MEDIUM_LEGS = "medium legs"
const LONG_LEGS = "long legs"
const LEGS = [SHORT_LEGS, MEDIUM_LEGS, LONG_LEGS]

const THIN = "thin"
const MEDIUM = "medium"
const BULKY = "bulky"
const SIZE = [THIN, MEDIUM, BULKY]

const SHORT_NECK = "short neck"
const MEDIUM_NECK = "medium neck"
const LONG_NECK = "long neck"
const NECK = [SHORT_NECK, MEDIUM_NECK, LONG_NECK]

const NO_HAIR = "no hair"
const SHORT_HAIR = "short hair"
const MEDIUM_HAIR = "medium hair"
const LONG_HAIR = "long hair"
const HAIR = [NO_HAIR, SHORT_HAIR, MEDIUM_HAIR, LONG_HAIR]

const STRIPES = "stripes"
const NO_STRIPES = "no stripes"
const CAMO = [STRIPES, NO_STRIPES]

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
        randomElement(LEGS),
        randomElement(SIZE),
        randomElement(NECK),
        randomElement(HAIR),
        randomElement(CAMO)
    );
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

export default {
    SHORT_LEGS,
    MEDIUM_LEGS,
    LONG_LEGS,
    LEGS,
    THIN,
    MEDIUM,
    BULKY,
    SIZE,
    SHORT_NECK,
    MEDIUM_NECK,
    LONG_NECK,
    NECK,
    NO_HAIR,
    SHORT_HAIR,
    MEDIUM_HAIR,
    LONG_HAIR,
    HAIR,
    NO_STRIPES,
    STRIPES,
    CAMO,
    Traits,
    createRandomOffspring,
    randomElement,
};

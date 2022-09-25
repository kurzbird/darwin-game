import Traits from "./Traits"

const COLD = "cold"
const HOT = "hot"
const PREDATORS = "predators"
const TALL_PLANTS = "tall plants"
const VIRUS = "virus"
const VOLCANO = "volcano"

const CATASTROPHES = [COLD, HOT, PREDATORS, TALL_PLANTS, VIRUS, VOLCANO]

const SURVIVAL_CHANCE = {
    [COLD]: {
        legs: { [Traits.SHORT_LEGS]: 20, [Traits.MEDIUM_LEGS]: 10, [Traits.LONG_LEGS]: 0 },
        hair: { [Traits.NO_HAIR]: 0, [Traits.SHORT_HAIR]: 10, [Traits.MEDIUM_HAIR]: 15, [Traits.LONG_HAIR]: 20 },
        size: { [Traits.THIN]: -10, [Traits.MEDIUM]: 10, [Traits.BULKY]: 20 },
        neck: { [Traits.SHORT_NECK]: 20, [Traits.MEDIUM_NECK]: 10, [Traits.LONG_NECK]: 0 }
    },

    [HOT]: {
        legs: { [Traits.SHORT_LEGS]: 0, [Traits.MEDIUM_LEGS]: 10, [Traits.LONG_LEGS]: 20 },
        hair: { [Traits.NO_HAIR]: 20, [Traits.SHORT_HAIR]: 10, [Traits.MEDIUM_HAIR]: 0, [Traits.LONG_HAIR]: -10 },
        size: { [Traits.THIN]: 20, [Traits.MEDIUM]: 10, [Traits.BULKY]: 0 },
        neck: { [Traits.SHORT_NECK]: 0, [Traits.MEDIUM_NECK]: 10, [Traits.LONG_NECK]: 20 }
    },

    [PREDATORS]: {
        legs: { [Traits.SHORT_LEGS]: -10, [Traits.MEDIUM_LEGS]: 10, [Traits.LONG_LEGS]: 30 },
        size: { [Traits.THIN]: 20, [Traits.MEDIUM]: 10, [Traits.BULKY]: 0 },
        camo: { [Traits.STRIPES]: 30, [Traits.NO_STRIPES]: 0 }
    },

    [TALL_PLANTS]: {
        legs: { [Traits.SHORT_LEGS]: 0, [Traits.MEDIUM_LEGS]: 20, [Traits.LONG_LEGS]: 40 },
        neck: { [Traits.SHORT_NECK]: 0, [Traits.MEDIUM_NECK]: 20, [Traits.LONG_NECK]: 40 }
    },

    // 60% max survival
    [VIRUS]: {
        legs: { [Traits.SHORT_LEGS]: 20, [Traits.MEDIUM_LEGS]: 10, [Traits.LONG_LEGS]: 0 },
        size: { [Traits.THIN]: 20, [Traits.MEDIUM]: 10, [Traits.BULKY]: 0 },
        neck: { [Traits.SHORT_NECK]: 0, [Traits.MEDIUM_NECK]: 10, [Traits.LONG_NECK]: 20 }
    },

    // 60% max survival
    [VOLCANO]: {
        legs: { [Traits.SHORT_LEGS]: 20, [Traits.MEDIUM_LEGS]: 10, [Traits.LONG_LEGS]: 0 },
        size: { [Traits.THIN]: 20, [Traits.MEDIUM]: 10, [Traits.BULKY]: 0 },
        neck: { [Traits.SHORT_NECK]: 20, [Traits.MEDIUM_NECK]: 10, [Traits.LONG_NECK]: 0 }
    }
}

export default {
    COLD,
    HOT,
    PREDATORS,
    VIRUS,
    VOLCANO,
    CATASTROPHES,
    SURVIVAL_CHANCE
};

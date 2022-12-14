# Are We There, Yeti?
<!-- This is an educational game to help students understand how natural selection works. Concept inspired by and based on "Who Wants to Live a Million Years?" -->

# To-Do:
- Intro: Darwin Landing Page        Static page with 2 buttons
- Learn about NS                    Static header + 3 part explainer
- Art for creatures and background


# Game:
- Make species w/ traits
    - Legs: short, medium, long
    - Camo: stripes, no stripes
    - Size: thin, medium, bulky
    - Horns: no horns, short horns, long horns
    - Hair: no hair, short hair, medium hair, long hair

- Make mutations w/ traits
    - User can pick 3 different mutations

- Population in array

- One reproduction round
    - Pick 2 random animals to produce offspring with mixed traits
    - Reproduction rate = 1.5x
    - Carrying capacity = 16 max

- One survival round
    - Use environmental event to filter population
    - Should be used multiple times (population changes as it goes)

- Generation = one reproduction round + one survival round
- Have 5-15 generations per user turn

- Add environmental events - 60% max chance of survival
    - Cold (60% max)
        - Legs: short 10% chance of living
        - Size: bulky 20% chance of living
        - Hair: long hair 20% chance of living
        - Horns: no horns 10% chance of living
    - Hot (60% max)
        - Legs: long 10% chance of living
        - Size: thin 20% chance of living
        - Hair: no hair 20% chance of living
        - Horns: long 10% chance of living
    - Predator (60% max)
        - Legs: long 20% chance of living
        - Camo: stripes 20% chance of living
        - Horns: long 20% chance of living
    - Tall plants w/ fruits (60% max)
        - Legs: long 30% chance of living
        - Horns: long 30% chance of living
     - Asteroid (40% max)
        - Legs: short 20% chance of living
        - Size: thin 20% chance of living
    - Volcano (40% max)
        - Legs: short 20% chance of living
        - Size: thin 20% chance of living
    - Virus (40% max)
        - Legs: short 10% chance of living
        - Size: thin 20% chance of living
        - Horns: long 10% chance of living

# To Deploy to GH Pages:
Initial setup
1. Change scripts in package.json to "build": "react-scripts build && rm -rf docs && mv build docs",
2. Go to GH repo -> Settings -> Pages and Branch "main" to "/docs"

For all future changes
3. Deploy changes with "npm run build" + commit + push

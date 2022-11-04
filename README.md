# darwin-game
<!-- This is an educational game to help students understand how natural selection works. Concept inspired by and based on "Who Wants to Live a Million Years?" -->

# To-Do:
- Intro: Darwin Landing Page        Static page with 2 buttons
- Learn about NS                    Static header + 3 part explainer
- Art for creatures


# Game:
- Make species w/ traits
    - Legs: short, medium, long
    - Camo: stripes, no stripes
    - Neck: short, medium, long
    - Size: thin, medium, bulky
    - Hair: no hair, short hair, furry

- Make mutations w/ traits
    - User can pick 3 different mutations

- Population in array

- One breeding round
    - Pick 2 random types and mix to breed a third one
    - Reproduction rate = 1.5x

- Add environmental events - 60% max chance of survival
    - Cold (60% max)
        - Legs: short 10% chance of living
        - Size: bulky 20% chance of living
        - Hair: furry 20% chance of living
        - Neck: short 10% chance of living
    - Hot (60%)
        - Legs: long 10% chance of living
        - Size: thin 20% chance of living
        - Hair: no hair 20% chance of living
        - Neck: long 10% chance of living
    - Volcano (60% max)
        - Legs: short 20% chance of living
        - Size: thin 20% chance of living
        - Neck: short 20% chance of living
    - Virus (40% max)
        - Legs: short 10% chance of living
        - Size: thin 20% chance of living
        - Neck: long 10% chance of living
    - Predator (60% max)
        - Legs: long 20% chance of living
        - Size: thin 20% chance of living
        - Camo: stripes 20% chance of living
    - Tall plants w/ fruits (60%)
        - Legs: long 30% chance of living
        - Neck: long 30% chance of living

- One filtering round
    - Use environmental event to filter population
    - Should be used multiple times (population changes as it goes)

- Generation = one reproduction round + one survival round

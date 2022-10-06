import { useState } from "react";
import createRandomOffspring from "./Game";

function MutationDisplay() {
    const [isOpen, setIsOpen] = useState(false);

    const openDisplay = () => {
        if (isOpen === false) {
            setIsOpen(true)
            console.log([{createRandomOffspring}])
        } else {
            setIsOpen(false);
        }
    }

    return (
        <section>
            <button onClick={openDisplay}>Mutation Display</button>
        </section>
    )
}

export default MutationDisplay;

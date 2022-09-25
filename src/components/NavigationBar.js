import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <section>
            <ul className="nav-bar">
                <button>Intro</button>
                <button>Natural Selection</button>
                <button>Survival Game</button>
                <button>Quiz</button>
                <button>Darwin's Bio</button>
                <button>Glossary</button>
            </ul>
        </section>
    );
};

export default NavigationBar;

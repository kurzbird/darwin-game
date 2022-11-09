import { Link } from 'react-router-dom';
import "./StartPage.css";

const StartPage = () => {
    return (
        <section className="home">
            <div className='text-container'>
                <div className="text">
                    <h1>Are We There, Yeti?</h1>
                    <h3>Introduction:</h3>
                    <p>Welcome to “Are We There, Yeti?” – the game based on Charles Darwin's principles of natural selection.
                        Your species will have to survive a changing – and sometimes cruel – environment.</p>
                    <h3>Objective:</h3>
                    <p>Let’s experiment with a theoretical species of vegetarian yetis that have a remarkably diverse range of traits.
                        You will choose individuals to create a population. Your goal is to establish a viable evolutionary lineage.
                        When disaster strikes, will you be able to lead your yetis to safety?</p>
                    <h3>How to Play:</h3>
                    <p>During each round, your yetis will be faced with a new environmental challenge.
                        However, you can help save them by introducing a new mutation -- but be careful,
                        you can only do this twice the entire game!
                    </p>
                    <Link to='/game' className="btn">Play Game</Link>
                </div>
            </div>
        </section>
    )
}

export default StartPage;

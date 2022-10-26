import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <section className="home">
            <div>
                <h1>Are We There, Yeti?</h1>
                <h3>Objective:</h3>
                <p>When disaster strikes, can you lead your yetis to safety?</p>
                <h3>How to Play:</h3>
                <p>During each round, your yetis will be faced with a new environmental challenge.
                    However, you can help save them by introducing a new mutation -- but be careful,
                    you can only do this twice the entire game!
                </p>
                <Link to='/game' className="btn">Play Game</Link>
            </div>
        </section>
    )
}

export default StartPage;

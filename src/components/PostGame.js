import React from "react";
import './PostGame.css';

const PostGame = ( { mostCommonYetis, roundPopulations, roundCatastrophes }) => {
    return (
        <div className="postgame-container">
            <div className="round-recap">
                <div className="year-1">
                    {/* TO-DO: Add image of most common yeti with stats */}
                    <div>Most Common Yeti: {mostCommonYetis[0]}</div>
                    <div>Population Size: {roundPopulations[0]}</div>
                    <div>Environmental Event: {roundCatastrophes[0]}</div>
                </div>

                <div className="year-124860">
                    <div>Most Common Yeti: {mostCommonYetis[1]} </div>
                    <div>Population Size: {roundPopulations[1]} </div>
                    <div>Environmental Event: {roundCatastrophes[1]}</div>
                </div>

                <div className="year-419868">
                    <div>Most Common Yeti: {mostCommonYetis[2]}</div>
                    <div>Population Size: {roundPopulations[2]} </div>
                    <div>Environmental Event: {roundCatastrophes[2]}</div>
                </div>

                <div className="year-692853">
                    <div>Most Common Yeti: {mostCommonYetis[3]}</div>
                    <div>Population Size: {roundPopulations[3]}</div>
                    <div>Environmental Event: {roundCatastrophes[3]}</div>
                </div>

                <div className="year-1000000">
                    <div>Most Common Yeti: {mostCommonYetis[4]}</div>
                    <div>Population Size: {roundPopulations[4]}</div>
                    <div>Environmental Event: {roundCatastrophes[4]}</div>
                </div>
            </div>
        </div>
    )
}

export default PostGame;

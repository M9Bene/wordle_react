import React, {useContext} from "react";
import {AppContext} from "../App";
import '../App.css';
import './GameOver.css';

export function GameOver() {

    const {gameOver, secretWord} = useContext(AppContext);

    return (
        <div className={'game-over'}>
            <h2>You have {gameOver}</h2>
            <button className={"restart-btn"} onClick={ () => window.location.reload()  }>Start New Game</button>
            <h3>the secret word was {secretWord}</h3>
        </div>
    )
}
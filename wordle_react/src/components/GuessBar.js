import React, {useContext} from "react";
import '../App.css';
import './GuessBar.css';
import {AppContext} from "../App";

export function GuessBar({letters, entered}) {

    const {secretWord, colorTheGuess} = useContext(AppContext);

    let coloring = entered ?  colorTheGuess(letters, secretWord) : [];

    return (
        <div className={"guess-bar"}>
            {letters.map((letter, index) => {
                let className = "guess-letter ";
                if (entered) {
                    className += coloring[index];
                }
                return (
                    <div key={index} className={className}>
                        {letter}
                    </div>
                )
            })}
        </div>
    )
}
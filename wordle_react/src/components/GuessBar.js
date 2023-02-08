import React from "react";
import '../App.css';
import './GuessBar.css';

export function GuessBar({letters, entered, secretWord}) {

    return (
        <div className={"guess-bar"}>
            {letters.map((letter, index) => {
                let className = "guess-letter";
                if (entered) {
                    letter === secretWord[index] ? className = "guess-letter correct"
                        : secretWord.includes(letter) ? className = "guess-letter almost"
                        : className = "guess-letter wrong";
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
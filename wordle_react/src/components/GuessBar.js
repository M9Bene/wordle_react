import React from "react";
import '../App.css';
import './GuessBar.css';

export function GuessBar({letters}) {

    return (
        <div className={"guess-bar"}>
            {letters.map((letter, index) => {
                return (
                    <div key={index} className={"guess-letter"}>
                        {letter}
                    </div>
                )
            })}
        </div>
    )
}
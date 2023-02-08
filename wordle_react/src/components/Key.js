import React, {useContext} from "react";
import {AppContext} from "../App";
import '../App.css';
import './Key.css';


export function Key({value, className}) {

    const {handleKeyUp, wrongLetters, correctLetters, almostLetters} = useContext(AppContext);

    if(wrongLetters.includes(value)){
        className = "wrong key";

    }else if(correctLetters.includes(value)){
        className= "correct key";

    }else if(almostLetters.includes(value)){
        className = "almost key";
    }

    return (
        <div className={className} onClick={() => {
            handleKeyUp(value, true);
        }}>
            {value}
        </div>
    )
}
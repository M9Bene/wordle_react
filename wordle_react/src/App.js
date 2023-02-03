import './App.css';
import {GuessBar} from "./components/GuessBar";
import {useEffect, useState} from "react";


let defaultGuesses = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
    ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]


function App() {

    const [guesses, setGuesses] = useState(defaultGuesses);
    const [roundNumber, setRoundNumber] = useState(0);
    const [letterNumber, setLetterNumber] = useState(0);

    function onLetterPressed(key) {
        let copy = [...guesses];
        copy[roundNumber][letterNumber] = key.toUpperCase();
        setGuesses(copy);
        setLetterNumber(letterNumber + 1);
    }

    function onEnterPressed() {
        setRoundNumber(roundNumber + 1);
        setLetterNumber(0);
    }

    function onBackspaceEntered() {
        let copy = [...guesses];
        copy[roundNumber][letterNumber - 1] = '';
        setGuesses(copy);
        setLetterNumber(letterNumber - 1);
    }

    function ifOnlyLetters(event) {
        return !!(event.which <= 90 && event.which >= 48 && event.key.match(/[A-z]/));
    }

    const handleKeyUp = (event) => {

        if (event.key === 'Backspace' && letterNumber > 0) {
            onBackspaceEntered();

        } else if (event.key === 'Enter' && letterNumber === 5) {
            onEnterPressed();

        } else if (letterNumber < 5 && ifOnlyLetters(event)) {
            onLetterPressed(event.key);
        }
    }


    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    })

    return (
        <div className="App">
            <div className={"header"}>
                <p>WORDLE</p>
            </div>
            <div className={"game-territory"}>
                <div className={"guesses"}>
                    {defaultGuesses.map((guess, index) => (
                        <GuessBar key={index} letters={guess}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

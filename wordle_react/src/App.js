import './App.css';
import {GuessBar} from "./components/GuessBar";
import {KeyBoard} from "./components/KeyBoard";
import {createContext, useEffect, useState} from "react";

export const AppContext = createContext();

const defaultGuesses = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
    ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

const secretWord = ["T", "I", "G", "E", "R"];

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

    const handleKeyUp = (event, byClick = false) => {
        console.log("handlekeyup function is called !")

        let key;
        byClick ? key = event : key = event.key;

        if (key === 'Backspace' && letterNumber > 0) {
            onBackspaceEntered();

        } else if (key === 'Enter' && letterNumber === 5) {
            onEnterPressed();

        } else if (letterNumber < 5) {

            if (byClick) {
                if (key !== "Enter" && key !== "Backspace") {
                    onLetterPressed(key);
                }
            } else {
                if (ifOnlyLetters(event)) {
                    onLetterPressed(key)
                }
            }
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
                        <GuessBar key={index} letters={guess} secretWord={secretWord} entered={index < roundNumber}/>
                    ))}
                </div>
                <AppContext.Provider value={handleKeyUp}>
                    <KeyBoard/>
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default App;

import './App.css';
import {GuessBar} from "./components/GuessBar";
import {KeyBoard} from "./components/KeyBoard";
import {GameOver} from "./components/GameOver";
import {createContext, useEffect, useState} from "react";
import {getSecretWord, getEmptyGuesses, getAllWords} from "./WordsHandler";


export const AppContext = createContext();

const defaultGuesses = getEmptyGuesses();
const secretWord = getSecretWord();
const allExistingWords = getAllWords();

function App() {
    const [guesses, setGuesses] = useState(defaultGuesses);
    const [roundNumber, setRoundNumber] = useState(0);
    const [letterNumber, setLetterNumber] = useState(0);

    const [wrongLetters, setWrongLetters] = useState([]);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [almostLetters, setAlmostLetters] = useState([]);

    const [gameOver, setGameOver] = useState("");
    const [isModalActive, setIsModalActive] = useState(false);
    const [helpInfoModal, setHelpInfoModal] = useState(false);



    function isLastGuessARealWord() {
        return allExistingWords.includes(guesses[roundNumber].join("").toLowerCase())
    }

    function onLetterPressed(key) {
        let copy = [...guesses];
        copy[roundNumber][letterNumber] = key;
        setGuesses(copy);
        setLetterNumber(letterNumber + 1);
    }

    function onEnterPressed() {

        const lastGuess = guesses[roundNumber];

        if (secretWord.join("") === lastGuess.join("")) {
            setGameOver("WON");
        } else if (roundNumber === 5) {
            setGameOver("LOST");
        }

        for (let i = 0; i < 5; i++) {
            if (!secretWord.join("").includes(lastGuess[i])) {
                setWrongLetters((prev) => [...prev, lastGuess[i]]);
            } else if (secretWord[i] === lastGuess[i]) {
                setCorrectLetters((prev) => [...prev, lastGuess[i]]);
            } else {
                setAlmostLetters((prev) => [...prev, lastGuess[i]]);
            }
        }

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
        setIsModalActive(false);
        setHelpInfoModal(false);

        let key;
        byClick ? key = event : key = event.key;

        if (key === 'Backspace' && letterNumber > 0) {
            onBackspaceEntered();

        } else if (key === 'Enter' && letterNumber === 5) {
            if (isLastGuessARealWord()) {
                onEnterPressed();
            } else {
                setIsModalActive(true);
            }

        } else if (letterNumber < 5) {

            if (byClick) {
                if (key !== "Enter" && key !== "Backspace") {
                    onLetterPressed(key);
                }
            } else {
                if (ifOnlyLetters(event)) {
                    onLetterPressed(key.toUpperCase());
                }
            }
        }
    }

    const colorTheGuess = (letters, secretWord) => {

        let lettersToCompare = [...secretWord];
        let coloring = ["wrong", "wrong", "wrong", "wrong", "wrong"];

        letters.forEach((letter, i) => {
            if (letter === secretWord[i]) {
                coloring[i] = "correct";
                lettersToCompare.splice(lettersToCompare.indexOf(letter), 1);
            }
        })

        letters.forEach((letter, i) => {
            if (lettersToCompare.includes(letter) && coloring[i] !== "correct") {
                coloring[i] = "almost";
                lettersToCompare.splice(lettersToCompare.indexOf(letter), 1);
            }
        })

        return coloring;
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
                <button className={"help-button"} onClick={() => setHelpInfoModal(true)}>help</button>
            </div>
            <div className={"game-territory"}>
                <AppContext.Provider value={{
                    handleKeyUp, colorTheGuess,
                    wrongLetters, correctLetters, almostLetters, secretWord, gameOver
                }}>
                    <div className={"guesses"}>
                        {guesses.map((guess, index) => (
                            <GuessBar key={index} letters={guess} entered={index < roundNumber}/>
                        ))}
                    </div>

                    <div className={isModalActive ? "my-modal" : "my-modal invisible"}>
                        You can only guess an existing word
                    </div>

                    {helpInfoModal &&
                        <div className='help-info-modal-backdrop' onClick={() => setHelpInfoModal(false)}>
                        <div className={"help-info-modal"}>
                            <h1>Info About The Game</h1>
                            <section>
                                <ul>
                                    <li>
                                        Guess the secret word in 6 tries
                                    </li>
                                    <li>
                                        Each guess must be a 5 letter long english word
                                    </li>
                                    <li>

                                        <p>The color of the tiles will change to help you</p>
                                        <ul>
                                            <li className={"correct"}>
                                                Green --> The letter is in secret the word also in the correct position
                                            </li>
                                            <li className={"almost"}>
                                                Yellow --> The letter is in secret the word but in a wrong position
                                            </li>
                                            <li className={"wrong"}>
                                                Grey --> The letter is not in the secret word
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </section>
                            <p>(Click anywhere to exit from help information)</p>
                        </div>
                    </div>
                    }

                    {gameOver ? <GameOver/> : <KeyBoard/>}
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default App;

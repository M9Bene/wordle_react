import './App.css';
import {GuessBar} from "./components/GuessBar";


let defaultGuesses = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
    ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

function App() {

  return (
    <div className="App">
      <div className={"header"}>
        <p>WORDLE</p>
      </div>
        <div className={"game-territory"}>
            <div className={"guesses"}>
                {defaultGuesses.map((guess, index) => (
                    <GuessBar letters={guess}/>
                ))}
            </div>
        </div>
    </div>
  );
}

export default App;

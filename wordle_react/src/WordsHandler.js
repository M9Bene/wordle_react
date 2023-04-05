import words from "./Words.json";

export function getEmptyGuesses() {
    return [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
        ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
}

export function getSecretWord() {

   // let secretWord = words[Math.trunc(Math.random() * words.length)].toUpperCase();

    let secretWord = "EARTH";

    return secretWord.split("");
}

export function getAllWords() {
    return words;
}
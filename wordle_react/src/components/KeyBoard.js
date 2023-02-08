import React from "react";
import {Key} from "./Key";
import '../App.css';
import './KeyBoard.css';


export function KeyBoard() {

    const keyboard_line_1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keyboard_line_2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keyboard_line_3 = ["Z", "X", "C", "V", "B", "N", "M"];


    return (<div className={"keyboard"}>
        <div className={"keyboard-line"}>

            {keyboard_line_1.map((key) => (
                <Key value={key} className={'key'}/>
            ))}

        </div>
        <div className={"keyboard-line"}>

            {keyboard_line_2.map((key) => (
                <Key value={key} className={'key'}/>
            ))}

        </div>
        <div className={"keyboard-line"}>

            <Key value={"Enter"} className={'enter key'}/>

            {keyboard_line_3.map((key) => (
                <Key value={key} className={'key'}/>
            ))}

            <Key value={"Backspace"} className={'backspace key'}/>
        </div>
    </div>)
}
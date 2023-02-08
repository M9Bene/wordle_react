import React, {useContext} from "react";
import {AppContext} from "../App";
import '../App.css';
import './Key.css';


export function Key({value, className}) {

    const handleKeyUp = useContext(AppContext);

    return (
        <div className={className} onClick={() => {
            handleKeyUp(value, true);
        }}>
            {value}
        </div>
    )
}
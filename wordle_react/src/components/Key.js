import React from "react";
import '../App.css';
import './Key.css';

export function Key({value, className}) {

    return (
        <div className={className}>
            {value}
        </div>
    )
}
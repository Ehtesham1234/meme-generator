import React from "react";
import TrollFace from "../images/troll-face-png-19697.png"
export default function Header(){
    return(
        <header className="header">
            <img src={TrollFace} 
            className="header--image"
         />
            <h1 className="header-title">Meme Generator</h1>
            <h4 className="header-project">React Course-Project 3</h4>
        </header>
    );
}
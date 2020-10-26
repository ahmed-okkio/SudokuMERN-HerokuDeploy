import React, { useState,useEffect, useRef } from 'react';
import classes from '../../CSS/Main.module.css';
import Game from './Game';
import Timer from '../Timer/Timer';


const GameContainer = () =>{
    const[pushScore,setScore]=useState({score:0}) 
    const [gameState,setgameState]= useState({gameState:false})
    const gameHandler =()=>{
        let tempstate = gameState.gameState
        setgameState({gameState:!tempstate})
     }
    const scoreGrab = (score)=>{
        setScore({score:score})
    }
    const resetTimerRef = useRef();
    return(
        <>
            <Timer ref={resetTimerRef} gameState={gameState.gameState} scoreGrab={scoreGrab}/>
            <Game 
                gameState={gameState.gameState}
                gameHandler={gameHandler}
                score={pushScore.score}
                resetTimer={() =>resetTimerRef.current.resetTimer()}/>
        </>
    )
}
export default GameContainer;
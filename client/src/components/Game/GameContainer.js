import React, { useState,useEffect } from 'react';

import classes from '../../CSS/Main.module.css';
import Game from './Game';
import Timer from '../Timer/Timer';


const GameContainer = () =>{
    const[LoadTemp,setLoadTemp]=useState({opacity:0})
    const[pushScore,setScore]=useState({score:0})
    useEffect(()=>{
        setTimeout(()=>{
            setLoadTemp({opacity:1,})
        },500)
        setTimeout(()=>{
            setLoadTemp({trans:"none"})
        },1000)
    },[])
    
    const [gameState,setgameState]= useState({gameState:false})
    const gameHandler =()=>{
        let tempstate = gameState.gameState
        setgameState({gameState:!tempstate})
     }
    const scoreGrab = (score)=>{
        setScore({score:score})
    }
    return(
        <div className={classes.App} style={{opacity:`${LoadTemp.opacity}`,transition:LoadTemp.trans}}>
            <Timer gameState={gameState.gameState} scoreGrab={scoreGrab}/>
            <Game 
                gameState={gameState.gameState}
                gameHandler={gameHandler}
                score={pushScore.score}/>
        </div>
    )
}
export default GameContainer;
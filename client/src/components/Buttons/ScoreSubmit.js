import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import classes from '../../CSS/Main.module.css';

const ScoreCalc = (props) => {
    const[finalScore,setFinalScore]=useState(1000/props.Score)
    useEffect(()=>{
    },[])
    
    return (
        <div>
            <label>{finalScore}</label>
            <button onClick={console.log(finalScore)}>SUBMIT</button>
        </div>
    )
}
export default ScoreCalc;
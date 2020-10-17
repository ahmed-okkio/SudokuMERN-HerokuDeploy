import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Squares from '../../Assets/nine-squares.svg';
import classes from '../../CSS/Home.module.css'


const Home = () => {
    const[LoadTemp,setLoadTemp]=useState({opacity:0})
    useEffect(()=>{
        setTimeout(()=>{
            setLoadTemp({opacity:1,})
        },500)
        setTimeout(()=>{
            setLoadTemp({trans:"none"})
        },1000)
    },[])
    return(
        <>
        <div className={classes.HomeContainer}style={{opacity:`${LoadTemp.opacity}`,transition:LoadTemp.trans}}>
            <NavLink to='/Game'className={classes.playBackground}>
                <h1>Play</h1>
            </NavLink>
            <div className={classes.svgContainer}>
                <p className={classes.Su}>Su</p>
                <p className={classes.Do}>do</p>
                <p className={classes.Ku}>Ku</p>
                <p className={classes.One}>1</p>
                <p className={classes.Five}>5</p>
                <p className={classes.Nine}>9</p>
                <p className={classes.Three}>3</p>
                <p className={classes.Eight}>8</p>
                <p className={classes.Four}>4</p>
                <img src={Squares} className={classes.ninesquares} alt="nine-squares"></img>
                <a href="https://trello.com/b/nsFIjztS/sudoku-mern">Finsished and upcoming changes</a>
            </div>
            
        </div>
        
    </>
    )
};
export default Home;
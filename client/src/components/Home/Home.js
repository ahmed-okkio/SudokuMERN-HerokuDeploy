import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Squares from '../../Assets/nine-squares.svg';
import classes from '../../CSS/Home.module.css'


const Home = () => {
    console.log(parseFloat("13"+"40")/1000)
    return(
        <>
        <div className={classes.HomeContainer}>
            <NavLink to='/Game'className={classes.playBackground}>
                <h1>Play</h1>
            </NavLink>
            <div className={classes.svgContainer}>
                <div className={classes.ninesquaresContainer}>
                    <img src={Squares} className={classes.ninesquares} alt="nine-squares"></img>
                    <p className={classes.Su}>Su</p>
                    <p className={classes.Do}>do</p>
                    <p className={classes.Ku}>Ku</p>
                    <p className={classes.One}>1</p>
                    <p className={classes.Eight}>8</p>
                    <p className={classes.Nine}>9</p>
                    <p className={classes.Five}>5</p>
                    <p className={classes.Three}>3</p>
                    <p className={classes.Four}>4</p>
                </div>
                
            </div>
            <p className={classes.Credit}>This project was created by Ahmed "Okkio" Hamad</p>
        </div>
        
    </>
    )
};
export default Home;
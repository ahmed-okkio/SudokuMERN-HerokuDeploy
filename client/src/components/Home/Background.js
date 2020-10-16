import React from 'react';
import Square from '../../Assets/one-square.svg';
import classes from '../../CSS/Home.module.css'
const Background =() =>{
    return(
        <div>
            <img src={Square} className={classes.onesquare1} alt="one-square"></img>
            <img src={Square} className={classes.onesquare2} alt="one-square"></img>
            <img src={Square} className={classes.onesquare3} alt="one-square"></img>
            <img src={Square} className={classes.onesquare5} alt="one-square"></img>
            <img src={Square} className={classes.onesquare6} alt="one-square"></img>
            <img src={Square} className={classes.onesquare7} alt="one-square"></img>
            <img src={Square} className={classes.onesquare8} alt="one-square"></img>
            <img src={Square} className={classes.onesquare9} alt="one-square"></img>
        </div>
    )
}
export default Background
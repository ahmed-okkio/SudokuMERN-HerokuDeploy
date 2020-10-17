import React, {useState, useEffect} from 'react';
import classes from '../../CSS/Complete.module.css'

const Complete = () =>{
    return(
        <div className={classes.completeContainer}>
            <label className={classes.Complete}>Puzzle Solved!</label>
            {/* <p>Check your score in the Rankings page</p> */}
        </div>
    )
}
export default Complete;
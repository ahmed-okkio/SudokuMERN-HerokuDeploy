import React from 'react';
import classes from '../../CSS/Main.module.css'

const Solve =(props) =>{
    let BttnText = "START"
    if(props.gameState){
        BttnText = "FINISH"
    }
    return(
        <div className={classes.PageBtns}>
            <button onClick={props.onClick} className={classes.Solvebtn}>{BttnText}</button>
        </div>
    )
}
export default Solve;
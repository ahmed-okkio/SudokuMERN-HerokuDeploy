import React from 'react';
import classes from '../../../CSS/GameStyle.module.css'

const GridOverlay = () => {
    return(
            <div className={classes.GridOverlay} >
                <li className={classes.ThickGridH1}></li>
                <li className={classes.ThickGridH2}></li>
                <li className={classes.ThickGridW1}></li>
                <li className={classes.ThickGridW2}></li>
            </div>
    )
}

export default GridOverlay;
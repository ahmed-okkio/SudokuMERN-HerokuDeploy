import React  from 'react';
import classes from '../../CSS/Main.module.css';
const Progress = props => {

    return(
    <div className={classes.progress}>
        <div className={classes.progresscomplete} style={{opacity:`${props.opacity}` ,width:`${props.complete}%`}}>
            
        </div>
    </div>
    )
}
export default Progress;
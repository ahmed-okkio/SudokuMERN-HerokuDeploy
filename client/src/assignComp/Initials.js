import React from 'react';
import classes from './../App.module.css'
const initials = (props) => {

    return (
        <div className={classes.Initials} onClick={props.deletechar}>
            <p >{props.letters}</p>
        </div>
    )

}
export default initials;
import React, { useState } from 'react';
import classes from '../../../CSS/GameStyle.module.css';
import erasersvg from '../../../Assets/eraser.svg';
import pencilsvg from '../../../Assets/pencil.svg';
const InputPad = (props) => {
    const style = {
        top: props.Ycoords,
        left: props.Xcoords,
        opacity: 1
    }
    const unsureModeHandler = () => {
        const tempstate = props.unsureMode
        props.setUnsureMode(!tempstate)
    }
    const inputHandler = (input) => {
        let unsureInput = null
        if (props.unsureMode) {
            unsureInput = input.toString() + "U"
            props.InputHandler(unsureInput)
        } else {
            props.InputHandler(input)
        }
    }
    if (props.Xcoords < 80) {
        style.left += 75

    } else if ((window.screen.availWidth - props.Xcoords) < 80) {
        style.left -= 75
    }
    let unsureModeIndicator = {}
    if(props.unsureMode) {
        unsureModeIndicator = {
            opacity: 0.8,
            backgroundColor: "#FDC12A"
        } // Sets unsure button opacity and color
    }

    const keyPads = []

    for (let num = 1; num < 10; num++) {

        keyPads.push(
            <li onClick={() => { inputHandler(num) }} key={num}>{num}</li>
        )

    }



    return (
        <div className={classes.PadContainer} style={style} >
            <ul className={classes.padutils}>
                <li onClick={props.togglePad} className={classes.padutilsClose}>X</li>
            </ul>
            <ul className={classes.Padstyle}  >

                {keyPads}
            </ul>
            <ul className={classes.padutils}>
                <li onClick={() => { inputHandler(0) }}><img src={erasersvg} /></li>
                <li onClick={unsureModeHandler} style={{opacity:unsureModeIndicator.opacity, backgroundColor: unsureModeIndicator.backgroundColor}}><img src={pencilsvg} /></li>
            </ul>
        </div>
    )
}
export default InputPad;
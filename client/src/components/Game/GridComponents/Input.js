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
    const unsureInputHandler = (input) => {
        let unsureInput = null
        unsureInput = input.toString() + "U"
        props.InputHandler(unsureInput)

    }
    if (props.Xcoords < 80) {
        style.left += 75

    } else if ((window.screen.availWidth - props.Xcoords) < 80) {
        style.left -= 75
    }

    const keyPads = []

    for (let num = 1; num < 10; num++) {

        keyPads.push(
            <li onClick={() => { props.InputHandler(num) }} key={num}>{num}</li>
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
                <li onClick={() => { props.InputHandler(0) }}><img src={erasersvg} /></li>
                <li onClick={() => {unsureInputHandler(props.inputValue)}}><img src={pencilsvg} /></li>
            </ul>
        </div>
    )
}
export default InputPad;
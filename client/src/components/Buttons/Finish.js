import React, { useState, useEffect } from 'react';
import classes from '../../CSS/Main.module.css'



const Finish = (props) => {
    const [BttnStyle, setBttnStyle] = useState({
        BttnCol: ""
    })
    const solvePuzzle = (Puzzle) => {
        let dupeCheck = []
        for (let n = 1; n < 10; n++) {
            for (let i = 0; i < 9; i++) {
                for (let m = i + 1; m < 9; m++) {                       //Horizontal Check
                    if (Puzzle["R" + n][i] == Puzzle["R" + n][m]) {
                        // console.log(Puzzle["R" + n][i], Puzzle["R" + n][m])  //
                        return false             //
                    }
                }
            }
        }
        for (let i = 0; i < 9; i++) {
            for (let n = 1; n < 9; n++) {
                for (let m = n + 1; m < 9; m++) {
                    if (Puzzle["R" + n][i] == Puzzle["R" + (m)][i]) {
                        // console.log(Puzzle["R" + n][i], Puzzle["R" + (m)][i])
                        return false
                    }
                }
            }
        }
        for (let x = 0; x < 9; x += 3) {
            for (let t = 0; t < 9; t += 3) {                                                                                           //SubGrid Check
                for (let n = 1; n < 4; n++) {
                    for (let p = 0; p < 3; p++) {
                        for (let i = 1; i < 4; i++) {
                            for (let m = 0; m < 3; m++) {
                                // console.log("Puzzle[R" + (n + x) + "][" + (p + t) + "]" + "==" + "Puzzle[R" + (i + x) + "][" + (m + t) + "]")
                                if (Puzzle["R" + (n + x)][p + t] == Puzzle["R" + (i + x)][m + t]) {
                                    dupeCheck.push(Puzzle["R" + i][m])
                                }
                            }
                        }
                    }
                }
            }
        }
        if (dupeCheck.length !== 81) {
            return false
        }
        return true
    }
    
    let Button = (<button onClick={props.onClick} className={classes.Solvebtn} style={{ backgroundColor: BttnStyle.BttnCol }}>FINISH</button>)
    
    useEffect(() => {
        if (props.triggstate) {
            if (props.Puzzle == null || props.puzzleComplete !== 81) {
                setBttnStyle({ BttnCol: "#ff3363" })
                setTimeout(() => {
                    setBttnStyle({})
                }, 700)
            }
            else {
                if (solvePuzzle(props.Puzzle)) {
                     return(props.endPuzzle()) 
                }
                
                else {
                    setBttnStyle({ BttnCol: "#ff3363" })
                    setTimeout(() => {
                        setBttnStyle({})
                    }, 700)
                }
            }
        }
    }, [props.trigger,props.score])
    return (
        <div className={classes.PageBtns}>
            {Button}
        </div>
    )
}
export default Finish;
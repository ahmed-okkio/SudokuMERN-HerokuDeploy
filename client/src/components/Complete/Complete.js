import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import classes from '../../CSS/Complete.module.css'


const Complete = (props) => {
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [show, setShow] = useState(false);
    const confettiRef = useRef(null);

    useEffect(() => {
        setHeight(confettiRef.current.clientHeight);
        setWidth(confettiRef.current.clientWidth);
        handleShow(true)
        setTimeout(()=>{
        },500)
        setTimeout(()=>{
            handleShow(false)
        },5000)
    }, [])
    let Score = null
    if(props.location.state !== undefined){
        Score = props.location.state.score.toString()
        let temp = Score.slice(0,1)+Score.slice(2,3)
        let temp1 = Score.slice(3,5)
        Score = temp+":"+temp1
    }
    
    const handleShow = toggle => {
        setShow(toggle);
    }
    return (
        <div className={classes.completeContainer}
        ref={confettiRef}>
        <Confetti
        recycle={show}
        numberOfPieces={80}
        width={width}
        height={height}/>
            <label className={classes.Score}>{Score}</label>       
            <label className={classes.puzzleComplete}>Puzzle Solved!</label>
            {/* <p>Check your score in the Rankings page</p> */}
        </div>
    )
}
export default Complete;
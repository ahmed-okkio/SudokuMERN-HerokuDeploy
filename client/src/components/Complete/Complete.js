import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import classes from '../../CSS/Complete.module.css'
import AnimatedScore from 'react-animated-number';


const Complete = (props) => {
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [show, setShow] = useState(false);
    const [timeState,setTimeState] = useState();
    const [scoreState,setScoreState] = useState();
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
        let Score = null
        let Time = null
        if(props.location.state !== undefined){
            Score = props.location.state.score.toString()
            Time = props.location.state.time.toString()
            let temp = Time.slice(0,1)+Time.slice(2,3)
            let temp1 = Time.slice(3,5)
            Time = temp+":"+temp1
            setTimeState(Time)
            setScoreState(Score)
        }
    }, [])
    
    
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
            <label className={classes.Time}>{timeState}</label>         
            <label className={classes.puzzleComplete}>Puzzle Solved!</label>
            <AnimatedScore
                value={scoreState}
                formatValue={n=>"+" + n.toFixed(0)}
                className={classes.Score}
                duration={800}
            />
            {/* <p>Check your score in the Rankings page</p> */}
        </div>
    )
}
export default Complete;
import React, {useState} from 'react';
import refreshButton from '../../Assets/refreshPuzzle.svg'
import play from '../../Assets/play.svg'
import pause from '../../Assets/pause.svg'
import classes from '../../CSS/GameStyle.module.css';
const GameFunctions = (props) =>{
    const [style,setStyle] = useState();
    const puzzleRefresh = () => {
        props.PuzzleLoader()
        props.resetTimer()
        setStyle({
            transform: "rotate(360deg)"
        })
        setTimeout(()=>{
            setStyle({
                transition: 'none',
                transform: "rotate(0deg)"
            })
        },500)
    }
    let PausePlay = (
        <img src={play} onClick={props.gameHandler} className={classes.PlayPause} style={style}/>
    )
    if(props.gameState) {
        PausePlay = (
            <img src={pause} onClick={props.gameHandler} className={classes.PlayPause} style={style}/>
        )
    }
    let RefreshButton = (
        <img src={refreshButton} onClick={puzzleRefresh} className={classes.refreshButton} style={style}/>
    )
    if (props.firstStart) {
        PausePlay = null
        RefreshButton= null
    } 
    
    return(
        <>
            {PausePlay}
            {RefreshButton}
            
        </>
    )
}
export default GameFunctions;
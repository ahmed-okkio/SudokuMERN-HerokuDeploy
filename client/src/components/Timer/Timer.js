import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
import classes from '../../CSS/GameStyle.module.css';

const Timer = forwardRef((props, ref) =>{
    const [timersec,settimersec] =useState('00');
    const [timermin,settimermin] =useState('00');
    useImperativeHandle(ref, ()=>({
        resetTimer(){
            settimermin('00');
            settimersec('00')
        }
    }));
    let interval = useRef();
    const countUp = () =>{
        interval = setTimeout(() => {
        let min = parseInt(timermin)
        let sec = parseInt(timersec)
        if(sec<9){
            settimersec ('0'+(sec+ 1).toString())

        }
        else if (sec == 59&& min<9){
            settimersec('00')
            settimermin ('0'+(min+ 1).toString())
        
        }
        else if(sec == 59&& min>8){
            settimersec('00')
            settimermin ((min+ 1).toString())   
        }
        else{
            settimersec ((sec+ 1).toString())
        }
    }, 1000);
    }
    useEffect(()=>{
        if(props.gameState){
            countUp();
            return()=>{
                clearTimeout(interval)
            }
        }
     });
    useEffect(()=>{
        if(!props.gameState){
            props.scoreGrab(parseFloat(timermin+timersec)/1000,timermin+timersec)
        }
    },[props.gameState])
     
    return(
        <div className={classes.Timer}>{timermin+":"+timersec}</div>
    )
})

export default Timer;
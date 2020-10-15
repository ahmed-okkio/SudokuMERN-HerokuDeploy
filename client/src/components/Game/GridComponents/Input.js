import React, {} from 'react';
import classes from '../../../CSS/GameStyle.module.css';
const InputPad = (props) =>{
    const style = {
        top: props.Ycoords-69,
        left: props.Xcoords-64,
        opacity: 1
    }
    const keyPads=[]
    
    for(let num = 1;num<10 ;num++){
        
        keyPads.push(
        <li onClick={()=>{props.InputHandler(num)}} key={num}>{num}</li>
        )
        
    }


    return(
        <div className={classes.PadContainer} style={style} >
            <ul className={classes.Padstyle}  >
                {keyPads}
            </ul>
        </div>
    )
}
export default InputPad;
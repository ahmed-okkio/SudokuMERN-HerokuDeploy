import React from 'react';
import classes from '../../../CSS/GameStyle.module.css'
const LogicContainers = props =>{
    
    let pushpuzzle = (
        <ul className={classes.GameComp} >
            
            {props.Data.map((val,index)=>{
                let status = null;
                let color = null;
                let inputValue = null
                if(val!= 0){
                    inputValue = val
                }
                if(val==0||typeof val == "string"){
                    status = "dynamic"
                    color = "#08f7be"
                }
                else{
                    status = "static"
                }
                if(props.start){
                    
                }
                else{
                    inputValue = " "
                    status = "static"
                }
                
            
                
            return(
                <li key={index} status={status} id={index} onClick={(event)=>{props.PadHandler(event,status, props.Sector,index)}} style={{color:`${color}`}} >{inputValue}</li>
                )
            })}
            
        </ul>
    )
    return(
        <div>
            {pushpuzzle}
            
        </div>
    )

}
export default LogicContainers;
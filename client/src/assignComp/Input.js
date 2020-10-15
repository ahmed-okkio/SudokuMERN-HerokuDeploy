import React from 'react';

const input1 = (props) => {
    return (
        <div>
            <input type="text" onChange={props.chars} value={props.val}/>
            <p>{props.charcount}</p>
        </div>
    )
}
export default input1;
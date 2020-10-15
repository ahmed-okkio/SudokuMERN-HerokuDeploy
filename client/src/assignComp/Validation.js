import React from 'react';

const validate = (props) => {
    var lengthCheck = "Just right";
    if (props.charCount >= 10) {
        lengthCheck = "Text too long";
    }
    else if (props.charCount <= 5) {
        lengthCheck = "Text too short";
    }
    return (
        <div>
            <p>{lengthCheck}</p>
        </div>

    )
}
export default validate;
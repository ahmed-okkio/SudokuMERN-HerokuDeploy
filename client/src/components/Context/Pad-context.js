import React from 'react';
const padContext=  React.createContext({
    showPad: false,
    PadHandler:() =>{},
    InputHandler:()=>{}
})
export default padContext;
/*
1. add a context for pad status (static or dynamic) 
2.Add a context for pad menu toggle for only non static list elements
3. If pad static allow this context to enter a value with a context function*/
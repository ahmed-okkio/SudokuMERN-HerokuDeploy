import React, { useState, useEffect, useRef } from 'react';
import classes from '../../CSS/GameStyle.module.css';
import LogicContainers from './GridComponents/LogicContainers';
import GridOverlay from './GridComponents/GridOverlay';
import InputPad from './GridComponents/Input';
import padContext from '../Context/Pad-context';
import Start from '../Buttons/Start';
import Finish from '../Buttons/Finish';
import puzzleData from '../../Assets/data.json';
import GameFunction from '../Buttons/GameFunctions';
import { useHistory } from 'react-router-dom';
import { submitScore, Verify } from '../utils/requests';
import { getFromStorage } from '../utils/localstorage';

const Game = (props) => {
    const [inputPadState, setInputPadState] = useState({showPad: false, Xcoords: null, Ycoords: null, cellindex: null})
    const [ActivePuzzle, SetPuzzle] = useState({
        R1: [null, null, null, null, null, null, null, null, null],
        R2: [null, null, null, null, null, null, null, null, null],
        R3: [null, null, null, null, null, null, null, null, null],
        R4: [null, null, null, null, null, null, null, null, null],
        R5: [null, null, null, null, null, null, null, null, null],
        R6: [null, null, null, null, null, null, null, null, null],
        R7: [null, null, null, null, null, null, null, null, null],
        R8: [null, null, null, null, null, null, null, null, null],
        R9: [null, null, null, null, null, null, null, null, null]});
    const [puzzCompState, setPuzzComp] = useState({ complete: 0 });
    const [triggerCheck, setTrigger] = useState({ trigger: false, state: false });
    const [puzzleCorrect, setPuzzleCorrect] = useState(false);
    const [puzzleID, setPuzzleID] = useState('');
    const [firstStart, setFirstStart] = useState(true);
    const puzzleStart = () => {
        if(firstStart) {
        setFirstStart(false)
        props.gameHandler()
        PuzzleLoader()
        } else {
            props.gameHandler()
        }
    }
    const puzzleFinish = () => {
        let temp = 0
        Object.keys(ActivePuzzle).map((Sector, key) => {
            for (let i = 0; i < ActivePuzzle[Sector].length; i++) {
                let row = ActivePuzzle[Sector][i]
                if (row !== 0 && row !== null) {
                    temp++

                }
            }
        })
        setPuzzComp({ complete: temp })
        let temp2 = triggerCheck.trigger
        setTrigger({
            trigger: !temp2,
            state: true
        })
    }
    const PadHandler = (event, stat, Sector, index,inputValue) => {
        if(stat == "static"){
        } else {
            if (inputPadState.showPad) {
                setInputPadState({
                    showPad: false
                });
            }
            setInputPadState({
                showPad: true,
                Xcoords: event.clientX,
                Ycoords: event.clientY,
                cellindex: index,
                Sector: Sector,
                inputValue: inputValue
            })
     }
        
    }
    const InputHandler = (padinput) => {
        let Tempstate = ActivePuzzle
        Tempstate[inputPadState.Sector][inputPadState.cellindex] = padinput.toString()

        SetPuzzle(Tempstate)
        setInputPadState({
            showPad: false
        })

    }
    let history = useHistory();
    const endPuzzle = () => {
        setPuzzleCorrect(true)
        props.gameHandler()
        // 

    }
    
    const togglePad = () => {
        if (inputPadState.showPad) {
            setInputPadState({ showPad: false })
        }
    }
    const PuzzleLoader = () => {
        let tempcounter = 0
        let RawPuzzle = null;
        let i = Math.floor((Math.random() * 498) + 1)
        RawPuzzle = puzzleData[i]["puzzle"].toString()
        setPuzzleID(RawPuzzle.substring(0, 6))
        let PuzzProcess = RawPuzzle.split("")
        let ReadyPuzz = {
            R1: [],
            R2: [],
            R3: [],
            R4: [],
            R5: [],
            R6: [],
            R7: [],
            R8: [],
            R9: []
        }
        for (let n = 1; n < 10; n++) {
            for (let i = 0; i < 9; i++) {
                ReadyPuzz["R" + n].push(parseInt(PuzzProcess[tempcounter]))
                tempcounter++
            }
        }
        SetPuzzle(ReadyPuzz)
    }

    let GameComponents = (
        <div >
            {Object.keys(ActivePuzzle).map((Sector, key) => {
                return (
                    <LogicContainers start={props.gameState} {...inputPadState} PadHandler={PadHandler} Data={ActivePuzzle[Sector]} Sector={Sector} key={key} />
                )
            })}

        </div>
    )
    let inputmenu = null;
    if (inputPadState.showPad) {
        inputmenu = (
            <InputPad InputHandler={InputHandler} inputValue={inputPadState.inputValue} togglePad={togglePad} Ycoords={inputPadState.Ycoords} Xcoords={inputPadState.Xcoords} />
        );
    }
    
    useEffect(() => {
        if (puzzleCorrect) {
            const obj = getFromStorage('sudoku_react')
            if (obj !== null) {

                Verify(obj.token)
                    .then(res => {
                        if (res.data.success) {
                            submitScore({ userId: res.data.userId, score: parseInt(1000 / props.score) })
                            .then(() => {
                                history.push({
                                    pathname:'/Complete',
                                    state:{
                                        time: props.score,
                                        score: parseInt(1000 / props.score)}
                                })
                            })
                        } else {
                            history.push({
                                pathname:'/Complete',
                                state:{
                                    time: props.score
                                    }
                            })
                        }
                    })
            } else {
                history.push({
                    pathname:'/Complete',
                    state:{
                        time: props.score
                        }
                })
            }
        } 
    }, [props.score])
    let StartFin = <Start onClick={puzzleStart} gameState={props.gameState}></Start>
    if (props.gameState) {
        StartFin = <Finish
            onClick={puzzleFinish}
            endPuzzle={endPuzzle}
            triggstate={triggerCheck.state}
            trigger={triggerCheck.trigger}
            puzzleComplete={puzzCompState.complete}
            Puzzle={ActivePuzzle}
            score={props.score} />
    }
    return (
        <div className={classes.gamePage} >
            {inputmenu}
            <GameFunction firstStart={firstStart} resetTimer={props.resetTimer} PuzzleLoader={PuzzleLoader} gameState={props.gameState} gameHandler={props.gameHandler}/>
            <div className={classes.GameStyleContainer} >

                <padContext.Provider value={{ showPad: inputPadState.showPad, PadHandler: PadHandler }}>
                    <div className={classes.GameContainer} content="width=device-width">
                        <GridOverlay />
                        {GameComponents}
                    </div>
                </padContext.Provider>
            </div>
            {StartFin}
            <div className={classes.outOfBounds} onClick={togglePad}/>
        </div>
    )
};
export default Game;
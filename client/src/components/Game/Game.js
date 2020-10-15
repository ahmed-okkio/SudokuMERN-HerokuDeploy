import React, { useState, useEffect } from 'react';
import classes from '../../CSS/GameStyle.module.css';
import LogicContainers from './GridComponents/LogicContainers';
import GridOverlay from './GridComponents/GridOverlay';
import InputPad from './GridComponents/Input';
import padContext from '../Context/Pad-context';
import Solve from '../Buttons/Solve';
import Finish from '../Buttons/Finish';
import puzzleData from '../../Assets/data.json';
// import fire from '../Login/fire';
import { useHistory } from 'react-router-dom';
import { submitScore, Verify } from '../utils/requests';
import { getFromStorage } from '../utils/localstorage';

const Game = (props) => {
    const [inputPadState, setInputPadState] = useState({
        showPad: false,
        Xcoords: null,
        Ycoords: null,
        cellindex: null
    })
    const [ActivePuzzle, SetPuzzle] = useState({
        R1: [null, null, null, null, null, null, null, null, null],
        R2: [null, null, null, null, null, null, null, null, null],
        R3: [null, null, null, null, null, null, null, null, null],
        R4: [null, null, null, null, null, null, null, null, null],
        R5: [null, null, null, null, null, null, null, null, null],
        R6: [null, null, null, null, null, null, null, null, null],
        R7: [null, null, null, null, null, null, null, null, null],
        R8: [null, null, null, null, null, null, null, null, null],
        R9: [null, null, null, null, null, null, null, null, null]
    });
    const [puzzCompState, setPuzzComp] = useState({ complete: 0 });
    const [triggerCheck, setTrigger] = useState({ trigger: false, state: false });
    const [puzzleCorrect, setPuzzleCorrect] = useState(false);
    const [puzzleID, setPuzzleID] = useState('');
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
    const PadHandler = (event, stat, Sector, index) => {
        if (inputPadState.showPad || stat == "static") {
            setInputPadState({
                showPad: false
            });
        }
        else {
            setInputPadState({
                showPad: true,
                Xcoords: event.clientX,
                Ycoords: event.clientY,
                cellindex: index,
                Sector: Sector
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
    let inputmenu = null;
    if (inputPadState.showPad) {
        inputmenu = (
            <InputPad InputHandler={InputHandler} Ycoords={inputPadState.Ycoords} Xcoords={inputPadState.Xcoords} />
        );
    }
    const togglePad = () => {
        if (inputPadState.showPad) {
            setInputPadState({ showPad: false })
        }
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
    const PuzzleLoader = () => {
        let tempcounter = 0
        let RawPuzzle = null;
        let i = Math.floor((Math.random() * 500) + 1)
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
    useEffect(() => {
        if (props.gameState) {
            PuzzleLoader()
        }

    }, [props.gameState])
    useEffect(() => {
        if (puzzleCorrect) {
            const obj = getFromStorage('sudoku_react')
            if (obj !== null) {
                Verify(obj.token)
                    .then(res => {
                        if (res.data.success) {
                            submitScore({ userId: res.data.userId, score: parseInt(1000 / props.score) })
                        }
                    }).then(() => {
                        history.push('/Complete')
                    })
            } else {
                history.push('/Complete')
            }
        } 
        //         fire.auth().onAuthStateChanged(user => {
        //             if(user != null){
        //                 return fire.firestore().collection('users-history').doc(user.email)

        //             .get()
        //             .then((doc)=>{
        //                 fire.firestore().collection('users-history').doc(user.email)
        //                 .update({
        //                     [puzzleID]:parseInt(1000 / props.score),
        //                     highScore:doc.data().highScore+parseInt(1000 / props.score)

        //             })
        //         }).then(()=>{
        //             history.push("/Complete")
        //         })
        //     }
        // else{
        //     history.push("/Complete")
        // }})

    }, [props.score])
    let StartFin = <Solve onClick={props.gameHandler} gameState={props.gameState}></Solve>
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
        <div className={classes.gamePage} onClick={togglePad}>

            <div className={classes.GameStyleContainer} >

                <padContext.Provider value={{ showPad: inputPadState.showPad, PadHandler: PadHandler }}>
                    <div className={classes.GameContainer} content="width=device-width">
                        <GridOverlay />
                        {GameComponents}
                    </div>
                </padContext.Provider>
            </div>
            {inputmenu}
            {StartFin}
        </div>
    )
};
export default Game;
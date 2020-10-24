import React, { useEffect, useState } from 'react';
import classes from '../../CSS/Rankings.module.css';
import { retreiveUsers } from '../utils/requests';
import { getFromStorage} from '../utils/localstorage';

const Rankings = () => {
    let playerdata = [];
    const [rawPlayerData, setRawPlayerData] = useState([])
    const [playerDataState, setPlayerDataState] = useState()
    const [LoadTemp, setLoadTemp] = useState({ opacity: 0, trans: 0.5 })
    const displayScores = () => {
        let temp = rawPlayerData;
        temp.sort((a, b) => (a.score < b.score ? 1 : -1))
        temp.map((list, key) => {
            return(
                playerdata.push(
                <ul key={key} className={classes.player}>
                    <ul className={classes.Rank}>
                        <li>{key + 1}</li>
                    </ul>
                    <ul className={classes.Name}>
                        <li >{list.username}</li>
                    </ul>
                    <ul className={classes.Points}>
                     <li>{list.score}</li>
                    </ul>
                </ul>
            )
            )

        })
        setPlayerDataState(playerdata)
    }
    useEffect(() => {
        retreiveUsers()
        .then(res => {
            setRawPlayerData(res.data)
        })
        setTimeout(() => {
            setLoadTemp({ opacity: 1, trans: 0.5 })
        }, 500)
        setTimeout(() => {
            setLoadTemp({ trans: "none" })
        }, 1000)

    }, [])
    useEffect(() => {
        displayScores()
    }, [rawPlayerData])
    return (
        <div className={classes.rankings} style={{ opacity: `${LoadTemp.opacity}`, transition: `${LoadTemp.trans}s` }}>
            <div className={classes.board}>
                <ul className={classes.boardsep}>
                    <li className={classes.leftsep}></li>
                    <li className={classes.rightsep}></li>
                </ul>
                <ul className={classes.headings}>
                    <ul className={classes.rankHeader}>
                        <li>RANK</li>
                    </ul>
                    <ul className={classes.nameHeader}>
                    <li>NAME</li>
                    </ul>
                    <ul className={classes.pointsHeader}>
                        <li>POINTS</li>
                    </ul>
                </ul>
                {playerDataState}
            </div>
        </div>
    )
}
export default Rankings                     
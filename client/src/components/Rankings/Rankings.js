import React, { useEffect, useState } from 'react';
import classes from '../../CSS/Rankings.module.css';
import fire from '../Login/fire';
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
                    <li  className={classes.Rank}>{key + 1}</li>
                    <li className={classes.Name}>{list.username}</li>
                    <li className={classes.Points}>{list.score}</li>
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
        // fire.firestore().collection('users-history').get()                       Firebase requesting data
        //     .then((docs) => {
        //         docs.forEach(doc => {
        //             let name = doc.id.split('@')
        //             rawPlayerData.push([name[0], doc.data().highScore])
        //         })
                
        //         console.log(rawPlayerData)
        //     });

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
                    <li className={classes.rankHeader}>RANK</li>
                    <li className={classes.nameHeader}>NAME</li>
                    <li className={classes.pointsHeader}>POINTS</li>
                </ul>
                {playerDataState}
            </div>
        </div>
    )
}
export default Rankings                     
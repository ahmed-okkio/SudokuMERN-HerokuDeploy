import React, { useEffect, useState } from 'react';
import classes from '../../CSS/Rankings.module.css';
import { retreiveUsers } from '../utils/requests';
import button from '../../Assets/next-prev.svg'

const Rankings = () => {
    let playerdata = [];
    const [rawPlayerData, setRawPlayerData] = useState([])
    const [playerDataState, setPlayerDataState] = useState()
    const [page, setPage] = useState(0);
    const [LoadTemp, setLoadTemp] = useState({ opacity: 0, trans: 0.5 })
    const displayScores = () => {
        let a = 0 + page
        let b = 15 + page
        let temp = rawPlayerData
        temp.slice(a , b).map((list, key) => {
            return(
                playerdata.push(
                <ul key={key} className={classes.player}>
                    <ul className={classes.Rank}>
                        <li>{key + 1 + page}</li>
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
    const nextPage = () => {
        let temp = page+15
        setPage(temp)
    }
    const prevPage = () => {
        let temp = page
        setPage(temp-15)
    }
    useEffect(() => {
        retreiveUsers()
        .then(res => {
            setRawPlayerData(res.data.sort((a, b) => (a.score < b.score ? 1 : -1)))
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
    }, [rawPlayerData,page])
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
                {rawPlayerData[page+15]?
                <img src={button} onClick={nextPage} className={classes.NextButton}></img>
                : null}
                {page > 0?
                 <img src={button} onClick={prevPage} className={classes.PrevButton}></img>
                : null}
            </div>
        </div>
    )
}
export default Rankings                     
import React, { useState, useEffect } from 'react';
import classes from '../../CSS/Main.module.css'
import Logo from '../../Assets/Navbar/Logo.png'
import Progress from './LoadingElem';
import { NavLink } from 'react-router-dom';
import fire from '../Login/fire';
import { getFromStorage, setInStorage } from '../utils/localstorage';
import { Verify, Logout, retreiveUser } from '../utils/requests';

const Navbar = props => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState(''); 
    const [userId, setUserId] = useState('');                         //Authentication USER DATA holding state
    const [loadState, setloadState] = useState({                    // Holds state responsible for nav loading animation on first load
        loadprog: 0,
        opacity: 0
    });
    const [burgerState, setBurgerState] = useState('');             // Holds state responsible for displaying Burger icon on mobile navbar
    const [navHeightState, setNavHeightState] = useState('');       // Holds state responsible for expanding nav bar height down on burger button press
    const [navOpacityState, setNavOpacityState] = useState();
    const toggleBurger = () => {                                    // Toggle for pressing burger button -> reveals nav buttons
        if (burgerState == '' || burgerState == 'none') {
            setNavHeightState(220)
            setBurgerState('flex')

            setTimeout(() => {
                setNavOpacityState(1)
            }, 200)

        }
        else {
            setNavOpacityState(0)
            setNavHeightState(60)
            setBurgerState('none')

        }
    }
    const onResize= () => {
        let mediaquery = window.matchMedia("(min-width:960px)")
        if (mediaquery.matches) {
            setBurgerState('flex')
            setNavOpacityState(1)
        } else {
            setNavHeightState(60)
            setBurgerState('none')
        }
    }
    window.onresize = onResize;
    const LoadPage = () => {                                         // Trigger for loading animation on Navbar
        let mediaquery = window.matchMedia("(max-width:960px)")
        if (mediaquery.matches) {
            setNavHeightState(60)
            setBurgerState('none')
        } else {
            setNavOpacityState(1)
        }
        setloadState({
            loadprog: 0,
            opacity: 0
        })
        setTimeout(() => {
            setloadState({
                loadprog: 70,
                opacity: 1
            })
        }, 50)
        setTimeout(() => {
            setloadState({
                loadprog: 100,
            })
        }, 300)
        setTimeout(() => {
            setloadState({
                loadprog: 101,
                opacity: 0
            })
        }, 1500)
        setTimeout(() => {
            setloadState({
                loadprog: 0,
            })
        }, 1700)

    }
    const logOutHandlerMongo = () => {
        Logout(user)
        setUser('')
    }
    const updateUserInfo= (token) =>{
        retreiveUser(token)
        .then(res =>{
            setUsername(res.data.username)
            setUserId(token)
        })
    }
    
    const tokenVerify =() => {
        const obj = getFromStorage('sudoku_react');
        if (obj && obj.token) {
            const { token } = obj;
            Verify(token)
            .then(res =>{
                if(res.data.success) {
                    setUser(token)
                    updateUserInfo(res.data.userId)
                } else {
                    setUser('')
                }
            });
        }
    };
    {
    // const logOutHandlerFirebase = () => {
    //     console.log()
    //     fire.auth().signOut();
    //     setUser('');
    //     LoadPage();
    // }
    // const authListener = () => {
    //     fire.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             setUser(user);

    //         }
    //         else {
    //             setUser('');
    //         }
    //     })
    // }
    }
    useEffect(()=>{
        tokenVerify();
        LoadPage();
    },[props.location.state])
    useEffect(() => {
        LoadPage(); 
    }, [])
    return (
        <>
            <nav className={classes.NavbarBody} onResize={onResize} style={{ height: `${navHeightState}px` }}>
                <NavLink className={classes.LogoLink}to="/" onClick={LoadPage}><img className={classes.Logo} src={Logo} alt="Logo"></img></NavLink>
                <ul className={classes.NavButtons} style={{ display: `${burgerState}`, opacity: `${navOpacityState}` }}>
                    <li className={classes.NavButton}>
                        <span onClick={LoadPage}><NavLink to="/Game">PLAY</NavLink></span></li>
                    <li className={classes.NavButton}>
                        <span onClick={LoadPage}><NavLink to={{
                            pathname:"/Rankings",
                            state:{userId}
                            }}>RANKINGS</NavLink></span></li>
                </ul>
                <ul className={classes.NavButtonLogin} style={{ display: `${burgerState}`, opacity: `${navOpacityState}` }}>
                    {user ? (<li className={classes.NavButton}>
                        <NavLink onClick={logOutHandlerMongo} to="/Login">{username.toUpperCase()} LOGOUT </NavLink></li>)
                        : (
                            <li className={classes.NavButton}>
                                <NavLink onClick={LoadPage} to="/Login">LOGIN</NavLink></li>
                        )}
                </ul>
                <ul>
                    <span className={classes.toggleBurger} onClick={toggleBurger}>
                        <span className={classes.bar} />
                        <span className={classes.bar} />
                        <span className={classes.bar} />
                    </span>
                </ul>

            </nav>
            <Progress opacity={loadState.opacity} complete={loadState.loadprog} loadbar={loadState.loadprog} />
        </>
    )
};
export default Navbar;
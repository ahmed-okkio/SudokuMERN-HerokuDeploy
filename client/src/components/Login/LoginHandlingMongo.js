import React, { useState, useEffect } from 'react';
import LoginWindow from './LoginWindow';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getFromStorage, setInStorage } from '../utils/localstorage';
import { Verify, Signup, Login, Logout } from '../utils/requests';
const LoginHandlingMongo = () => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [passwordConfError, setPasswordConfError] = useState('');
    const [receiveError, setReceiveError] = useState('');
    let history = useHistory();
    let userJSON = {
        username: username,
        password: password
    }

    const clearInputs = () => {
        setUsername('');
        setPassword('');
    }
    const clearErrors = () => {
        setReceiveError('');
    }
    const loginHandler = () => {
        clearErrors('');
        Login(userJSON)
        .then(res => {
            if(res.data.success) {
                setInStorage('sudoku_react',{ token: res.data.token });
                setUser(res.data.token);
            } else {
                setReceiveError(res.data.message)
            }
        })

    }

    const signupHandler = () => {
        clearErrors();
        if(password == passwordConf){
            Signup(userJSON)
            .then( res => { 
                if (res.data.success) {
                    // console.log("test")
                    Login(userJSON)
                    .then(res => {
                        
                        if(res.data.success) {
                            setInStorage('sudoku_react',{ token: res.data.token });
                            setUser(res.data.token);
                        }
                    })
                } else {
                    setReceiveError(res.data.message)
                }
            });
            } else {
                setPasswordConfError('Please make sure both passwords match')
            }
        
    }
    const logOutHandler = () => {
        Logout(user)
        .then(res =>{
            if(res.data.success){
                setUser('')
            }
        })
    }
    const authListener = () => {
        
    }
    const tokenVerify =() => {
        const obj = getFromStorage('sudoku_react');
        if (obj && obj.token) {
            const { token } = obj;
            Verify(token)
            .then(res =>{
                if(res.data.success) {
                    setUser(token)
                } else {
                    setUser('')
                }
            });
        }
    }
    useEffect(() => {
        tokenVerify()
    }, [])
    return (
        <>
            {user ?( <Redirect to={{
                pathname:'/',
                state: {username}
            }}/>
                ):(
                <LoginWindow
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    setPasswordConf={setPasswordConf}
                    loginHandler={loginHandler}
                    signupHandler={signupHandler}
                    receiveError={receiveError}
                    passwordConfError={passwordConfError}
                />)
            }
        </>
    )
}
export default LoginHandlingMongo
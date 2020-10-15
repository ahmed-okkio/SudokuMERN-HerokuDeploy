import React, { useState, useEffect } from 'react';
import fire from './fire';
import LoginWindow from './LoginWindow';
import { Redirect } from 'react-router-dom';
import LoginData from '../../Assets/LoginData.json'


const LoginHandling = () => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [passwordConfError, setPasswordConfError] = useState('');
    const [userNameError, setuserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const clearInputs = () => {
        setUsername('');
        setPassword('');
    }
    const clearErrors = () => {
        setuserNameError('');
        setPasswordError('');
    }
    const loginHandler = () => {
        clearErrors('');
        for(let i = 0;i<LoginData.length;i++){
            if(username == LoginData[i]["username"] 
            && password == LoginData[i]["password"]){
                console.log("Logged In")
            }
        }
        
        // fire
        //     .auth()
        //     .signInWithEmailAndPassword(username+"@sudokureact.com", password)
        //     .catch(err => {
        //         switch (err.code) {
        //                 case "auth/invalid":
        //                 case "auth/user-disabled":
        //                 case "auth/user-not-found":
        //                 setuserNameError(err.message);
        //                 break;
        //             case "auth/wrong-password":
        //                 setPasswordError(err.message);
        //                 break;
        //         }
        //     })
    }

    const signupHandler = () => {
        clearErrors();
        if(password == passwordConf){
            fire
                .auth()
                .createUserWithEmailAndPassword(username+"@sudokureact.com", password)
                .then(cred => {
                    return fire.firestore().collection('users-history').doc(username).set({highScore:0})
                },err=>{
                    switch (err.code) {
                        case "auth/email-already-in-use":
                        case "auth/invalid-user":
                            setuserNameError(err.message);
                            break;
                        case "auth/weak-password":
                            setPasswordError(err.message);
                            break;                       
                    }
                })
            }
        else{
            setPasswordConfError('Please make sure both passwords match')
        }
    }
    const logOutHandler = () => {
        fire.auth().signOut();
    }
    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                setUser(user);
            }
            else {
                setUser('');
            }
        })
    }
    useEffect(() => {
        authListener();
    }, [])
    return (
        <>
            {user ?(
                <Redirect to="/"/>
                ):(
                <LoginWindow
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    setPasswordConf={setPasswordConf}
                    loginHandler={loginHandler}
                    signupHandler={signupHandler}
                    userNameError={userNameError}
                    passwordError={passwordError}
                    passwordConfError={passwordConfError}
                />)
            }
        </>
    )
}
export default LoginHandling
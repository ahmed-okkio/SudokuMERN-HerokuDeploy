import React, { useState, useEffect } from 'react';
import classes from '../../CSS/Login.module.css';

const LoginWindow = (props) => {
    const [LoadTemp, setLoadTemp] = useState({ opacity: 0 })
    const [signup, setsignup] = useState({ signup: false })
    const {
        username,
        setUsername,
        password,
        setPassword,
        setPasswordConf,
        loginHandler,
        signupHandler,
        receiveError,
        passwordConfError
    } = props;
    const Signup = () => {
        setLoadTemp({ opacity: 0 })
        setTimeout(() => {
            setLoadTemp({ opacity: 1})
            let temp = signup.signup
            setsignup({ signup: !temp })
        }, 300)
    }
    const handleEnterLogin = (event) => {
        if (event.key === 'Enter') {
            loginHandler()
        }
      }
    const handleEnterSignup = (event) => {
    if (event.key === 'Enter') {
        signupHandler()
    }
    }

    let loginpage = null;
    if (!signup.signup) {
        loginpage = (
            <React.Fragment>
                <div className={classes.Inputs}>
                    <label>Username</label>
                    <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <label >Password</label>
                    <input type="password" required value={password} onKeyDown={handleEnterLogin} onChange={(e)=> setPassword(e.target.value)}></input>
                    <p className={classes.errormsg}>{receiveError}</p>
                </div>
                <button className={classes.button} onClick={loginHandler}>LOGIN</button>
                <div className={classes.signupdiv}>
                    <label className={classes.accountcheck}>Don't have an account?</label>
                    <span onClick={Signup} className={classes.signup}>Sign Up</span>
                </div>
            </React.Fragment>)
    }
    else {
        loginpage = (
            <React.Fragment>
                <div className={classes.signUpInputs}>
                    <p className={classes.errormsg}>{receiveError}</p>
                    <label>Username</label>
                    <input type="text" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <label >Password</label>
                    <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    <label className={classes.ConfirmPass} >Confirm Password</label>
                    <input type="password" required onKeyDown={handleEnterSignup}onChange={(e)=> setPasswordConf(e.target.value)} ></input>
                    <p className={classes.errormsg}>{passwordConfError}</p>
                </div>
                <button className={classes.button} onClick={signupHandler}>SIGNUP</button>
                <div className={classes.signupdiv}>
                    <label className={classes.accountcheck}>Already have an account?</label>
                    <span onClick={Signup} className={classes.signup}>Login</span>
                </div>
            </React.Fragment>

        )
    }


    useEffect(() => {
        setTimeout(() => {
            setLoadTemp({ opacity: 1 })
        }, 500)
        
    }, [])
    return (
        <div className={classes.login} style={{ opacity: `${LoadTemp.opacity}` }}>
            <div className={classes.loginContainer}>

                <label>Sudoku React</label>
                {loginpage}

            </div>
        </div>
    )
}
export default LoginWindow;
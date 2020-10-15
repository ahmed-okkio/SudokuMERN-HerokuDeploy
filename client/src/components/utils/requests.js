import axios from 'axios';
export function Login(userData) {
    return new Promise((resolve, reject)=>{
        axios.post('https://sudoku-mern.herokuapp.com/users/login', userData)
        .then(res => {
            resolve(res)
        })
    })
}
export function Signup(userData) {
    return new Promise((resolve, reject)=>{
        axios.post('https://sudoku-mern.herokuapp.com/users/signup', userData)
        .then(res => {
            resolve(res)
        })
    })
}
export function Verify(token) {
    
    return new Promise((resolve, reject)=>{
        axios.get('https://sudoku-mern.herokuapp.com/users/verify?token='+ token)
        .then(res => {
            resolve(res)
        })
       
    });
};
export function Logout(token) {
    return new Promise((resolve, reject)=>{
        axios.get('https://sudoku-mern.herokuapp.com/users/logout?token='+ token)
        .then(res => {
            resolve(res)
        })
    });
};

export function retreiveUser(sessionId) {
    const key = {userId: sessionId}
    return new Promise ((resolve, reject) => {
        axios.post('https://sudoku-mern.herokuapp.com/users/user', key)
        .then(res => {
            resolve(res)
        })
    })
}

export function retreiveUsers() {
    return new Promise ((resolve, reject) => {
        axios.get('http://localhost:5000/users')
        .then(res => {
            resolve(res)
        })
    })
}

export function submitScore(submission) {
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:5000/users/submit', submission )
        .then( res => {
            resolve(res)
        })
    })
}
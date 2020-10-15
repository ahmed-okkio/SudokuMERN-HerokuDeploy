import axios from 'axios';
export function Login(userData) {
    return new Promise((resolve, reject)=>{
        axios.post('http://localhost:5000/users/login', userData)
        .then(res => {
            resolve(res)
        })
    })
}
export function Signup(userData) {
    return new Promise((resolve, reject)=>{
        axios.post('http://localhost:5000/users/signup', userData)
        .then(res => {
            resolve(res)
        })
    })
}
export function Verify(token) {
    
    return new Promise((resolve, reject)=>{
        axios.get('http://localhost:5000/users/verify?token='+ token)
        .then(res => {
            resolve(res)
        })
       
    });
};
export function Logout(token) {
    return new Promise((resolve, reject)=>{
        axios.get('http://localhost:5000/users/logout?token='+ token)
        .then(res => {
            resolve(res)
        })
    });
};

export function retreiveUser(sessionId) {
    const key = {userId: sessionId}
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:5000/users/user', key)
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
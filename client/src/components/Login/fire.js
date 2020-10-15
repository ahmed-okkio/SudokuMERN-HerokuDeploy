import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCdbGhKr8i7jAQC4vWv9aNLrOB878-WE8c",
    authDomain: "sudokureact-c893a.firebaseapp.com",
    databaseURL: "https://sudokureact-c893a.firebaseio.com",
    projectId: "sudokureact-c893a",
    storageBucket: "sudokureact-c893a.appspot.com",
    messagingSenderId: "997955722885",
    appId: "1:997955722885:web:ca38c7f32bba330e9893ec",
    measurementId: "G-XTB10K1V0W"
  };
const fire = firebase.initializeApp(firebaseConfig);



export default fire;
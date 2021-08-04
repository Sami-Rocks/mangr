import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyASuV0gNjqpc9YdZeQbTt9bYxb3ptgyk9M",
    authDomain: "project-mangr.firebaseapp.com",
    projectId: "project-mangr",
    storageBucket: "project-mangr.appspot.com",
    messagingSenderId: "103045514875",
    appId: "1:103045514875:web:cfbed71c6932ad8a9584de",
    measurementId: "G-WTBP5JY5JM"
})

export default app
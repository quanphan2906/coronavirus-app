import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyDm8_rphU3hImZmtNDQO2F3PEfQhbLw6pQ",
    authDomain: "coronavibes-a9edb.firebaseapp.com",
    databaseURL: "https://coronavibes-a9edb.firebaseio.com",
    projectId: "coronavibes-a9edb",
    storageBucket: "coronavibes-a9edb.appspot.com",
    messagingSenderId: "901494267737",
    appId: "1:901494267737:web:b8fb37e52e5a4f48f3f648",
    measurementId: "G-NESPNJWXFP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

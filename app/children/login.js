import React from 'react'
import Link from 'react-router'
import Firebase from 'firebase'
import Firebaseui from 'firebaseui'
import reactfire from 'reactfire'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAy9vdQyLUOMUtmAcvm9thqt53Qhlv642w",
  authDomain: "netlab-ac53e.firebaseapp.com",
  databaseURL: "https://netlab-ac53e.firebaseio.com",
  projectId: "netlab-ac53e",
  storageBucket: "",
  messagingSenderId: "233442909938"
};

Firebase.initializeApp(config);

// Login component using Firebase for credentials and authorization (authentication)
export default React.createClass({

componentDidMount: function () {

// Initialize the FirebaseUI widget using Firebase.
    var ui = new Firebaseui.auth.AuthUI(Firebase.auth());
    var uiConfig = {
      'signInSuccessUrl': '/#/home',
      'signInOptions': [
        Firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      'signInFlow': 'popup'
    };
    ui.start('#firebaseui-auth-container', uiConfig)
   
},

  render() {
    return <div id="firebaseui-auth-container"></div>
  }
})
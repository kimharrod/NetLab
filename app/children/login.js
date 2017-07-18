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

// Initialize the FirebaseUI widget using Firebase
    var ui = new Firebaseui.auth.AuthUI(Firebase.auth());
    var uiConfig = {
      'signInSuccessUrl': '/#/home',
      'signInOptions': [
        Firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      'signInFlow': 'popup',
      callbacks: {
        // function that runs upon successful authentication
        signInSuccess: function(currentUser, credential, redirectUrl) {
          console.log(JSON.stringify(currentUser));
          console.log("Signed in as "+ currentUser.uid + " with redirectUrl " + redirectUrl);
          // conveniently store userId and name for access by other components
          localStorage.setItem("userId", currentUser.uid);
          localStorage.setItem("displayName", currentUser.displayName);
          // redirect to the app home component once sign-in is successful
          window.location = '/#/home';
        }.bind(this)
      }
    };
    ui.start('#firebaseui-auth-container', uiConfig)
   
},

  render() {
    return <div id="firebaseui-auth-container"></div>
  }
})
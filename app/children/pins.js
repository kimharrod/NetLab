import React from 'react'
import Firebase from 'firebase'
import { Link } from 'react-router'

export default React.createClass({

// initialize state variables
getInitialState: function() {
  	return {
	    currentUser: "",
	    noteSubject: "",
	    noteBody: "",
	    pins: "",
	    noteset: "",
	    viewUrl: ""
	    };
    },

componentDidMount() {
    // set up Firebase connection & get reference to Histology branch
	// allows data to be fetched from the user's branch    
    this.firebaseRef = Firebase.database().ref("histology");
    var userId = localStorage.getItem("userId");
    this.firebaseRef.child('/users/' + userId + '/pins').once('value', function(dataSnapshot) {
    var items = [];
      
      	// get a snapshot of all pins
	    dataSnapshot.forEach(function(childSnapshot) {
	        var item = childSnapshot.val();
	        item['key'] = childSnapshot.key;
	        items.push(item);
	    }.bind(this));
	    var view = localStorage.getItem("lastview");

	    // sets pins state variable equal to all the user's pins (items)
		// set viewURL equal to the current view
	    this.setState({
	        pins: items,
	        viewUrl: view
	    });

	    // get the pins array from the pins state variable
     	var pins = this.state.pins;
	    // iterate through the user's pins to set up the pin list items for display
	    var pinSet = Object.keys(pins).map(function(s){ 
		    var url = pins[s].url;
		    var num = url.slice(44, 49);
		    var loc = url.slice(55);
		    var pinpath = '/pin/' + num + '/' + loc+ '/' + pins[s].structure + '/' + pins[s].system;
	            return ( 
	              <li id="pinitem" key={pins[s].key} className="lead"><Link to={pinpath}>
	                System: {pins[s].system}<br/>
	                Structure: {pins[s].structure}</Link><br/>
	                </li>
	            ) 
        }); 
 
          this.setState({ pinset: pinSet });


    }.bind(this));
  
},
    

   render() {

    return ( 

        <div className="panel panel-primary">
	          
	          <div className="panel-heading" id="slideNote-head">
	            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location Pins</h4>
	          </div>
	          
	          <div className="panel-body">

	            <ul>

	              {this.state.pinset}

	            </ul>

	          </div>
	    </div>

    )
  }
})
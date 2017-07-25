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
	    notes: "",
	    noteset: "",
	    viewUrl: ""
    };
},

componentDidMount() {
    // set up Firebase connection & get reference to Histology branch
	// allows all slide note data to be fetched  
    this.firebaseRef = Firebase.database().ref("histology");
    this.firebaseRef.child('/notes').once('value', function(dataSnapshot) {
    var items = [];
      
		// get a snapshot of all notes      
        dataSnapshot.forEach(function(childSnapshot) {
	        var item = childSnapshot.val();
	        item['key'] = childSnapshot.key;
	        items.push(item);
        }.bind(this));
        var view = localStorage.getItem("lastview");

        // set up array to receive user's notes
	    var mynotes = [];
	    // get user's Id from local storage
	    var me = localStorage.getItem("userId");
     
	    // go through all notes and push user's notes only into mynotes array
        for (var i = 0; i < items.length; i++) {
   
	        if (items[i].authorId === me) {

	           mynotes.push(items[i]);

	        } // end if author is me

	     } // end for all notes

    	// sets notes state variable equal to mynotes
		// set viewURL equal to the current view
	    this.setState({
	        notes: mynotes,
	        viewUrl: view
	    });

	    // get the mynotes array from the notes state variable
	    var notes = this.state.notes;
	    // iterate through the user's notes to set up the note list items for display
	    var noteSet = Object.keys(notes).map(function(s){ 
	        var url = notes[s].url;
	        var num = url.slice(44, 49);
	        var loc = url.slice(55);
	        var notepath = '/singlenote/' + notes[s].key + '/' + loc;
	            return (
	              <Link to={notepath}><li id="noteitem" key={notes[s].key} className="lead">
	                Author: {notes[s].author}<br/>
	                Structure: {notes[s].structure}<br/>
	                Subject: {notes[s].subject}<br/>
	                Note: {notes[s].body}<br/>
	                </li></Link>
	            ) 
	        }); 
	 
	        this.setState({ noteset: noteSet });


	    }.bind(this));
	  
	  },
    
componentWillUnmount() {

    this.firebaseRef.off();

},

   render() {

        var url = this.state.viewUrl;
       
        if (this.props.params.noteUrl) {
            url = this.state.noteUrl;

        } // end if

	    return ( 
	   
		    <div className="appArea">
		        <div className="panel panel-primary">
		          	
		          	<div className="panel-heading" id="slideNote-head">
		            	<h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Notes &nbsp;&nbsp; <Link to="/savednotes"><span id="inactive">Saved Notes</span></Link></h4>
		            </div>
		          
		          	<div className="panel-body">

			            <ul>

			              {this.state.noteset}

			            </ul>

		          	</div>
		        
		        </div>
		          
		    </div>
	    )
    }
})
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

  	// function to adjust viewer window to match the note selected
  	viewNoteImg: function(event){
        event.preventDefault();

        var viewTarget = event.target.getAttribute('data-url');
        localStorage.setItem("structure", event.target.getAttribute('data-struc'));
        localStorage.setItem("system", event.target.getAttribute('data-sys'));


       $("#scopeView").attr('src', viewTarget);

  	},

  	// saves noteId to the user's saved branch in Firebase
   	saveNoteId: function(e){
        e.preventDefault();

        var saved = {};
        var noteId = e.target.getAttribute('data-key');   
        var userID = localStorage.getItem("userId");
        var dname = localStorage.getItem("displayName");
      
        this.firebaseRef.child('/users/' + userID + '/saved/' + noteId).update({username: dname});
        e.target.setAttribute('disabled', 'disabled');  

  	},

componentDidMount() {
    // set up Firebase connection & get reference to Histology branch
	// allows data to be fetched
    this.firebaseRef = Firebase.database().ref("histology");
    this.firebaseRef.child('/notes').once('value', function(dataSnapshot) {
      	var items = [];
      
      	// get snapshot of all notes
      	dataSnapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
	        item['key'] = childSnapshot.key;
	        items.push(item);
      	}.bind(this));

      	var view = localStorage.getItem("lastview");
      
      	// sets notes state variable equal to all notes (items)
		// set viewURL equal to the current view
	    this.setState({
	        notes: items,
	        viewUrl: view
        });

	    // assign a local variable to point to the functions for viewing/saving
	    let viewFunction = this.viewNoteImg;
	    let saveFunction = this.saveNoteId;
	      
	    // extract slide number from viewURL
	    var slide = this.state.viewUrl.slice(44,49);
	   
	    // get the notes array from the notes state variable
	    var notes = this.state.notes;

	    // iterate through the notes to set up the note list items for display
	    var noteSet = Object.keys(notes).map(function(s){ 
	        var viewpath = '/shownotes/' + notes[s].url;
	        var loc = notes[s].url.slice(55);
	        var notepath = '/singlenote/' + notes[s].key + '/' + loc;
	          if (notes[s].slide === slide) {
	            return (
	              	<Link to={notepath}>
	              		<li id="noteitem" key={notes[s].key} className="lead">
		                Author: {notes[s].author} 
		                <button id={notes[s].key} onClick={saveFunction} data-key={notes[s].key} type="button" className="btn btn-muted btn-primary pull-right"><i className="icon-download-alt"/></button>
		                <br/>
		                Subject: {notes[s].subject}<br/>
	                	Note: {notes[s].body}<br/>
		            	</li>
		            </Link>

	            ) 
	           } // end if 
	        }); 
	 
	        this.setState({ noteset: noteSet });

    }.bind(this));
	  
},

// updates coordinates if user changes their location in the slide view    
componentWillUnmount() {
    this.firebaseRef.off();
    
    var coords = $('#scopeView').get(0).contentWindow.viewCoords;
	
	if (coords) {
		localStorage.setItem("lastview", coords);
	}
},

   render() {

        var url = this.state.viewUrl;
       
        if (this.props.params.noteUrl) {
            url = this.state.noteUrl;

        } // end if

    return ( 
   
	    <div className="appArea"><iframe id="scopeView" src={url} height="400" width="100%"></iframe><br/><br/>
	 
	        <div className="panel panel-primary">
	        	<div className="panel-heading" id="slideNote-head">
	            	<h4>&nbsp;&nbsp;&nbsp;All Notes &nbsp;&nbsp; <Link to="/mynotescurrentslide"><span id="inactive">My Notes</span></Link></h4>
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
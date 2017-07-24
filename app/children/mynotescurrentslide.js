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

  		$("#scopeView").attr('src', viewTarget);

  	},

  	// saves noteId to the user's saved branch in Firebase
  	saveNoteId: function(e){
  	
  		e.preventDefault();

  		var saved = {};
  		var noteId = e.target.getAttribute('data-key');
  		var userID = localStorage.getItem('userId';
  		var dname = localStorage.getItem('displayName');

  		this.firebaseRef.child('/users/' + userID + '/saved/' + noteId).update({displayname: dname});

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
				item.push(item);
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

			// assign a local variable to point to the functions for viewing/saving
			let viewFunction = this.viewNoteImg;
	        let saveFunction = this.saveNoteId;
	        
	        // extract slide number from viewURL
	        var slide = this.state.viewUrl.slice(44,49);
        	// get the notes array from the notes state variable
	        var notes = this.state.notes;
	        // iterate through the user's notes to set up the note list items for display
	        var noteSet = Object.keys(notes).map(function(s){ 
		        var url = notes[s].url;
		        var num = url.slice(44, 49);
		        var loc = url.slice(55);  
		        var viewpath = '/shownotes/' + notes[s].url;
		        var notepath = '/singlenote/' + notes[s].key + '/' +loc; 

	        		if (notes[s].slide === slide) {
			            return (
				            <Link to={notepath}><li id="noteitem" key={notes[s].key} className="lead">Author: {notes[s].author} 
				            <button onClick={viewFunction} data-url={notes[s].url} type="button" className="btn btn-muted btn-primary pull-right">View Location</button>
				            <br/>
			                Subject: {notes[s].subject}<br/>
			                Note: {notes[s].body}<br/>
			                </li></Link>
            			) 
           			} // end if 
    		}); // end object

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
	   
	      <div><iframe id="scopeView" src={url} height="400" width="100%"></iframe><br/><br/>
	        <div className="content">
	        	<div className="container">
			        <ul className="nav nav-tabs">
			            <li><Link to="/allnotescurrentslide">All Notes</Link></li>
			            <li className="active">My Notes</li>
			        </ul>
	        
		        </div>  
		          
		          <ul>

		          {this.state.noteset}

		          </ul>
	      
        	</div>
	      </div>

	    ) // end of return

  	} // end of render

})
import React from 'react'
import Firebase from 'firebase'
import reactfire from 'reactfire'
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
	    viewUrl: "",
	    note: ""
	    };
  },


componentWillMount() {
    // set up Firebase connection & get reference to Histology branch
	// allows data to be fetched
    this.firebaseRef = Firebase.database().ref("histology");
    // assign the note's node key to oneNote
    var oneNote = this.props.params.key;
    // create an object to receive the note content
    var currentnote = {};
    // do a snapshot of that single user note
    this.firebaseRef.child('/notes/' + oneNote).once('value', function(dataSnapshot) {
        currentnote = dataSnapshot.val();
        // set the note state variable to the content of the single note
        this.setState({note: currentnote});
    }.bind(this));
  
},  

// updates coordinates if user changes their location in the slide view
componentWillUnmount() {

    var coords = $('#scopeView').get(0).contentWindow.viewCoords;

 	  if (coords) {
		  localStorage.setItem("lastview", coords);
	   }
  },

// function to delete the current note
deleteNote() {
	// if this note belongs to the user they can delete it
	if (this.state.note.authorId === localStorage.getItem("userId")) {
	    // use the note key to remove that node from notes branch in Firebase
	    this.firebaseRef.child('/notes/' + this.props.params.key).remove();

	    window.location = '/#/mynotesall';
	}
},

   render() {

        // get data from the note record in firebase via the note state variable
        var key = this.state.note.key;
        var url = this.state.note.url;
        var loc = this.props.params.loc;
        var author = this.state.note.author;
        var system = this.state.note.system;
        var structure = this.state.note.structure;   
        var subject = this.state.note.subject;
        var body = this.state.note.body;                  

    // render the note information populated with the data from above
    return ( 
   
      <div><iframe id="scopeView" src={url} height="400" width="100%"></iframe><br/><br/>
  
          <ul>
	            <li>Author: {author}</li>
	            <li>System: {system}</li>
	            <li>Structure: {structure}</li>
	            <li>Location: {loc}<button onClick={this.deleteNote} data-key={key} type="button" className="btn btn-muted btn-primary pull-right">Delete Note</button></li>
	            <br/>
	            <li id="noteSubj">Subject: {subject}</li>
	            <li id="noteBody">Note: {body}</li>
          </ul>

      
      </div>
    )
  }
})
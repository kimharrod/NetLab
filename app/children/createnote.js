import React from 'react'
import Firebase from 'firebase'
import reactfire from 'reactfire'

export default React.createClass({

	// initialize state variable 
	getInitialState: function() {
		return {
			currentUser: "",
			noteSubject: "",
			noteBody: ""		
		};
	},

	// set up Firebase connection & get reference to Histology branch
	// allows data to be pushed
	componentWillMount() {
		this.firebaseRef = Firebase.database().ref("histology");
	};

	// updates coordinates if user changes the slide view location
	componentWillUnmount() {
		
		// access the view coordinates variable within the IIPMOO viewer in the iframe
		var coords = $('#scopeView').get(0).contentWindow.viewCoords;

		if (coords) {
			localStorage.setItem("lastview", coords);
		}
	},

	// Respond to the user form input
	handleChange: function(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);

	},

	// When a user submits form data
	handleSubmit: function(event) {

		// prevent the form from trying to submit itself
		event.preventDefault();

		// access the view coordinates variable within the IIPMOO viewer in the iframe
		var coords = $('#scopeView').get(0).contentWindow.viewCoords;

		// create empty note object
		var noteObj = {};

		// populate the note object with data
		noteObj.url = coords;
    	noteObj.slide = coords.slice(44,49);
    	noteObj.system = localStorage.getItem("system");
    	noteObj.structure = localStorage.getItem("structure");
    	noteObj.author = localStorage.getItem("displayName");
    	noteObj.authorId = localStorage.getItem("userId");
    	noteObj.subject = this.state.noteSubject;
    	noteObj.body = this.state.noteBody;

    	// clear the input fields after submitting
    	this.setState({noteSubject: ""});
    	this.setState({noteBody: ""});

    	// push the note object into the Firebase database under the notes branch
    	var res = this.firebaseRef.child('/notes').push(noteObj);
    	// get the node key (the unique ID for that note) out of the returned JSON object 
    	var noteId = (JSON.stringify(res)).slice(54,73);

    	// create entry in this user's branch for this node key
    	this.firebaseRef.chlld('/users/' + noteObj.authorId + '/notes').push(noteId);

    	// switch the window back to the scope component after note is submitted
    	window.location = '/#/viewer/direct/struc/sys';

	}, // end handleSubmit

	render() {

		// get the last viewed location...
		var url = localStorage.getItem("lastview");
		// and display it:
		return <div>
		<iframe id="scopeView" src={url} height="350" width="100%"></iframe>


		  	<div className="panel panel-default">
		        <div className="panel-heading">
	          	<h3 className="panel-title text-center"></h3>
		        </div>
		        <div className="panel-body text-center">

		          <form onSubmit={this.handleSubmit} id="noteForm">
		            
		            <div className="form-group">

		              <input
		                type="text"
		                value={this.state.noteSubject}
		                className="form-control"
		                id="noteSubject"
		                placeholder="Subject"
		                onChange={this.handleChange}
		                required
		              />
		              <br/>
		              <textarea
		                form="noteForm"
		                rows="4"
		                cols="50"
		                value={this.state.noteBody}
		                className="form-control"
		                id="noteBody"
		                placeholder="Note text"
		                onChange={this.handleChange}
		                required
		              />
		              <br/>
		              <button className="btn btn-primary" type="submit">Save Note</button>
		            
		            </div>

		          </form>
		        
		        </div>
		      
		    </div>

		</div>

  		} // end of the return

	}) // end of render
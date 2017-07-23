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
			viewUrl: ""
		};

	},

	// lifecycle function that runs when component is loaded
	// make connection to database in notes branch
	componentDidMount() {
		this.firebaseRef = Firebase.database().ref("histology");
			this.firebaseRef.child('/notes').once('value', function(dataSnapshot) {
				var items = [];

				// put all the notes into an array called items
				dataSnapshot.forEach(function(childSnapshot) {
					var item = childSnapshot.val();
					item['key'] = childSnapshot.key;
					items.push(item);
				}.bind(this));
				var view = localStorage.getItem("lastview");

				// push the user's notes into mynotes array
				var mynotes = [];
				var me = localStorage.getItem("userId");

				for (var i = 0; i < items.length; i++) {

					if (items[i].authorId === me) {

						mynotes.push(items[i]);

					} // end if author is me

				} // end for all notes

				// set the state variable notes equal to mynotes (user's notes)
				this.setState({
					notes: mynotes,
					viewUrl: view
				});

				// pull state variable into a local notes object
				var notes = this.state.notes;

				// for all notes within the object
				var noteSet = Object.keys(notes).map(function(s){

					var url = notes[s].url;
					var num = url.slice(44, 49);
					var loc = url.slice(55);

					// set up the path for the link to view a single note
					var notepath = '/singlenote/' + notes[s].key + '/' + loc;
				
						// assemble note display and assign link to the list element
						return (
							<li key={notes[s].key} ><Link to={notepath}>
								Author: {notes[s].author}<br/>
								Structure: {notes[s].structure}<br/>
								Subject: {notes[s].subject}<br/>
								Note: {notes[s].body}</Link><br/>
							</li>

						)
				});

				// copy the finished notes list elements into the noteset state variable
				this.setState({ noteset: noteSet });

				// bind the firebase data snapshot function to the component
				}.bind(this));

			},

			componentWillUnmount() {

				this.firebaseRef.off();
			
			},


		render() {

			return (

				<div>
					<ul>

						{this.state.noteset}

					</ul>
				</div>

			)

		}

})
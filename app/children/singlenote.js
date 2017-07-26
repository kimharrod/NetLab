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
	    viewUrl: "",
	    note: ""
	    };
  },


editNote: function(e){

  if (this.state.note.authorId === localStorage.getItem("userId")) {

    e.preventDefault();
    console.log("in editNote"); 
    var noteText = $("#noteBod").text();
    console.log("the text of the note is: " + noteText);
    $("#noteBod").html('<textarea rows="2" cols="50" type="text" size="43" id="ntext">'); 
    $("#ntext").val(noteText);
        $('#ntext').on('keydown',function(ev){
          if(ev.which == '13'){
           var noteId = localStorage.getItem("key");
           console.log("noteId: " + noteId)
          this.firebaseRef = Firebase.database().ref("histology");
           this.firebaseRef.child('/notes/' + noteId).update({body: $("#ntext").val()});
          $("#noteBod").text($("#ntext").val());
          } 
        });
    }
},


editSubject: function(event){

  if (this.state.note.authorId === localStorage.getItem("userId")) {

    event.preventDefault();
    console.log("in editNote"); 
    var noteSubj = $("#noteSubj").text();
    console.log("the text of the note is: " + noteSubj);
    $("#noteSubj").html('<input type="text" size="43" id="nsubj" value="' + noteSubj + '">'); 
        $('#nsubj').on('keydown',function(evnt){
          if(evnt.which == '13'){
           var noteId = localStorage.getItem("key");
           console.log("noteId: " + noteId)
          this.firebaseRef = Firebase.database().ref("histology");
           this.firebaseRef.child('/notes/' + noteId).update({subject: $("#nsubj").val()});
          $("#noteSubj").text($("#nsubj").val());
          } 
        });
   }     

},

componentWillMount() {
    // set up Firebase connection & get reference to Histology branch
	  // allows data to be fetched
    this.firebaseRef = Firebase.database().ref("histology");
    // assign the note's node key to oneNote
    var oneNote = this.props.params.key;
    // put the node ID in local storage
    localStorage.setItem("key", oneNote);
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
// or goes to a different slide from a note link
componentWillUnmount() {

    var coords = $('#scopeView').get(0).contentWindow.viewCoords;

 	  if (coords) {
		  localStorage.setItem("lastview", coords);
      localStorage.setItem("structure", this.state.note.structure);
      localStorage.setItem("system", this. state.note.system);
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
   
      <div className="appArea"><iframe id="scopeView" src={url} height="400" width="100%"></iframe><br/><br/>
        <div className="panel panel-primary">
          <div className="panel-heading" id="slideNote-head">
            <h4><span id="inactive">Note by:&nbsp;</span> {author}</h4>
          </div>
          <div className="panel-body">
            
              <p className="lead">
                System: {system}<br/>
                Structure: {structure}<button id="deleteNote" onClick={this.deleteNote} data-key={key} type="button" className="btn btn-muted btn-primary pull-right" data-toggle="tooltip" title="Delete Note">&#215;</button><br/>
                <span onClick={this.editSubject}>Subject:</span> <span id="noteSubj">{subject}</span><br/>
                <span onClick={this.editNote}>Note:</span> <span id="noteBod">{body}</span>
              </p>

          </div>
        </div>
      </div>
    )
  }
})
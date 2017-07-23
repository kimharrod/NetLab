import React from 'react'
import { Link } from 'react-router'
import Firebase from 'firebase'

export default React.createClass({

// set up Firebase connection & get reference to Histology branch
// allows data to be pushed
componentWillMount() {
  this.firebaseRef = Firebase.database().ref("histology");
},

// function to save the coordinates of last slide view when exiting viewer component
componentWillUnmount: function () {

	// cross-frame access to variable in the third-party (IIPMOO) viewer
	var coords = $('#scopeView').get(0).contentWindow.viewCoords;

  if (coords) {
	// save the last slide view to local storage
	localStorage.setItem("lastview", coords);
  }
},

// function to create a pin record in Firebase for the current view
pinThis: function () {

  // empty object to store the record
  var pinObj = {};
  // get current coordinates
  var coords = $('#scopeView').get(0).contentWindow.viewCoords;
  // populate the pin object
  pinObj.url = coords;
    // slice out slide number from full url
    pinObj.slide = coords.slice(44,49);
    // slice location string just after the # sign
    pinObj.location = coords.slice(55);
    // pull system, structure and userId from local storage
    pinObj.system = localStorage.getItem("system");
    pinObj.structure = localStorage.getItem("structure");
    var userID = localStorage.getItem("userId");
    // push record to the user's pins branch in Firebase
    this.firebaseRef.child('/users/' + userID + '/pins').push(pinObj);

},
	
  	// assemble and render the iframe for the viewer component
  	render() {

  		// pass slide number, structure & system from menu to viewer component
  		var num = this.props.params.slideNum;
  		var struc = this.props.params.slideStruc;
      var sys = this.props.params.slideSys;
      
      
      // detect direct navigation from navbar and load the system & structure from local storage 
      if (struc === "struc") {

        sys = localStorage.getItem("system");
        struc = localStorage.getItem("structure");

      }

      // write the structure & system to local storage to be used in other components
      localStorage.setItem("structure", struc);
      localStorage.setItem("system", sys);
   
  		// point to the image url on the slide server
  		var url = 'http://netlab.fios.vc/iipn/index.html?image=' + num + '.tif';

  		// detect direct navigation from viewer link in the navbar
  		if (num === "direct") {

  			// assign url to reflect last slide view
  			url = localStorage.getItem("lastview");

  		}

      // detect if you are entering viewer from a pin location
      if (this.props.params.loc) {
        // build url for the current view based on the pin
        var urlStart = "http://netlab.fios.vc/iipn/index.html?image=";
        var number = this.props.params.num;
        var loc = this.props.params.loc;
        url = urlStart + number + '.tif#'+ loc;

      }

  		// or display the slide selected from menu
  		// include buttons for adding and showing notes
	   	return <div>
      <Link to='/createnote'><button id="addNote" className="btn btn-default btn-small"><span className="glyphicon glyphicon-pencil"></span></button></Link>
      <iframe id="scopeView" src={url} height="600" width="100%"></iframe>
      <Link to='/allnotescurrentslide'><button id="showNotes" className="btn btn-default btn-small"><span className="glyphicon glyphicon-list-alt"></span></button></Link>
      <button id="pinLoc" onClick={this.pinThis} className="btn btn-default btn-small"><span className="glyphicon glyphicon-map-marker"></span></button>
      </div>
  }
})
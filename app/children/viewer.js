import React from 'react'

export default React.createClass({

// function to save the coordinates of last slide view when exiting viewer component
componentWillUnmount: function () {

	console.log("unmount slideNum: " + this.props.params.slideNum);
	// cross-frame access to variable in the third-party (IIPMOO) viewer
	var coords = $('#scopeView').get(0).contentWindow.viewCoords;
	console.log("coords: " + coords);
	// save the last slide view to local storage
	localStorage.setItem("lastview", coords);

},

	
  	// assemble and render the iframe for the viewer component
  	render() {

  		// make slide number available to viewer component
  		var num = this.props.params.slideNum;
  		console.log("render slideNum: " + num);

  		// point to the image url on the slide server
  		var url = 'http://netlab.fios.vc/iipn/index.html?image=' + num + '.tif';

  		// detect direct navigation from viewer link in the navbar
  		if (num === "direct") {

  			// assign url to reflect last slide view
  			url = localStorage.getItem("lastview");

  		}

  		// or display the slide selected from menu
  		// include buttons for adding and showing notes
	   	return <div><Link to='/newnote'><button id="addNote"></button></Link>
	   	<iframe id="scopeView" src={url} height="600" width="100%"></iframe>
	   	<Link to='/shownotes'><button id="showNotes">N</button></Link>
		</div>
  }
})
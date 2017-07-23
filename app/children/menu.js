import React from "react"
import { Link } from 'react-router'
var helpers = require("../utils/helpers");

export default React.createClass({

getInitialState: function() {
	return {
		slides: []
	};
},

// Slide menu
componentDidMount: function () {

	// call getSlides function to retrieve all slides from MongoDB
	// this completes before menu is displayed
	helpers.getSlides().then(function(data) {

		// assemble the menu for display and apply hyperlinks to each menu item
		// start by creating an array to receive the names of all the systems
		var systems = [];
		// iterate through all the slides and push the system names into the systems array
		var sysSet = Object.keys(data).map(function(s){ 

			// if the system name isn't already in the array
			if (systems.indexOf(data[s].system) < 0) {

				systems.push(data[s].system);
			}
	  		
		}); 

		// create an array of objects containing the hierarchy of systems & slides
		var slides = [];
		var catSet = [];

		for (var i=0; i < systems.length; i++) {
			var cat = {};
			
			catSet = [];
    		var slideArr = Object.keys(data).map(function(s){ 
  
    			if (systems[i] === data[s].system) {
  					var slideObj = {};
    				slideObj.number = data[s].number;
    				slideObj.system = data[s].system;
    				slideObj.structure = data[s].structure;
    				catSet.push(slideObj);
				} // end if	slide matches system
      		
    		}); // for each slide

    		cat.system = systems[i];
    		cat.list = catSet;  		
    		slides.push(cat);

    	} // end for each system	

        this.setState({ slides: slides });

      }.bind(this));

},


	render() {

		var slidelist = this.state.slides;
	    return ( <div>
	        {
	            slidelist.map((item, index) => {
	            	
	            	return (
	              		<div key={index}>
	                	<h4 >{item.system}</h4>
	               		{
	                		item.list.map((subitem, i) => {
	                			
	                			var viewpath = '/viewer/' + subitem.number + '/' + subitem.structure + '/' + subitem.system;

	                  			return (
	                     			<ul ><Link to={viewpath}><li>{subitem.structure}</li></Link></ul>
	                  			)
	                		})
	               		}
	              		</div>
	            	)
	          	})
	        }           
	          
	        </div>

	    ) // end return		      

    } // end render

}) // end create class

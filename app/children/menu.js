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

	// assemble the menu for display and applying hyperlinks to each menu item
		var slideSet = Object.keys(data).map(function(s) {
			var viewpath = '/viewer/' + data[s].number + '/' + data[s].structure + '/' + data[s].system;

				return (
					<li key={data[s].number} ><Link to={viewpath}>System: {data[s].system}<br/>
					Structure: {data[s].structure} </Link><br/>
					</li>
				)
			});

			this.setState({ slides: slideSet});

		}.bind(this));
	},

	render() {

		return (
			<div>
				<ul>

					{this.state.slides}

				</ul>
			</div>
		)

	}

})
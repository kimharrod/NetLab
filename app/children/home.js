// Import react dependencies
import React from 'react'
import { Link } from 'react-router'

// Create and render the parent component (called "Home")
export default React.createClass({

	// Set up the navbar menu
	render() {
		return (
	       <div>
	        <center><h3>NetLab Histology &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          <Link to="/menu">Menu </Link>
	        | <Link to="/viewer/direct">Viewer </Link> 
	        | <Link to="/search">Search </Link>
	        | <Link to="/newnote">Note </Link>
	        | <Link to="/bookmarks">Bookmarks </Link>
	        | <Link to="/profile">Profile </Link></h3>
	          </center>
	       
	        <hr/>

	        {/* render the child components */}
	        {this.props.children}

	      </div>
    )
  }
}) 
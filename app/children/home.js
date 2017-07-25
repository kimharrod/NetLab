// Import react dependencies
import React from 'react'
import { Link } from 'react-router'

// Create and render the parent component (called "Home")
export default React.createClass({


	// Set up the navbar menu
	render() {

		return (
		 <div id="mainFrame">


		 	<div className="navbar-wrapper" id="header">
		      <div>

		        <nav className="navbar navbar-inverse navbar-static-top">
			        <div>
			            
			            <div className="navbar-header">
			             
			              <a className="navbar-brand" href="/#/menu"> &nbsp;&nbsp;&nbsp;&nbsp;<strong><span id="navlogo">netlab</span></strong>&nbsp;&nbsp; Histology</a>

		        		</div>


				        <div>
				              <ul className="nav navbar-nav">
				                <li><Link to="/menu">Menu </Link></li>
				                <li><Link to="/mynotesall">Notes </Link></li>
				                <li><Link to="/viewer/direct/struc/sys">Scope </Link></li>
				                <li><Link to="/pins">Pins </Link></li>
				                <li><Link to="/profile">Profile </Link></li>  
				              </ul>
				        </div>
		        
		        	</div>
		        
		        </nav>

		      </div>
		    </div>
	<hr/>
	<br/>
    
    <div className="container">

	        {/* render the child components */}
	        {this.props.children}

	      	</div>

			      <div className="icon-bar navbar-fixed-bottom" id="footer">
		          <a href="/#/menu"><i className="icon-home"></i></a>
		          <a href="/#/mynotesall"><i className="icon-notes"></i></a>
		          <a href="/#/viewer/direct/struc/sys"><i className="icon-microscope"></i></a>
		          <a href="/#/pins"><i className="icon-checkin"></i></a>
		          <a href="/#/profile"><i className="icon-user"></i></a>

	          </div>

   		</div>
    )
  }
}) 
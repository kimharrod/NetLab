// Import react dependencies
import React from 'react'
import { Link } from 'react-router'

// Create and render the parent component (called "Home")
export default React.createClass({


	// Set up the navbar menu
	render() {

		return (
		 <div id="mainFrame">


		 	<div className="navbar-wrapper">
		      <div className="container">

		        <nav className="navbar navbar-inverse navbar-static-top">
			        <div className="container">
			            
			            <div className="navbar-header">
			              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			                <span className="sr-only">Toggle navigation</span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			              </button>
			              <a className="navbar-brand" href="/#/menu">NetLab Histology</a>

		        		</div>


				        <div id="navbar" className="navbar-collapse collapse">
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
   		</div>
    )
  }
}) 
// Import React dependencies
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

// Import home component and children components
import Login from './children/login'
import Home from './children/home'
import Menu from './children/menu'
import Viewer from './children/viewer'
import Singlenote from './children/singlenote'
import Mynotesall from './children/mynotesall'
import Savednotes from './children/savednotes'
import Createnote from './children/createnote'
import Pins from './children/pins'
import Profile from './children/profile'
import Allnotescurrentslide from './children/allnotescurrentslide'
import Mynotescurrentslide from './children/mynotescurrentslide'


// Set up react router
render((
	<Router history={hashHistory}>
		<Route path="/" component={Login}/>
		<Route path="/home" component={Home}>

			{/* make the following components children of "Home" */}
			<IndexRoute component={Menu}/>
      		<Route path="/mynotesall" component={Mynotesall}/>
			<Route path="/savednotes" component={Savednotes}/>
      		<Route path="/createnote" component={Newnote}/>
      		<Route path="/pins" component={Pins}/>
      		<Route path="/profile" component={Profile}/>
      		<Route path="/allnotescurrentslide" component={Allnotescurrentslide}/>
      		<Route path="/mynotescurrentslide" component={Mynotescurrentslide}/>
			
			{/* route to pass slide number, structure & system parameters from the menu to the viewer component */}
			<Route path="/viewer/:slideNum/:slideStruc/:slideSys" component={Viewer}/>
			
			{/* route to pass pin parameters from to the viewer component from a pin */}
			<Route path="/pin/:num/:loc" component={Viewer}/>
			
			{/* route to pass the note key (node ID) and location parameters to the singlenote component */}
			<Route path="/singlenote/:key/:loc" component={Singlenote}/>

			

		</Route>
	</Router>
), document.getElementById('app'))

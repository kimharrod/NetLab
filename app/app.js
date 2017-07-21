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
import Notes from './children/notes'
import Savednotes from './children/savednotes'
import Createnote from './children/createnote'
import Pins from './children/pins'
import Profile from './children/profile'
import Allnotes from './children/allnotes'
import Mynotes from './children/mynotes'


// Set up react router
render((
	<Router history={hashHistory}>
		<Route path="/" component={Login}/>
		<Route path="/home" component={Home}>

			{/* make the following components children of "Home" */}
			<IndexRoute component={Menu}/>
      		<Route path="/notes" component={Notes}/>
			<Route path="/savednotes" component={Savednotes}/>
      		<Route path="/createnote" component={Newnote}/>
      		<Route path="/pins" component={Pins}/>
      		<Route path="/profile" component={Profile}/>
      		<Route path="/allnotes" component={Allnotes}/>
      		<Route path="/mynotes" component={Mynotes}/>
			
			{/* route to pass parameters to the viewer component */}
			<Route path="/viewer/:slideNum/:slideStruc/:slideSys" component={Viewer}/>

			{/* route to pass parameters to the singlenote component */}
			<Route path="/singlenote/:author/:sys/:struc/:subj/:body/:num/:loc" component={Singlenote}/>


		</Route>
	</Router>
), document.getElementById('app'))

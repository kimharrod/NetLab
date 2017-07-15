// Import React dependencies
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory} from 'react-router'

// Import home component and children components
import Home from './children/home'
import Menu from './children/menu'
import Viewer from './children/viewer'
import Search from './children/search'
import Newnote from './children/newnote'
import Bookmarks from './children/bookmarks'
import Profile from './children/profile'


// Set up react router
render((
	<Router history={browserHistory}>
		<Route path="/" component={Home}>

			{/* make the following components children of "Home" */}
			<Route path="/menu" component={Menu}/>
			<Route path="/search" component={Search}/>
	      	<Route path="/newnote" component={Newnote}/>
	      	<Route path="/bookmarks" component={Bookmarks}/>
	      	<Route path="/profile" component={Profile}/>
			
			{/* route to pass the slideNum parameter to the child */}
			<Route path="/viewer/:slideNum" component={ Viewer }/>

		</Route>
	</Router>
), document.getElementById('app'))

import React from 'react' 
import {BrowserRouter, Route} from "react-router-dom"

import Navbar from './components/layout/Navbar'
import Sidenav from './components/layout/Sidenav'
import SidenavContextProvider from './contexts/SidenavContext'
import Dashboard from './components/dashboard/Dashboard'
import WhatTodo from './components/whatTodo/WhatTodo'

function App() {
return (
		<SidenavContextProvider>
			<div className="App bg-darken-3">
				<BrowserRouter>
					<Navbar />
					<main className="row main">
						<Sidenav />
						<Route exact path={["/", "/dashboard"]} component={ Dashboard } />
						<Route path="/whattodo" component={WhatTodo}/>
					</main>
				</BrowserRouter>
			</div>
		</SidenavContextProvider>
	);
}

export default App;

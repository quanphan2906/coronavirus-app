import React from 'react' 
import {BrowserRouter, Route} from "react-router-dom"

import Navbar from './components/layout/Navbar'
import Sidenav from './components/layout/Sidenav'
import SidenavContextProvider from './contexts/SidenavContext';
import TodoList from './components/dashboard/TodoList';

function App() {
return (
		<SidenavContextProvider>
			<div className="App bg-darken-3">
				<BrowserRouter>
					<Navbar />
					<main className="row main">
						<Sidenav />
						<div className="col s12 m8 l8">
							<TodoList />
							<div className="divider"></div>
							<TodoList />
						</div>
					</main>
				</BrowserRouter>
			</div>
		</SidenavContextProvider>
	);
}

export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import "./App.css"
import "./features/styles.css"

// Add code to import the components
import { ScrollBar } from './features/scrollbar/ScrollBar'
import { NavBar } from "./features/nav/NavBar"
import { Sheet } from './Sheet'


const App = () => {
	/*
	const full_state = useSelector(state => state)
	useEffect(() => {
		//console.log(full_state)
	},[full_state])
	*/
	return (
		<>
			<ScrollBar>
				<BrowserRouter>
					<NavBar/>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/sheet" element={<Sheet />} />
					</Routes>
				</BrowserRouter>
			</ScrollBar>
		</>
    )
}

export default App


const LandingPage = () => {
	return (
		<h2>Landing Page</h2>
	)
}
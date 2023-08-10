import React from 'react'
import {  createBrowserRouter, RouterProvider} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import "./App.css"
import "./features/styles.scss"

// Add code to import the components
import { ScrollBar } from './features/scrollbar/ScrollBar'
import { NavBar } from "./features/nav/NavBar"
import { Sheet } from './Sheet'
import { LandingPage } from './features/landingPage/LandingPage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
	  //errorElement: <ErrorPage />,
		children : [
			{
				path: "/",
				element: <LandingPage />
			},
			{
				path: "/sheet",
				element: <Sheet />
			}
		]
	},
  ])


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
				<RouterProvider router={router} loading={<NavBar/>}/>
			</ScrollBar>
		</>
    )
}

export default App
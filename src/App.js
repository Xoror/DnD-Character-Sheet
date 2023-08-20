import React from 'react'
import {  createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import "./App.css"
import "./features/styles.scss"

// Add code to import the components
import { ScrollBar } from './features/scrollbar/ScrollBar'
import { NavBar } from "./features/nav/NavBar"
import { Sheet } from './Sheet'
import { LandingPage } from './features/landingPage/LandingPage';
import { isDesktop } from './features/settings/SettingsSlice';

const routerDesktop = createHashRouter([//createBrowserRouter([
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
const routerWeb = createBrowserRouter([
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
	let router = isDesktop ? routerDesktop : routerWeb
	return (
		<>
			<ScrollBar>
				<RouterProvider router={router} loading={<NavBar/>}/>
			</ScrollBar>
		</>
    )
}

export default App
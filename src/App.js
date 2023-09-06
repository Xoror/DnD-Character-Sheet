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
import { isDesktop } from "./config.js"

// These exist because different routers are used depending on whether the build is run on a server or on a static host.
// Electron is a static host so when building the app for it, we need a hash router, whereas GitHub pages is a server so
// to run on it you can use a regular browser router.
const routerDesktop = createHashRouter([
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
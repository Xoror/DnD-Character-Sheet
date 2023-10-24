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
import { Login } from './features/api/Login';
import { Register } from './features/api/Register';
import { isDesktop, webServer } from "./config.js"
import { SettingsPage } from './features/settings/SettingsPage';
import { SettingsHome } from './features/settings/SettingsHome';

// These exist because different routers are used depending on whether the build is run on a server or on a static host.
// Electron is a static host so when building the app for it, we need a hash router, whereas GitHub pages is a server so
// to run on it you can use a regular browser router, however it won't allow reloading/direct loading of routes so the 
// hash router is still better.
const routerStatic = createHashRouter([
	{
		path: "/",
		element: <ScrollBar><NavBar /></ScrollBar>,
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
const routerDesktop = createHashRouter([
	{
		path: "/",
		element: <ScrollBar><NavBar /></ScrollBar>,
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
		element: <ScrollBar><NavBar /></ScrollBar>,
	  //errorElement: <ErrorPage />,
		children : [
			{
				path: "/",
				element: <LandingPage />
			},
			{
				path: "/sheet",
				element: <Sheet />
			},
			{
				path: "/login",
				element: <Login />
			},
			{
				path: "/register",
				element: <Register />
			},
			{
				path: "/settings",
				element: <SettingsHome />,
				children: [
					{index: true, element: <SettingsPage/>},
					{
						path: "/settings/:id",
						element: <SettingsPage />,
					}
				]
			}
		]
	},
])


const App = () => {
	let router = isDesktop ? (webServer ? routerWeb : routerDesktop ) : routerStatic
	return (
		<>
			
				<RouterProvider router={router} loading={<NavBar/>} />
		</>
    )
}

export default App
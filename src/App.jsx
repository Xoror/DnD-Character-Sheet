import React from 'react'
import {  createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import "./App.css"
import "./features/styles.scss"

import { isDesktop, webServer } from "./config.js"

// Add code to import the components
import { ScrollBar } from './features/scrollbar/ScrollBar.jsx'
import { NavBar } from "./features/nav/NavBar.jsx"
import { Sheet } from './Sheet.jsx'
import { LandingPage } from './features/landingPage/LandingPage.jsx';
import { Login } from './features/api/Login.jsx';
import { Register } from './features/api/Register.jsx';
import { SettingsPage } from './features/settings/SettingsPage.jsx';
import { SettingsHome } from './features/settings/SettingsHome.jsx';

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
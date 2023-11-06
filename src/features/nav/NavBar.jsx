import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit';

import { Outlet, useLocation } from "react-router-dom"

import version from '../../../package.json'

import { AiFillTwitterCircle, AiOutlineGithub } from "react-icons/ai"
import { FaReact } from "react-icons/fa";
import { GiDiceTwentyFacesOne } from "react-icons/gi";

//import Container from 'react-bootstrap/Container'
import Container from '../../BootstrapReplace/Container';
import Navbar from 'react-bootstrap/Navbar';
//import Button from 'react-bootstrap/Button';
import Button from '../../BootstrapReplace/CustomButton';
//import Modal from 'react-bootstrap/Modal';
import Modal from '../../BootstrapReplace/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
//import Form from 'react-bootstrap/Form';
import Form from '../../BootstrapReplace/Form';

import { isDesktop, webServer, isDev } from "../../config"

import { NavMenuDesktop } from './NavMenuDesktop';
import { NavMenuWeb } from './NavMenuWeb';
import { useAutosave } from "../../components/CustomHooks"
import { importActions } from '../actions/ActionsSlice';
import { importAttributes } from '../attributes/AttributesSlice';
import { importCharDetails } from '../charDetails/CharDetailsSlice';
import { importFeatures } from '../classFeatures/FeaturesSlice';
import { importInventory } from '../inventory/InventorySlice';
import { importMiscAttributes } from '../miscAttributes/MiscAttributesSlice';
import { importNotes } from '../notes/NotesSlice';
import { importResources } from '../resources/ResourcesSlice';
import { importSpells } from '../spells/SpellSlice';
import { importConditions } from '../conditions/ConditionsSlice';
import { importCharacterNames, addCharacterToDatabase, 
	importCharacter, changeCharacterIndDB, importNavBar } from './NavBarSlice';
import { importSettings } from '../settings/SettingsSlice';

import { isEqual, reduce } from "lodash"

export const importState = createAction(
	"import/state2",
	async (payload, dispatch) => {
		dispatch(importActions(payload.actions))
		dispatch(importAttributes(payload.attributes))
		dispatch(importCharDetails(payload.charDetails))
		dispatch(importFeatures(payload.features))
		dispatch(importInventory(payload.inventory))
		dispatch(importMiscAttributes(payload.miscAttributes))
		dispatch(importNotes(payload.notes))
		dispatch(importResources(payload.resources))
		dispatch(importSpells(payload.spells))
		dispatch(importConditions(payload.conditions))
		dispatch(importSettings(payload.settings))
		//dispatch(importNavBar(payload.navBar))
	}
)
const preparedImportState = (state, navBar) => {
	let keys1 = Object.keys(state)
	let tempState = {}
	if(navBar) {
		tempState["navBar"] = navBar
	}
	for(let key of keys1) {
		if(key != "navBar" && key != "landingPage") {
			tempState[key] = state[key]
		}
	}
	return tempState
}

const loadSessionStorage = (dispatch) => {
	const sessionStorageState = window.localStorage.getItem("dnd-sheet-state")// === null || undefined ? JSON.stringify(initialState, null, "\t") : window.sessionStorage.getItem("dnd-sheet-state")
	console.log("load session storage", JSON.parse(sessionStorageState).charDetails)
	if(sessionStorageState != null) {
		dispatch(importState(JSON.parse(sessionStorageState), dispatch))
	}
}

export const NavBar = () => {
	const currentState = useSelector(state => state)
	const dispatch = useDispatch()
    const charName= useSelector(state => state.charDetails.charName)
	const navBarSlice = useSelector(state => state.navBar)
	const settingsSlice = useSelector(state => state.settings)
	const api = useSelector(state => state.api)
	const desktop = isDesktop
	
	const [star, setStar] = useState(false)
	const [modalType, setModalType] = useState("safety")
	const [showSafetyBox, setShowSafetyBox] = useState(false)
	const [tempSave, setTempSave] = useState([])
	const [showAutoSave, setShowAutoSave] = useState(false)

	const location = useLocation()
	const hasFooter = () => {
		if(location.pathname == "/sheet" || location.pathname === "/") {
			return true
		}
		else {
			return false
		}
	}
	/*
	useEffect(() => {
		loadSessionStorage(dispatch)
	}, [])
	
	useEffect(() => {
			console.log("save session storage", currentState.charDetails)
			window.localStorage.setItem("dnd-sheet-state", JSON.stringify(currentState, null, "\t"))
	}, [currentState])
	*/

	useEffect(() => {
		if( desktop ) {
			if( (navBarSlice.currentlyEditing.id != 0) ) {
				//let compareState = (importCharacterReadOnly([navBarSlice.currentlyEditing.id, navBarSlice.currentlyEditing.name]))
				let compareState = navBarSlice.compareState
				let statesSame = isEqual(currentState, compareState)
				let test = reduce(currentState, function(result, value, key) {
					return isEqual(value, compareState[key]) ?
						result : result.concat(key);
				}, []);
				//console.log(test, statesSame)
				if (!statesSame) {
					if (navBarSlice.currentlyEditing.name === "None") {
						setStar(false)
					} else if (test.length === 1 && test[0] === "navBar") {
						setStar(false)
					}
					else {
						setStar(true)
					}
				} else {setStar(false)}
			}
		}
	}, [currentState, navBarSlice.compareState, navBarSlice.currentlyEditing.name, navBarSlice.currentlyEditing.id, desktop])
	useEffect(() => {
		if(desktop) {
			if( webServer && api.loginStatus === "fulfilled") {
				getCharacterNames()
			}
			else if(!webServer) {
				getCharacterNames()
			}
		}
	}, [])

	useAutosave(() => {
		if( desktop && !webServer ) {
			setShowAutoSave(true)
			dispatch(changeCharacterIndDB(
				[
					"update characters set name = ?, state = ?, lastSaved = ? where id = ?",
					["Autosave", JSON.stringify(currentState, null), new Date().toLocaleString(), 1]
				]
			))
		}
	}, 15*60*1000)


	const getCharacterNames = async () => {
		if(webServer) {
			dispatch(importCharacterNames({body: "bla", type:"web"}))
		}
		else {
			dispatch(importCharacterNames({body: "select id, name from characters", type:"desktop"}))
		}
	}
	const handleSave = async (event, arg) => {
		if(currentState.navBar.currentlyEditing.name === "None" && arg != "auto") {
			await setModalType("save-as")
			setShowSafetyBox(true)
		}
		else {
			let name
			if( currentState.charDetails.charName === "") {
				name = "character"
			  }
			else { 
				name = currentState.charDetails.charName 
			}
			if(webServer) {
				dispatch(changeCharacterIndDB({
					body: {
						name: name, 
						state: JSON.stringify(currentState, null), 
						lastSaved: new Date().toLocaleString(), 
						id: navBarSlice.currentlyEditing.id
					},
					type: "web"
				}))
			}
			else {
				dispatch(changeCharacterIndDB({
					body: [
						"update characters set name = ?, state = ?, lastSaved = ? where id = ?",
						[name, JSON.stringify(currentState, null), new Date().toLocaleString(), navBarSlice.currentlyEditing.id]
					],
					type: "desktop"
				}))
			}
		}
	}
	const handleSaveAs = (event) => {
		if(webServer) {
			dispatch(addCharacterToDatabase({
				body: JSON.stringify({
					name: currentState.charDetails.charName, 
					state: JSON.stringify(currentState, null), 
					lastSaved: new Date().toLocaleString()
				}), 
				type: "web"
			}))
		}
		else {
			dispatch(addCharacterToDatabase({
				body: [
					"INSERT INTO characters(name, state, lastSaved) VALUES(?,?,?)", 
					[currentState.charDetails.charName, JSON.stringify(currentState, null), new Date().toLocaleString()]
				],
				type: "desktop"
			}))
		}
		
		setShowSafetyBox(false)
		setModalType("safety")
	}
	const handleNavDropdownClick = (event, character, id) => {
		setTempSave([event, character, id])
		setShowSafetyBox(true)
	}
	const handleAffirmation = async () => {
		setShowSafetyBox(false)
		if(tempSave[2] === "new") {
			if(tempSave[1] === "web") {
				window.sessionStorage.clear()//settingsSlice
				dispatch({type: "import/state", payload: {settings: {autoSaveTimer: settingsSlice.autoSaveTimer, desktop: settingsSlice.desktop, diceLog: []}}})
				window.location.reload()
			} else {
				dispatch({type: "import/state", payload: {settings: {autoSaveTimer: settingsSlice.autoSaveTimer, desktop: settingsSlice.desktop, diceLog: []}}})
				setStar(false)
				window.location.reload()
			}
		}
		else {
			setStar(true)
			let test
			if(webServer) {
				test = await dispatch(importCharacter({body: tempSave[2], type:"web"}))
			}
			else {
				test = await dispatch(importCharacter({body: ["select * from characters where id = ?", tempSave[1]], type:"desktop"}))
			}
			let navBarTemp = structuredClone(currentState.navBar)
			navBarTemp.currentlyEditing.id = test.payload.id
			navBarTemp.currentlyEditing.name = navBarTemp.characters.names[navBarTemp.characters.id.indexOf(test.payload.id)]
			navBarTemp.lastSaved = new Date().toLocaleString()
			navBarTemp.compareState = JSON.parse(test.payload.state)
			navBarTemp.importFromDbStatus = "succeeded"
			//dispatch(importState(JSON.parse(test.payload.state), dispatch))
			dispatch({type: "import/state", payload: preparedImportState(JSON.parse(test.payload.state), navBarTemp)})
		}
	}

	return(
		<>
			{ desktop ? 
				<>
					<ToastContainer style={{zIndex:"3", position:"absolute", right:"1em", top:"0.25em", width:"10em"}}>
						<Toast onClose={() => setShowAutoSave(false)} show={showAutoSave} delay={3000} bg="success" autohide>
							<Toast.Body>Autosave complete!</Toast.Body>
						</Toast>
					</ToastContainer>
					<Modal backdrop="static" show={showSafetyBox} onHide={() => setShowSafetyBox(false)}>
						{modalType === "safety" ? 
							<>
								<Modal.Header closeButton>
									<Modal.Title>Are you sure you want to import a different character?</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<p>
										You're about to import a different character. THIS WILL ERASE YOUR CURRENT CHARACTER UNLESS IT WAS SAVED!
										Make sure to save progress if you want to before clicking yes!
									</p>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={() => setShowSafetyBox(false)}>
										No
									</Button>
									<Button variant="success" onClick={handleAffirmation}>
										Yes
									</Button>
								</Modal.Footer>
							</> : 
							<>
								<Form onSubmit={(event) => handleSaveAs(event)}>
									<Modal.Header closeButton>
										<Modal.Title>Save Character as: </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Form.Group className="mb-3">
											<Form.Label>Character Name</Form.Label>
											<Form.Control placeholder="Enter character name here..." defaultValue={currentState.charDetails.charName} />
										</Form.Group>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="danger" onClick={() => setShowSafetyBox(false)}>
											Cancel
										</Button>
										<Button type="submit" variant="success">
											Save
										</Button>
									</Modal.Footer>
								</Form>
							</>
							}
					</Modal>
				</> : 
					<Modal backdrop="static" show={showSafetyBox} onHide={() => setShowSafetyBox(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Are you sure you want to start a new character?</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>
								You're about to import a different character. THIS WILL ERASE YOUR CURRENT CHARACTER UNLESS IT WAS SAVED!
								Make sure to save progress if you want to before clicking yes!
							</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="danger" onClick={() => setShowSafetyBox(false)}>
								No
							</Button>
							<Button variant="success" onClick={handleAffirmation}>
								Yes
							</Button>
						</Modal.Footer>
					</Modal>
				}
			<Navbar style={isDev ? {backgroundColor:"red"} : null} variant="dark" className="titlebar">
				<Container fluid className="draggable" style={{alignItems:"normal", justifyContent:"normal"}}>
					{desktop ?
						<NavMenuDesktop
							location={location}
							navBarSlice={navBarSlice}
							preparedImportState={preparedImportState}
							getCharacterNames={getCharacterNames}
							handleNavDropdownClick={handleNavDropdownClick}
							handleSave={handleSave}
							setModalType={setModalType}
							setShowSafetyBox={setShowSafetyBox}
							charName={charName}
							currentState={currentState}
							star={star}
							webServer={webServer}
						/>
							:
						<NavMenuWeb
							location={location}
							preparedImportState={preparedImportState}
							handleNavDropdownClick={handleNavDropdownClick}
							charName={charName}
							currentState={currentState}
						/>
					}
				</Container>
			</Navbar>
			<div style={hasFooter() ? {paddingBottom: "230px"}:null}>
				<Outlet/>
			</div>
			{location.pathname === "/sheet" || location.pathname === "/" ?
				<div className="footer">
					<Container className='p-3'>
						<section className='mb-4'>
							<a tabIndex="0" className="link-button" style={{marginRight:"0.25em"}} target="_blank" rel="noreferrer" href="https://twitter.com/StargazerWorks">
								<AiFillTwitterCircle style={{position: "relative"}} size="3.5em"/>
							</a>
							<a tabIndex="0" className="link-button" style={{marginLeft:"0.25em"}} target="_blank" rel="noreferrer" href="https://github.com/Xoror/sheettest_redux">
								<AiOutlineGithub style={{position: "relative"}} size="3.5em"/>
							</a>
						</section>

						<section>
							<p style={{marginBottom:"0em", height:"2.5em"}}>
								Powered by React  
									<a target="_blank" rel="noreferrer" href="https://react.dev/" tabIndex="0" className="home-button" id="react-link-button" aria-label="link to th3 react website" style={{marginLeft:"0.25em",width:"2.5em", height:"2.5em",display:"inline-block"}}>
										<FaReact size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
									</a>
								and the DnD 5e API
									<a target="_blank" rel="noreferrer" href="https://www.dnd5eapi.co/" tabIndex="0" className="home-button" id="dnd-5e-api-link-button" aria-label="link to the dnd 5e api website" style={{marginLeft:"0.25em",width:"2.5em", height:"2.5em",display:"inline-block"}}>
										<GiDiceTwentyFacesOne size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
									</a>
							</p>
						</section>
						<section>
							For problems, comments, bugs etc. contact us  <a href="mailto: stargazerworks.ttrpg@gmail.com">stargazerworks.ttrpg@gmail.com</a> !
						</section>

					</Container>

					<div className='text-center p-3' style={{ backgroundColor: '#1a1e21' }}>
						© 2023 Copyright: Stargazer Works, Version {version.version}
					</div>
				</div>
			:null}
		</>
	)
}


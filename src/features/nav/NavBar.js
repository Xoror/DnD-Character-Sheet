import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit';

import { Outlet, Link, useLocation } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Form from 'react-bootstrap/Form';

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

let _ = require('lodash')

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
				let statesSame = _.isEqual(currentState, compareState)
				let test = _.reduce(currentState, function(result, value, key) {
					return _.isEqual(value, compareState[key]) ?
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
					<Modal contentClassName="modal-custom" show={showSafetyBox} onHide={() => setShowSafetyBox(false)}>
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
					<Modal contentClassName="modal-custom" show={showSafetyBox} onHide={() => setShowSafetyBox(false)}>
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
			<Outlet/>
		</>
	)
}
/*
<label  htmlFor="file-upload" className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em"}}>
	Import
</label>
<input id="file-upload" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0], dispatch)}></input>
<button className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em"}} type="submit" onClick={(event) => exportToJson(event, charName, currentState)}>Export</button>
*/

const handleSQL = async () => {
	let response = (await window.api.getFullDB('SELECT * from characters'))
	let bla
	try {
		bla = JSON.parse(response[0].state)
	} catch(e) {
		console.log("**Not valid JSON file!**");
	}
	console.log("BLA:", response)
}

/*
{useLocation().pathname === "/" ?
					<>
						<Navbar.Brand id="character-sheet-link" as={Link} to="/sheet" className="sheet-button not-draggable" aria-label="link that leads to the sheet">
							{document.title}
						</Navbar.Brand>
						{!desktop ? <Navbar.Brand id="inventory-spell-manager" href="https://xoror.github.io/spells-inventory-manager/" className="sheet-button not-draggable" aria-label="link that leads to the sheet">
							Standalone Spells and Inventory Manager
						</Navbar.Brand> : null}
					</>
					:
					<>
						<Navbar.Brand id="character-sheet-link" as={Link} to="/sheet" className="sheet-button not-draggable" aria-label="link that leads to the sheet">
							{document.title}
						</Navbar.Brand>
						{!desktop ?
							<>
								<Navbar.Brand id="character-sheet-link" to="/sheet" role="button" as={Link} className="sheet-button not-draggable" onClick={event => handleNavDropdownClick(event, "web", "new")}>
									New Character
								</Navbar.Brand>
							</>
							: null
						}
					</>
				}
				{desktop && location.pathname === "/sheet" ? <Nav className="not-draggable">
					<NavDropdown className="character-menu" id="character-choice-menu" title="Menu" menuVariant="dark" onClick={getCharacterNames}>
						<NavDropdown.Item onClick={(event) => handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => handleSave(event)}>Save</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => (setModalType("save-as"), setShowSafetyBox(true))}>Save As</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => exportToJson(event, charName, currentState)}>Export to file</NavDropdown.Item>
						<NavDropdown.Item className="custom-upload" id="file-upload" as="input" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0], dispatch)}></NavDropdown.Item>
						<NavDropdown.Item as="label" htmlFor="file-upload">Import from file</NavDropdown.Item>
						
						<NavDropdown.Divider />
						{
							navBarSlice.characters.status === "pending" ? 
							["Loading..."].map((character, index) => (
								<NavDropdown.Item key={`${character}-${index}`}>{character}</NavDropdown.Item>
							)) : 
							navBarSlice.characters.names.map((character, index) => (
								<NavDropdown.Item 
									onClick={async (event) => handleNavDropdownClick(event, character, navBarSlice.characters.id[index])} 
									key={`${index}-character-row-${character}`}
								>
									{character}
								</NavDropdown.Item>
							))
						}
					</NavDropdown>
					<Navbar.Text>Last saved{star ? "*" : null}: {navBarSlice.lastSaved} (currently editing: {navBarSlice.currentlyEditing.name})</Navbar.Text>
				</Nav>: null}
				
				{ desktop ? 
					<div className="controls" style={{marginLeft:"auto"}}>
						{false ? <Button variant="link" onClick={handleSQL}>SQL get test</Button> : null}
						<VscChromeMinimize tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("min")} className="button minimize" size="2em"/>
						<VscChromeMaximize tabIndex="0" type="button"  onClick={() => window.api.buttonInteraction("max")} className="button maximize" size="2em"/>
						<VscChromeClose tabIndex="0" type="button" onClick={() => window.api.buttonInteraction("close")} className="button close" size="2em" />
					</div> :
					(location.pathname === "/sheet" ?
						<div className="controls" style={{marginLeft:"auto"}}>
							<label  htmlFor="file-upload" className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em", marginRight:"0.5em"}}>
								Import from file
							</label>
							<input className="custom-upload" id="file-upload" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0], dispatch)}></input>
							<button className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em"}} type="submit" onClick={(event) => exportToJson(event, charName, currentState)}>Export to file</button>
						</div> : null
					)
				}
*/

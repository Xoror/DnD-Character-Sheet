import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit';

import { Outlet, Link, useLocation } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Form from 'react-bootstrap/Form';

import { MdHome} from "react-icons/md";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

import useAutosave from "../../components/autoSaveHook"
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
	console.log(tempState)
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
	const desktop = settingsSlice.desktop

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


	useAutosave(() => {
		if( desktop ) {
			setShowAutoSave(true)
			dispatch(changeCharacterIndDB(
				[
					"update characters set name = ?, state = ?, lastSaved = ? where id = ?",
					["Autosave", JSON.stringify(currentState, null), new Date().toLocaleString(), 1]
				]
			))
		}
	}, settingsSlice.autoSaveTimer*60*1000)


	const getCharacterNames = async () => {
		dispatch(importCharacterNames("select id, name from characters"))
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
			dispatch(changeCharacterIndDB(
				[
					"update characters set name = ?, state = ?, lastSaved = ? where id = ?",
					[name, JSON.stringify(currentState, null), new Date().toLocaleString(), navBarSlice.currentlyEditing.id]
				]
			))
		}
	}
	const handleSaveAs = (event) => {
		dispatch(addCharacterToDatabase(
			[
				"INSERT INTO characters(name, state, lastSaved) VALUES(?,?,?)", 
				[currentState.charDetails.charName,JSON.stringify(currentState, null), new Date().toLocaleString()]
			]
		))
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
			let test = await dispatch(importCharacter(
				["select * from characters where id = ?", tempSave[2]]
			))
			console.log(test)
			let navBarTemp = structuredClone(currentState.navBar)
			navBarTemp.currentlyEditing.id = test.payload.id
			navBarTemp.currentlyEditing.name = navBarTemp.characters.names[test.payload.id - 1]
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
			<Navbar style={{backgroundColor:"#212529", padding:"0"}} variant="dark" className="titlebar">
			<Container fluid className="draggable" style={{alignItems:"normal", justifyContent:"normal"}}>
				<Link to="/" tabIndex="0" className="home-button not-draggable" id="home-button" aria-label="home button that leads to landing page">
					<MdHome size="2em" style={{position: "relative", right: "1px", bottom: "1px"}}/>
				</Link>	
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

const downloadFile = ({ data, fileName, fileType }) => {
	// Create a blob with the data we want to download as a file
	const blob = new Blob([data], { type: fileType })
	// Create an anchor element and dispatch a click event on it
	// to trigger a download
	const a = document.createElement('a')
	a.download = fileName
	a.href = window.URL.createObjectURL(blob)
	const clickEvt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	})
	a.dispatchEvent(clickEvt)
	a.remove()
}

const exportToJson = (event, charName, currentState) => {
	event.preventDefault()
	let test = ""
	if(charName === "") {
		test = "character"
	}
	else {
		let test1 = charName.split(" ")
		test1.map(word => (
			test += word
		))
	}
	downloadFile({
		data: JSON.stringify(currentState, null, "\t"),
		fileName: test +'.json',
		fileType: 'text/json',
	})
}

const readFileOnUpload = (uploadedFile, dispatch) => {
   const fileReader = new FileReader();
   fileReader.onloadend = () => {
	  try {
		//dispatch(importState(JSON.parse(fileReader.result), dispatch))
		dispatch({type: "import/state", payload: preparedImportState(JSON.parse(fileReader.result))})
		} catch(e) {
			console.log("**Not valid JSON file!**");
		}
	}
	if( uploadedFile!== undefined) {
	  fileReader.readAsText(uploadedFile);
	}
}

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

const initialState = {
	"actions": {
		"actions": [
			{
				"id": "RBrxR3r5oI09JTtOcRQeU",
				"name": "Unarmed Attack",
				"range": "Melee",
				"damage": 1,
				"type": "Action",
				"scaling": "Strength",
				"isProficient": true,
				"damageType": "Bludgeoning",
				"description": "An attack with your fist, ellbow, head etc."
			}
		],
		"spells": [],
		"spellListImportStatues": "idle",
		"sortedSpellList": [],
		"highestSpellSlot": "1st",
		"spellListAPI": []
	},
	"features": {
		"data": [
			{
				"name": "Lineage Features",
				"level": 1,
				"featureClass": "-",
				"featureSubclass": "-",
				"description": "Placeholder"
			}
		]
	},
	"attributes": {
		"casting": {
			"isCaster": true,
			"type": "",
			"spellAttribute": "",
			"spellHit": 2,
			"spellDC": 10
		},
		"charAttributes": [
			{
				"id": "Strength",
				"name": "Strength",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Dexterity",
				"name": "Dexterity",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Constitution",
				"name": "Constitution",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Intelligence",
				"name": "Intelligence",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Wisdom",
				"name": "Wisdom",
				"value": 10,
				"bonus": 0
			},
			{
				"id": "Charisma",
				"name": "Charisma",
				"value": 10,
				"bonus": 0
			}
		],
		"jackOfAllTrades": false,
		"skills": [
			{
				"id": "0F0AHowNhZSy3JVPcNrnU",
				"name": "Strength Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "3ILXrCHjlTkeqFRW__RW7",
				"name": "Athletics",
				"shortName": "Athletic",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "wt2s_824TNoIQhArRebqj",
				"name": "Dexterity Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "3u-Na57sesaGp1WUB4_gr",
				"name": "Acrobatics",
				"shortName": "Acrobatics",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "ANU0clAh_8HoKUGeRYW82",
				"name": "Slight of Hand",
				"shortName": "Slight of Hand",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "PWBMn-v1r8uebLLaCsVYL",
				"name": "Stealth",
				"shortName": "Stealth",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "NKorKe03iuwf37KvTwvWc",
				"name": "Constitution Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Constitution",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "GkhCxuBTq0BN-Tupvbuw-",
				"name": "Intelligence Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "tP3tGM9vSc_61xhuIm57k",
				"name": "Arcana",
				"shortName": "Arcana",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "K_E1NJVzBeF7g6tPiGfQJ",
				"name": "History",
				"shortName": "History",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "ZVbOqhBFZyNN_n6Z1BJv-",
				"name": "Investigation",
				"shortName": "Investigation",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "3BIZFGkN3WtWiKzX_d-b4",
				"name": "Nature",
				"shortName": "Nature",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "mATUW46i9iqPavnRFldaA",
				"name": "Religion",
				"shortName": "Religion",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "iQNHTBAU54v5uWkDE06oP",
				"name": "Wisdom Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "r0p5q0NA4dM1c_QbZV5tm",
				"name": "Animal Handling",
				"shortName": "Animal Handling",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "0s4tdACr-azVGs-mAOSN7",
				"name": "Insight",
				"shortName": "Insight",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "Eogh_C7o01yFZ-wcKF9vg",
				"name": "Medicine",
				"shortName": "Medicine",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "8FVj5Zdn-GEFB_9O3kfJe",
				"name": "Perception",
				"shortName": "Perception",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "NmS6EDDlZJVPllCuahM2h",
				"name": "Survival",
				"shortName": "Survival",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "-Hyak3QOttQTPVCUuLvbX",
				"name": "Charisma Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "zIfNGZ-NOYpLfZRJ92EoX",
				"name": "Deception",
				"shortName": "Deception",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "nB-hlgKPe6j9isYggZxyL",
				"name": "Intimidation",
				"shortName": "Intimidation",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "k8DlwTyFujMk7jhEO298P",
				"name": "Performance",
				"shortName": "Performance",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "Fw_FFqcifDTH4TGm4BatH",
				"name": "Persuasion",
				"shortName": "Persuasion",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false,
				"advantage": false,
				"disadvantage": false
			},
			{
				"id": "2T_DT5KrVRTc4Czig-u_S",
				"name": "Simple Weapons",
				"shortName": "Simple Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "-oueHbmr13su1UnN1f9Xm",
				"name": "Martial Weapons",
				"shortName": "Martial Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "QoMoZNdAaf7PjXaphMIeJ",
				"name": "Shield",
				"shortName": "Shield",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "-MDpm2L0RLJ-FWfNRkpOU",
				"name": "Light Armor",
				"shortName": "Light Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "VQg7s7EWIy1JDNI3UhYw0",
				"name": "Medium Armor",
				"shortName": "Medium Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "VgKUa1jNb9sy9hhmhUaj2",
				"name": "Heavy Armor",
				"shortName": "Heavy Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			}
		],
		"proficienciesTypes": [
			{
				"value": "weapon",
				"label": "Weapon"
			},
			{
				"value": "armor",
				"label": "Armor"
			},
			{
				"value": "tool",
				"label": "Tool"
			},
			{
				"value": "instrument",
				"label": "Instrument"
			}
		],
		"proficiency": {
			"id": "proficiency",
			"name": "Proficiency",
			"value": 2
		},
		"charAC": {
			"id": "AC",
			"name": "AC",
			"value": 10,
			"baseAC": 10,
			"scalingPrimary": "Dexterity",
			"unarmoredDefense": true,
			"scalingSecondary": "None",
			"wearsArmor": false,
			"maxBonus": 100,
			"stealthDisadvantage": false
		},
		"initiative": {
			"id": "initiative",
			"name": "Initiative",
			"value": 0,
			"scalingPrimary": "Dexterity",
			"scalingSecondary": "None",
			"flatBonus": 0
		}
	},
	"inventory": {
		"inventory": [
			{
				"filtered": true,
				"id": "ixYfiFhFnSPJ7o_6gdOT1",
				"name": "Test",
				"container": "equipment",
				"category": "Weapon",
				"qty": 1,
				"worth": 2,
				"weight": 3,
				"isEquipped": false,
				"rarity": "Common",
				"attunable": false,
				"attuned": false,
				"attuneRequirement": "requires attunment by a druid",
				"description": [
					"This is a test, a meddle of strength"
				]
			}
		],
		"containers": [
			{
				"id": "equipment",
				"value": "equipment",
				"label": "Equipment",
				"weight": 0
			}
		],
		"weight": 0,
		"currency": {
			"platinum": 0,
			"gold": 0,
			"electrum": 0,
			"silver": 0,
			"copper": 0
		},
		"startingItems": {}
	},
	"miscAttributes": {
		"speed": {
			"name": "Speed",
			"value": 30,
			"ground": 30,
			"swim": 15,
			"climb": 15,
			"fly": 0,
			"displayed": "Ground"
		},
		"charHP": {
			"current": "",
			"max": "",
			"temp": ""
		}
	},
	"notes": {
		"data": []
	},
	"charDetails": {
		"charLevel": 1,
		"charName": "",
		"charClass": "",
		"charSubclass": "",
		"charLineage": "",
		"charBackground": "",
		"charExperience": 0,
		"languages": [
			{
				"id": "TGbZiFPCRDpHzGeoUWIOo",
				"name": "Common"
			}
		],
		"senses": [
			{
				"id": "I8WNOg8sDXgxQVGshE66C",
				"name": "Darkvision",
				"distance": 60
			},
			{
				"id": "qfM7xMOl9_f2mbrHPM6EU",
				"name": "Blindsight",
				"distance": 30
			},
			{
				"id": "3Kah0Y0mumli1ASAIQmkh",
				"name": "Truesight",
				"distance": 20
			},
			{
				"id": "DYFLs-rvSJbqElKCz_T-b",
				"name": "Tremor Sense",
				"distance": 20
			}
		],
		"sensesHas": [],
		"resistances": [],
		"immunities": [],
		"vulnerabilities": []
	},
	"spells": {
		"spellSlots": [
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false
			],
			[
				false,
				false,
				false,
				false,
				false
			],
			[
				false
			]
		]
	},
	"resources": {
		"data": [
			{
				"name": "Hit Points",
				"current": "",
				"maximum": "",
				"dice": ""
			}
		]
	},
	"conditions": {
		"conditions": [
			{
				"id": "azwqo2acKM0XQTiHPNzLV",
				"name": "Blinded",
				"description": "A blinded creature: \n can't see and automatically fails any ability check that requires sight. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
			},
			{
				"id": "6vzQ3Yf1GEBOJx9usVC5H",
				"name": "Charmed",
				"description": "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects. \n The charmer has advantage on any ability check to interact socially with the creature."
			},
			{
				"id": "GpQjXUZZj5pxfX2OBDVW_",
				"name": "Deafened",
				"description": "A deafened creature can't hear and automatically fails any ability check that requires hearing."
			},
			{
				"id": "Et-UMdgxUbmJpHAI7xaJn",
				"name": "Frightened",
				"description": "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. \n The creature can't willingly move closer to the source of its fear."
			},
			{
				"id": "_T_-Q0v7fvdwj5xp7CkcY",
				"name": "Grappled",
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"id": "W-EiQ5_Z8ve4YukYtFxuG",
				"name": "Incapacitated",
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"id": "-kwpF7an6tJdSsYpCwWia",
				"name": "Invisible",
				"description": "An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves. \n Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
			},
			{
				"id": "PogtyTv4dwgSJDpNuxIcj",
				"name": "Paralyzed",
				"description": "A paralyzed creature is incapacitated and can't move or speak. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			},
			{
				"id": "8qq6lM9BHIjJPYCdfqt2s",
				"name": "Petrified",
				"description": "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. \n The creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n Attack rolls against the creature have advantage. \n The creature automatically fails Strength and Dexterity saving throws. \n The creature has resistance to all damage. \n The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
			},
			{
				"id": "DBThVa1pctp_mduVHMMj1",
				"name": "Poisoned",
				"description": "A poisoned creature has disadvantage on attack rolls and ability checks."
			},
			{
				"id": "xyUgK-TrNh-G68K408M8q",
				"name": "Prone",
				"description": "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition. \n The creature has disadvantage on attack rolls. \n An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
			},
			{
				"id": "-1pLc1ZKdt2vuwUcJdvOI",
				"name": "Restrained",
				"description": "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage. \n The creature has disadvantage on Dexterity saving throws."
			},
			{
				"id": "hehvOv9aktwZoL0w4-DNy",
				"name": "Stunned",
				"description": "A stunned creature is incapacitated, can't move, and can speak only falteringly. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage."
			},
			{
				"id": "Jc4mphpd3m9Ii188Uhyz_",
				"name": "Unconscious",
				"description": "An unconscious creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n The creature drops whatever it's holding and falls prone. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			}
		],
		"conditionsHas": [],
		"exhaustion": {
			"name": "Exhaustion",
			"level": 0,
			"effects": [
				"Disadvantage on ability checks",
				"Speed halved",
				"Disadvantage on attack rolls and saving throws",
				"Hit point maximum halved",
				"Speed reduced to 0",
				"Death"
			]
		}
	},
	"navBar": {
		"characters": {
			"names": [
				""
			],
			"id": [
				""
			],
			"status": "idle"
		},
		"importFromDbStatus": "idle",
		"addCharactertoDBStatus": "idle",
		"changeCharacterInDBStatus": "idle",
		"currentlyEditing": {
			"id": 0,
			"name": "None"
		},
		"lastSaved": "Never",
		"compareState": {}
	},
	"settings": {
		"autoSaveTimer": 15,
		"desktop": false
	},
	"landingPage": {
		"todos": {
			"big": [],
			"medium": [],
			"small": []
		},
		"todosUpdated": "Never",
		"news": [],
		"newsUpdated": "Never"
	}
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit';

import "../styles.css"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Form from 'react-bootstrap/Form';
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
	importCharacter, changeCharacterIndDB } from './NavBarSlice';

var _ = require('lodash')
var desktop = false

export const importState = createAction(
	"import/state",
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
		//dispatch(importNavBar(payload.navBar))
	}
)

const importCharacterReadOnly = async (id) => {
	try {
        let result = await window.api.loadRow(["select * from characters where id = ?", id])
        return result[0]
    } catch(error) {
        console.log(error)
        return []
    }
}

export const NavBar = () => {
	const currentState= useSelector(state => state)
	const dispatch = useDispatch()
    const charName= useSelector(state => state.charDetails.charName)
	const navBarSlice = useSelector(state => state.navBar)
	const [star, setStar] = useState(false)
	const [modalType, setModalType] = useState("safety")
	const [showSafetyBox, setShowSafetyBox] = useState(false)
	const [tempSave, setTempSave] = useState([])
	const [showAutoSave, setShowAutoSave] = useState(false)

	useEffect(() => {
		if( !desktop ) {
			if( !(navBarSlice.currentlyEditing.id === 0) ) {
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
	}, [currentState, navBarSlice.compareState, navBarSlice.currentlyEditing.name])


	useAutosave(() => {
		if( !desktop ) {
			setShowAutoSave(true)
			dispatch(changeCharacterIndDB([currentState, 1, new Date().toLocaleString(), "auto"]))
		}
	}, 10*1000)


	const getCharacterNames = async () => {
		dispatch(importCharacterNames())
	}
	const handleSave = async (event, arg) => {
		if(currentState.navBar.currentlyEditing.name === "None" && arg != "auto") {
			await setModalType("save-as")
			setShowSafetyBox(true)
		}
		else {
			dispatch(changeCharacterIndDB([currentState, navBarSlice.currentlyEditing, new Date().toLocaleString(), "save"]))
		}
	}
	const handleSaveAs = (event) => {
		dispatch(addCharacterToDatabase([currentState, new Date().toLocaleString()]))
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
			dispatch(importState(initialState, dispatch))
		}
		else {
			let test = await dispatch(importCharacter([tempSave[1], tempSave[2]]))
			dispatch(importState(JSON.parse(test.payload.state), dispatch))
		}
	}
	
	return(
		<>
			{ !desktop ? 
				<>
					<ToastContainer style={{zIndex:"105", position:"absolute", right:"1em", top:"0.25em", width:"10em"}}>
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
									You're about to import a different character. THIS WILL ERASE YOUR CURRENT CHARACTER UNLESS IT WAS SAVED!
									Make sure to save progress if you want to before clicking yes!
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
				</> : null }
			<Navbar style={{backgroundColor:"#212529", padding:"0"}} variant="dark" className="titlebar">
			<Container fluid className="draggable" style={{alignItems:"normal", justifyContent:"normal"}}>
				<Navbar.Brand href="/">
					{document.title}
				</Navbar.Brand>
				{!desktop ? <Nav className="not-draggable">
					<NavDropdown id="character-choice-menu" title="Menu" menuVariant="dark" onClick={getCharacterNames}>
						<NavDropdown.Item onClick={(event) => handleNavDropdownClick(event, "new", "new")}>New</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => handleSave(event)}>Save</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => (setModalType("save-as"), setShowSafetyBox(true))}>Save As</NavDropdown.Item>
						<NavDropdown.Item onClick={(event) => exportToJson(event, charName, currentState)}>Export to file</NavDropdown.Item>
						<NavDropdown.Item className="custom-upload" id="file-upload" as="input" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0], dispatch)}></NavDropdown.Item>
						<NavDropdown.Item as="label" htmlFor="file-upload">Import from File</NavDropdown.Item>
						
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
				{ !desktop ? 
					<div className="controls" style={{marginLeft:"auto"}}>
						<Button variant="link" onClick={handleSQL}>SQL get test</Button>
						<div onClick={() => window.api.buttonInteraction("min")} className="button2 minimize"><VscChromeMinimize size="2em" color="white"/></div>
						<div onClick={() => window.api.buttonInteraction("max")} className="button2 maximize"><VscChromeMaximize size="2em" color="white"/></div>
						<div onClick={() => window.api.buttonInteraction("close")} className="button2 close"><VscChromeClose size="2em" color="white"/></div>
					</div> : null }
			</Container>
			</Navbar>
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
		dispatch(importState(JSON.parse(fileReader.result), dispatch))
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
			},
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
				"id": "StrenghtSave",
				"name": "Strength Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Athletics",
				"name": "Athletics",
				"shortName": "Athletic",
				"supSkill": "Strength",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "DexteritySave",
				"name": "Dexterity Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Acrobatics",
				"name": "Acrobatics",
				"shortName": "Acrobatics",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "SlightOfHand",
				"name": "Slight of Hand",
				"shortName": "Slight of Hand",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Stealth",
				"name": "Stealth",
				"shortName": "Stealth",
				"supSkill": "Dexterity",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "ConstitutionSave",
				"name": "Constitution Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Constitution",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "IntelligenceSave",
				"name": "Intelligence Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Arcana",
				"name": "Arcana",
				"shortName": "Arcana",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "History",
				"name": "History",
				"shortName": "History",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Investigation",
				"name": "Investigation",
				"shortName": "Investigation",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Nature",
				"name": "Nature",
				"shortName": "Nature",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Religion",
				"name": "Religion",
				"shortName": "Religion",
				"supSkill": "Intelligence",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "WisdomSave",
				"name": "Wisdom Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "AnimalHandling",
				"name": "Animal Handling",
				"shortName": "Animal Handling",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Insight",
				"name": "Insight",
				"shortName": "Insight",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Medicine",
				"name": "Medicine",
				"shortName": "Medicine",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Perception",
				"name": "Perception",
				"shortName": "Perception",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Survival",
				"name": "Survival",
				"shortName": "Survival",
				"supSkill": "Wisdom",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "CharismaSave",
				"name": "Charisma Saving Throw",
				"shortName": "Saving Throw",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Deception",
				"name": "Deception",
				"shortName": "Deception",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Intimidation",
				"name": "Intimidation",
				"shortName": "Intimidation",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Performance",
				"name": "Performance",
				"shortName": "Performance",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Persuasion",
				"name": "Persuasion",
				"shortName": "Persuasion",
				"supSkill": "Charisma",
				"bonus": 0,
				"proficient": false,
				"expertise": false
			},
			{
				"id": "SimpleWeapons",
				"name": "Simple Weapons",
				"shortName": "Simple Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "MartialWeapons",
				"name": "Martial Weapons",
				"shortName": "Martial Weapons",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "Shield",
				"name": "Shield",
				"shortName": "Shield",
				"supSkill": "Weapon",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "LightArmor",
				"name": "Light Armor",
				"shortName": "Light Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "MediumArmor",
				"name": "Medium Armor",
				"shortName": "Medium Armor",
				"supSkill": "Armor",
				"bonus": "",
				"proficient": false,
				"expertise": false
			},
			{
				"id": "HeavyArmor",
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
				"value": "Weapon",
				"label": "Weapon"
			},
			{
				"value": "Armor",
				"label": "Armor"
			},
			{
				"value": "Tool",
				"label": "Tool"
			},
			{
				"value": "Instrument",
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
		"inventory": [],
		"weight": 0,
		"currency": {
			"platinum": 0,
			"electrum": 0,
			"gold": 0,
			"silver": 0,
			"copper": 0
		}
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
				"name": "Common",
				"knows": true
			}
		],
		"senses": [
			{
				"name": "Darkvision",
				"has": true,
				"distance": 60
			},
			{
				"name": "Blindsight",
				"has": false,
				"distance": 30
			},
			{
				"name": "Truesight",
				"has": false,
				"distance": 20
			},
			{
				"name": "Tremor Sense",
				"has": false,
				"distance": 20
			}
		],
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
				"name": "Blinded",
				"has": true,
				"description": "A blinded creature: \n can't see and automatically fails any ability check that requires sight. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
			},
			{
				"name": "Charmed",
				"has": false,
				"description": "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects. \n The charmer has advantage on any ability check to interact socially with the creature."
			},
			{
				"name": "Deafened",
				"has": false,
				"description": "A deafened creature can't hear and automatically fails any ability check that requires hearing."
			},
			{
				"name": "Frightened",
				"has": false,
				"description": "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. \n The creature can't willingly move closer to the source of its fear."
			},
			{
				"name": "Grappled",
				"has": false,
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"name": "Incapacitated",
				"has": false,
				"description": "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n The condition ends if the grappler is incapacitated. \n The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
			},
			{
				"name": "Invisible",
				"has": false,
				"description": "An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves. \n Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
			},
			{
				"name": "Paralyzed",
				"has": false,
				"description": "A paralyzed creature is incapacitated and can't move or speak. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			},
			{
				"name": "Petrified",
				"has": false,
				"description": "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging. \n The creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n Attack rolls against the creature have advantage. \n The creature automatically fails Strength and Dexterity saving throws. \n The creature has resistance to all damage. \n The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
			},
			{
				"name": "Poisoned",
				"has": false,
				"description": "A poisoned creature has disadvantage on attack rolls and ability checks."
			},
			{
				"name": "Prone",
				"has": false,
				"description": "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition. \n The creature has disadvantage on attack rolls. \n An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
			},
			{
				"name": "Restrained",
				"has": false,
				"description": "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed. \n Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage. \n The creature has disadvantage on Dexterity saving throws."
			},
			{
				"name": "Stunned",
				"has": false,
				"description": "A stunned creature is incapacitated, can't move, and can speak only falteringly. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage."
			},
			{
				"name": "Unconscious",
				"has": false,
				"description": "An unconscious creature is incapacitated, can't move or speak, and is unaware of its surroundings. \n The creature drops whatever it's holding and falls prone. \n The creature automatically fails Strength and Dexterity saving throws. \n Attack rolls against the creature have advantage. \n Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
			}
		],
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
		"characters": {"names": [""], "id": [""], "status": "idle"},
		"importFromDbStatus": "idle",
		"addCharactertoDBStatus": "idle",
		"changeCharacterInDBStatus": "idle",
		"currentlyEditing": {"id": 0, "name": "None"},
		"lastSaved": "Never",
		"compareState": {},
		"autoSaveTimer": 15,
	}
}
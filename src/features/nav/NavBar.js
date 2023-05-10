import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit';

import "../styles.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

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

const importState = createAction(
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
	}
)

export const NavBar = () => {
	const currentState= useSelector(state => state)
	const dispatch = useDispatch()
    const charName= useSelector(state => state.charDetails.charName)

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

	const exportToJson = e => {
		e.preventDefault()
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
	
	const readFileOnUpload = (uploadedFile) => {
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

	const handleMaximize = () => {
		window.api.buttonInteraction("max")
	}
	
	return(
		<Navbar style={{backgroundColor:"#212529", padding:"0"}} variant="dark" className="titlebar">
		  <Container fluid className="draggable">
			<Navbar.Brand href="/">{document.title}</Navbar.Brand>
			<div className="controls">
				<form className="d-flex">
					<label  htmlFor="file-upload" className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em"}}>
						Import
					</label>
					<input id="file-upload" type="file" onChange={(e)=>readFileOnUpload(e.target.files[0])}></input>
					<button className="btn btn-outline-success" style={{padding:"0.25em 0.375em 0.25em 0.375em"}} type="submit" onClick={exportToJson}>Export</button>
					{ true ?
						<>
							<div onClick={() => window.api.buttonInteraction("min")} className="button2 minimize"><VscChromeMinimize size="2em" color="white"/></div>
							<div onClick={handleMaximize} className="button2 maximize"><VscChromeMaximize size="2em" color="white"/></div>
							<div onClick={() => window.api.buttonInteraction("close")} className="button2 close"><VscChromeClose size="2em" color="white"/></div>
						</>
					: null }
				</form>
			</div>
		  </Container>
		</Navbar>
	)
}
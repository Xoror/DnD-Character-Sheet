import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


import { ActionsTable } from './ActionsTable';
import { filterSpells } from './ActionsSlice';
import "../styles.css"

import { AiOutlineCloseCircle } from "react-icons/ai";

export const SpellList = (props) => {
	const dispatch = useDispatch()
	const sortedSpellList= useSelector(state => state.actions.sortedSpellList)
	const charClass = useSelector(state => state.charDetails.charClass)
	const [show, setShow] = useState(false);
	const [spellCardID, setSpellCardID] = useState("0")

	const handleClose = () => {
		setShow(false)
		//setFilters({spellslots: [], schools: [], ritual: [], classes: ["wizard"]})
	}
	const handleShow = () => {
		setShow(true)
	}
	
	const [filters, setFilters] = useState({spellslots: [], schools: [], ritual: [], classes: []})
	const [searchField, setSearchField] = useState("")
	const filterKeys = Object.keys(filters)
	const handleDelete = (event, index, type) => {
		var copy = structuredClone(filters)
		copy[type] = copy[type].slice(0,index).concat(copy[type].slice(index+1))
		setFilters(copy)
		dispatch(filterSpells([copy, searchField]))
	}
	
	let headers = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	return(
		<>
			<span style={{justifyContent:"end", textAlign:"right"}}> testing</span>
			<Button variant="primary" onClick={handleShow} className="md-2">
				Open Spell List 
			</Button>

			<Offcanvas border="dark" style={{color:"white", backgroundColor:"#6c757d", width:"40%"}} show={show} onHide={handleClose} placement="start" scroll="true">
				<Offcanvas.Header closeButton onCLick={handleClose}>
					<Offcanvas.Title>Spell List</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<FilterSelection filters={filters} searchField={searchField} setFilters={setFilters} setSearchField={setSearchField}/>
					<Container fluid className="filter-container">
						<span>Filters: </span>
						{filterKeys.map(key => (
							filters[key].map((filter, index) => (
								<FilterItem key={index} index={index} type={key} name={filter} handleDelete={handleDelete}/>
							))
						))}
					</Container>
					{headers.map((header, index) => (
						<ActionsTable 
							spellCardID={spellCardID}
							setSpellCardID={setSpellCardID} 
							offCanvas={true} 
							id={props.id} 
							key={index} 
							header={header} 
							searchField={searchField} 
							filters={filters} 
							bodies={sortedSpellList.filter((action) => {return action.type === header})} 
							spells="true"
						/>
					))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
/*
{headers.map((header, index) => (
	<ActionsTable 
		spellCardID={spellCardID}
		setSpellCardID={setSpellCardID} 
		offCanvas={true} 
		id={props.id} 
		key={index} 
		header={header} 
		searchField={searchField} 
		filters={filters} 
		bodies={sortedSpellList.filter((action) => {return action.type === header})} 
		spells="true"
	/>
))}
*/

export const FilterItem = (props) => {
	return (
		<div className="filter-body">
			{props.name} <AiOutlineCloseCircle type="button" color="black" size="20" id="delete-button" 
							onClick={(event) => props.handleDelete(event, props.index, props.type)} className="filter-delete-button"/>
		</div>
	)
}

const FilterSelection = (props) => {
	const dispatch = useDispatch()
	var defaultValue = ""
	const handleAdd = (event, type) => {
		var copy = structuredClone(props.filters)
		var search = ""
		if(type != "search") {
			copy[type].push(event.target.value)
			props.setFilters(copy)
		}
		else if(type === "search") {
			search = event.target.value
		}
		dispatch(filterSpells([copy, search]))
	}
	const slotList = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	const classList = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"]
	const schoolList = ["Abjuration", "Conjuration", "Divination", "Enchantment","Evocation", "Illusion", "Necromancy", "Transmutation"]
	return (
		<>
			<Form.Control placeholder="Search" type="search" onChange={(e) => (props.setSearchField(e.target.value), handleAdd(e, "search"))}></Form.Control>
			<InputGroup>
			<Form.Select value={defaultValue} aria-label="Choose spell school" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "schools"))}>
					<option value="">Filter schools</option>
					{schoolList.map((class1, index) => (
						props.filters.schools.filter(item => item === class1).length === 0 ? <option key={index} value={class1}>{class1}</option> : ""
					))}
				</Form.Select>
				<Form.Select value={defaultValue} aria-label="Choose class" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "classes"))}>
					<option value="">Filter classes</option>
					{classList.map((class1, index) => (
						props.filters.classes.filter(item => item === class1).length === 0 ? <option key={index} value={class1}>{class1}</option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<Form.Select value={defaultValue} aria-label="Choose spell slot" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "spellslots"))}>
					<option value="">Filter spell tier</option>
					{slotList.map((slot, index) => (
						props.filters.spellslots.filter(item => item === slot).length === 0 ? <option key={index} value={slot}>{slot}</option> : ""
					))}
				</Form.Select>
				<Form.Select value={defaultValue} aria-label="Is spell Ritual" onChange={(e) => (defaultValue = e.target.value, handleAdd(e, "ritual"))}>
					<option value=""> Is spell ritual? </option>
					{props.filters.ritual.filter(is => is === "ritual").length === 0 ? <option value="ritual" > Is ritual spell </option> : "" }
					{props.filters.ritual.filter(is => is === "not ritual").length === 0 ? <option value="not ritual"> Is not ritual spell</option> : "" }
				</Form.Select>
			</InputGroup>
		</>
	)
}
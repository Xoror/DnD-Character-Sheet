import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


import { ActionsTable } from './ActionsTable';
import { filterSpells } from './ActionsSlice';

import { AiOutlineCloseCircle } from "react-icons/ai";

export const SpellList = (props) => {
	const dispatch = useDispatch()

	const inheritShow = props.inheritShow
	const setInheritShow = props.setInheritShow

	const sortedSpellList= useSelector(state => state.actions.sortedSpellList)
	const [show, setShow] = useState(false);
	const [spellCardID, setSpellCardID] = useState("0")

	const handleClose = () => {
		setShow(false)
		dispatch(filterSpells([{spellslots: [], schools: [], ritual: [], classes: []}, ""]))
		setInheritShow(!inheritShow)
	}
	const handleShow = () => {
		setShow(true)
	}
	useEffect(() => {
		if(inheritShow) {
			handleShow()
		}
	}, [inheritShow])
	
	const [filters, setFilters] = useState({spellslots: [], schools: [], ritual: [], classes: []})
	const [searchField, setSearchField] = useState("")
	const filterKeys = Object.keys(filters)
	const handleDelete = (event, index, type) => {
		let copy = structuredClone(filters)
		copy[type] = copy[type].slice(0,index).concat(copy[type].slice(index+1))
		setFilters(copy)
		dispatch(filterSpells([copy, searchField]))
	}
	
	let headers = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	return(
		<>
			<Offcanvas border="dark" style={{color:"white", backgroundColor:"#6c757d", width:"40%"}} show={show} onHide={handleClose} placement="start" scroll="true">
				<Offcanvas.Header closeButton onClick={handleClose}>
					<Offcanvas.Title>Spell List</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<FilterSelection filters={filters} searchField={searchField} setFilters={setFilters} setSearchField={setSearchField}/>
					<Container fluid className="filter-container">
						<span>Filters: </span>
						{filterKeys.map(key => (
							filters[key].map((filter, index) => (
								<FilterItem key={`filter-item-${filter}`} index={index} type={key} name={filter} handleDelete={handleDelete}/>
							))
						))}
					</Container>
					{headers.map((header, index) => (
						<ActionsTable 
							cardID={spellCardID}
							setCardID={setSpellCardID} 
							offCanvas={true} 
							id={props.id} 
							key={`action-table-${header}`} 
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
	let defaultValue = ""
	const handleAdd = (event, type) => {
		if(type === "search") {
			props.setSearchField(event.target.value)
		}
		else {
			defaultValue = event.target.value
		}
		let copy = structuredClone(props.filters)
		let search = ""
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
			<Form.Control placeholder="Search" type="search" onChange={(e) => (handleAdd(e, "search"))}></Form.Control>
			<InputGroup>
				<Form.Select value={defaultValue} aria-label="Choose spell school" onChange={(e) => (handleAdd(e, "schools"))}>
					<option value="">Filter schools</option>
					{schoolList.map((class1, index) => (
						props.filters.schools.filter(item => item === class1).length === 0 ? <option key={`filter-option-school-${class1}`} value={class1}>{class1}</option> : ""
					))}
				</Form.Select>
				<Form.Select value={defaultValue} aria-label="Choose class" onChange={(e) => (handleAdd(e, "classes"))}>
					<option value="">Filter classes</option>
					{classList.map((class1, index) => (
						props.filters.classes.filter(item => item === class1).length === 0 ? <option key={`filter-option-class-${class1}`} value={class1}>{class1}</option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<Form.Select value={defaultValue} aria-label="Choose spell slot" onChange={(e) => ( handleAdd(e, "spellslots"))}>
					<option value="">Filter spell tier</option>
					{slotList.map((slot, index) => (
						props.filters.spellslots.filter(item => item === slot).length === 0 ? <option key={`filter-option-level-${slot}`} value={slot}>{slot}</option> : ""
					))}
				</Form.Select>
				<Form.Select value={defaultValue} aria-label="Is spell Ritual" onChange={(e) => (handleAdd(e, "ritual"))}>
					<option value=""> Is spell ritual? </option>
					{props.filters.ritual.filter(is => is === "ritual").length === 0 ? <option value="ritual" > Is ritual spell </option> : "" }
					{props.filters.ritual.filter(is => is === "not ritual").length === 0 ? <option value="not ritual"> Is not ritual spell</option> : "" }
				</Form.Select>
			</InputGroup>
		</>
	)
}
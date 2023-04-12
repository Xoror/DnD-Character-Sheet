import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';

import "../styles.css"

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteAction } from './ActionsSlice';
import { setPrepared } from './ActionsSlice';
import { SpellCard } from '../../components/SpellCard';

export const ActionsTable = (props) => {
	const dispatch = useDispatch()
	const charAttributes = useSelector(state => state.attributes.charAttributes)
	const proficiency = useSelector(state => state.attributes.proficiency)
	const scalingBonus = (scale) => {
		if(scale === "None") {
			return ""
		}
		else {
			return charAttributes.filter((charAttribute) => scale === charAttribute.name)[0].bonus
		}
	}
	const handleDelete = (event, type, index) => {
		dispatch(deleteAction(type, index, props.id))
	}
	const handlePrepared = (event) => {
		let id = event.target.id
		let checked = event.target.checked
		let offCanvas = props.offCanvas
		dispatch(setPrepared(id, checked, offCanvas))
	}
	const startEdit = (event, body) => {
		props.passState(body)
		props.setOldData(body)
		props.setEditing(true)
	}

	const checkFilters = (body, search) => {
		if(props.offCanvas) {
			console.log("build")
			var test1
			var test2
			var test3
			var test4 = false
			// Testing spell tier and school
			if(props.filters.spellslots.length != 0 && props.filters.schools.length != 0) {
				test1 = props.filters.spellslots.find(spellslot => (spellslot === body.type)) ? true : false
				test2 = props.filters.schools.find(school => (school === body.school)) ? true : false
			}
			else if(props.filters.spellslots.length === 0 && props.filters.schools.length != 0) {
				test1 = true
				test2 = props.filters.schools.find(school => (school === body.school)) ? true : false
			}
			else if(props.filters.spellslots.length != 0 && props.filters.schools.length === 0) {
				test1 = props.filters.spellslots.find(spellslot => (spellslot === body.type)) ? true : false
				test2 = true
			}
			else if(props.filters.spellslots.length === 0 && props.filters.schools.length === 0) {
				test1 = true
				test2 = true
			}
			// testing search
			if(search != "") {
				test3 = body.name.toLowerCase().includes(search.toLowerCase())
			}
			else {
				test3 = true
			}
			// testing class
			if(props.filters.classes.length != 0) {
				props.filters.classes.map(class1 => (
					body.classes.filter(class2 => (class2 === class1)).length === 0 ? null : test4 = true
				))
			} else {
				test4 = true
			}
			return (test1 && test2 && test3 && test4)
		}
		else {
			return true
		}
	}
	
	return (
		<div key={props.index} style={{marginLeft:"8px", marginRight:"8px"}}>
			<h5> {props.header} {props.spells ? (props.header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}} >
				<thead>
					<tr>
						{props.spells ? <td></td> : ""}
						<td> Name </td>
						{props.spells ? "" : <td> Hit </td>}
						{props.offCanvas ? "" : <td> Damage (Type) </td>}
						<td> Range </td>
						{props.offCanvas ? "" : <td> </td>}
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						checkFilters(body, props.searchField) ?
							<tr key={``}> 
								{props.spells ? 
									<td className="prepared-check" style={{height:"1.5em", width:"1.5em"}}>
										<input type="checkbox" id={body.name} value="prepared"  onChange={handlePrepared} checked={body.isPrepared}></input>
									</td> : ""}
								<td id="spellcard-trigger">{body.name}<SpellCard/></td>
								{props.spells ? "" : <td>{body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)} </td>}
								{props.offCanvas ? "" : (props.spells ? <td>{body.damage ? body.damage : "N/A"} ({body.damageType ? body.damageType : "N/A"}) </td> : <td>{body.damage} + {scalingBonus(body.scaling)} ({body.damageType}) </td>)}
								<td>{body.range}</td>
								{props.offCanvas ? "" : <td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end"}}> 
									<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" />
									<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, props.header, index)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/> 
								</td>}
							</tr>
						: "" ))
					}
				</tbody>
			</Table>
		</div>
	)
}
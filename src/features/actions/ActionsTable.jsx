import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from 'react-bootstrap/Table';
import { usePopper } from 'react-popper';

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore } from "react-icons/md/";

import { deleteAction, setPrepared } from './ActionsSlice';
import { SpellCard } from '../../components/SpellCard';
import { ActionCard } from '../../components/ActionCard';
import { DiceRollButton } from '../../components/DiceRollButton';
import { addRoll } from '../settings/SettingsSlice';

export const ActionsTable = (props) => {
	const dispatch = useDispatch()
	const [currentBody, setCurrentBody] = useState("")
	const charAttributes = useSelector(state => state.attributes.charAttributes)
	const spellCastingAttribute = useSelector(state => state.attributes.casting.spellAttribute)
	const proficiency = useSelector(state => state.attributes.proficiency)
	const charLevel = useSelector(state => state.charDetails.charLevel)

	const scalingBonus = (scale) => {
		if(scale === "None" || scale === "") {
			return ""
		}
		else {
			return charAttributes.filter((charAttribute) => scale === charAttribute.name)[0].bonus
		}
	}
	const handleDelete = (event, id, index) => {
		event.stopPropagation()
		dispatch(deleteAction(id, props.id))
	}
	const handlePrepared = (event) => {
		event.stopPropagation()
		let id = event.target.id
		let checked = event.target.checked
		let offCanvas = props.offCanvas
		dispatch(setPrepared(id, checked, offCanvas))
	}
	const startEdit = (event, body) => {
		event.stopPropagation()
		props.setDefaultValues(body)
		props.setOldData(body)
		props.setEditing(true)
		props.setShowQuickAddAction(true)
		props.setInputFocus()
		props.inputRef.current.scrollIntoView()
	}
	let place = props.offCanvas ? "left" : "right"
	const [showDetails, setShowDetails] = useState([false, "bla"])

	const handleRowClick = (event, id) => {
		setCurrentBody(props.bodies.find((body, index) => (body.id === id)))

		if(showDetails[0] && showDetails[1] === id) {
			setShowDetails([false, "bla"])
		}
		else {
			setShowDetails([true, id])
		}
	}

	//const ref = useOutsideClick(handleRowClick)
	const convertTemplate =(damageAtHigherLevel, id, damage) => {
		let keys
		let object = []
		let singleValue = 1
		if(id === "dmgHigherLevel") {
			if(damageAtHigherLevel === "None") {
				object.push({value: damage, label:"1"})
				return object
			}
			else {
				keys = Object.keys(damageAtHigherLevel)
				for(let key of keys) {
					object.push({value: damageAtHigherLevel[key], label: key})
				}
				return object
			}
		}
		else if(id === "cantrip") {
			keys = Object.keys(damageAtHigherLevel)
			singleValue = damageAtHigherLevel[keys[0]]
			for(let i=1; i<keys.length; i++) {
				if( charLevel < parseInt(keys[i])) {
					singleValue = damageAtHigherLevel[keys[i-1]]
					break
				}
			}
			if(charLevel >= parseInt(keys[keys.length -1])) {
				singleValue = damageAtHigherLevel[keys[keys.length -1]]
			}
			return singleValue
		}
		else {
			return object
		}
	}
	const handleRoll = (event, name, defaultValue, rolls, bonus, result) => {
		dispatch(addRoll([name, defaultValue, rolls, bonus, result]))
	}
	
	return (
		<div  key={props.index} style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
			<h5> {props.header} {props.spells ? (props.header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}} >
				<thead>
					<tr>
						{props.spells ? <th>{props.offCanvas ? "Learn" : ""}</th> : null}
						<th> Name </th>
						{props.spells ? null : <th> Hit </th>}
						{props.offCanvas ? null : <th> Damage (Type) </th>}
						{props.offCanvas ? <th> School </th> : <th> Range </th>}
						{props.offCanvas ? null : <th> {""} </th>}
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						(props.offCanvas ? filterFunction(body, props.filters, props.searchField) : true) ?
							<React.Fragment key={`${props.offCanvas}-action-table-row-id-${body.id}`}>
								<tr className="action-table" id={`${props.offCanvas}-action-table-row-id-${body.id}`} onClick={(event) => handleRowClick(event, body.id)} >
									{props.spells ? 
										<td  style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
											<div className={`checkbox-wrapper`}>
												<input className={`${props.offCanvas ? "letter-k" : "letter-p"}`} type="checkbox" id={body.name} value="prepared" onClick={handlePrepared} defaultChecked={body.isPrepared}></input>
											</div>
										</td> : ""
									}
									<td>{body.name}</td>
									{props.spells ? "" : <td>{ body.damage != "None" && body.damage != "none" ? (body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)) : "-" } </td>}
									{props.offCanvas ? "" : (props.spells ? 
										<td> 
											{ !(props.header === "Cantrip") ?
												<div style={{display:"flex", flexWrap:"wrap"}}> {body.damage != "None" ?  
													<DiceRollButton passData={handleRoll} name={`${body.name}`} options={convertTemplate(body.damageAtHigherLevel, "dmgHigherLevel", body.damage)} spellBonus={scalingBonus(spellCastingAttribute)} /> : body.damage} {body.damageType != "None" ? "(" + body.damageType + ")" : ""} 
												</div> :
												<div style={{display:"flex", flexWrap:"wrap"}}> {body.damage != "None" ?  
													<DiceRollButton passData={handleRoll} name={`${body.name}`}  noDice={true} noOptions={true} singleValue={convertTemplate(body.damageAtHigherLevel, "cantrip")}/> : body.damage}
												{body.damageType != "None" ? "(" + body.damageType + ")" : ""} 
											</div> 
											}
										</td> : 
										<td> 
											<div style={{display:"flex", flexWrap:"wrap"}}> 
												<DiceRollButton passData={handleRoll} name={`${body.name}`} noDice={true} noOptions={true} singleValue={body.damage} bonus={scalingBonus(body.scaling)}/>
												({body.damageType}) 
											</div> 
										</td>)
									}
									{props.offCanvas ? <td>{body.school}</td> : <td>{body.range}</td> }
									{props.offCanvas ? "" : 
									<td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end", zIndex:"2", height:"2.25em", width:"4.5em"}}>
										<button className="react-icons-button edit" onClick={(event) => startEdit(event, body)} aria-label={`edit ${props.spells ? "spell":"action"}`}>
											<RiFileEditFill size="1.5em" className="edit-button" />
										</button>
										<button className="react-icons-button delete" onClick={(event) => handleDelete(event, body.id, index)} aria-label={`delete ${props.spells ? "spell":"action"}`}>
											<AiFillCloseSquare size="1.5em" className="delete-button" /> 
										</button>
										{showDetails[0] && showDetails[1] === body.id ?
											<button className="react-icons-button" onClick={(event) => setShowDetails([false, "bla"])} aria-label={`expand ${props.spells ? "spell":"action"} details`}>
												<MdExpandLess size="1.5em" className="expand-button" /> 
											</button> :
											<button className="react-icons-button" onClick={(event) => setShowDetails([true, body.id])} aria-label={`expand ${props.spells ? "spell":"action"} details`}>
												<MdExpandMore size="1.5em" className="expand-button" /> 
											</button>
										}
									</td>
									}
								</tr>
								{showDetails[0] && showDetails[1] === body.id ?
									<tr key={`spell-details-id-${body.id}`}>
										{props.spells ? 
											<td style={{borderRight:"1px solid rgba(1,1,1,0.5)", borderLeft:"1px solid rgba(1,1,1,0.5)"}} colSpan={5}>
												<SpellCard id={`spellcard-${currentBody.id}`} offCanvas={props.offCanvas} data={currentBody}/>
											</td> :
											<td style={{borderRight:"1px solid rgba(1,1,1,0.5)", borderLeft:"1px solid rgba(1,1,1,0.5)"}} colSpan={5}>
												<ActionCard id ={`actioncard-${currentBody.id}`} data={currentBody}/>
											</td>
										}
									</tr> : null
								}
							</React.Fragment>
						: null ))
					}
				</tbody>
			</Table>
		</div>
	)
}

const filterFunction = (body, filters, searchField) => {
	let filterSearchField = searchField === "" ? true : body.name.toLowerCase().includes(searchField.toLowerCase())
	let filterSpellSlot = filters.spellslots.length === 0 ? true : (filters.spellslots.find(spellslot => (spellslot === body.type)) ? true : false)
	let filterSpellSchool = filters.schools.length === 0 ? true : (filters.schools.find(school => (school === body.school)) ? true : false)

	let filterSpellClass = false
	if(filters.classes.length != 0) {
		for(let filterClass of filters.classes) {
			for(let bodyClass of body.classes) {
				if(filterClass === bodyClass.name) {
					filterSpellClass = true
				}
			}
		}
	} else {
		filterSpellClass = true
	}
	
	let filterSpellRitual = false
	if(filters.ritual.length != 0) {
		if(filters.ritual.length == 1) {
			let test
			if(body.ritual) {
				test = "ritual"
			}
			else {
				test="not ritual"
			}
			filterSpellRitual = filters.ritual.find(ritual => (ritual === test)) ? true:false
		}
	}
	else {
		filterSpellRitual = true
	}
	
	return filterSearchField && filterSpellSlot && filterSpellSchool && filterSpellClass && filterSpellRitual

}
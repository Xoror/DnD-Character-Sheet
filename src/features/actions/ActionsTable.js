import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from 'react-bootstrap/Table';
import { usePopper } from 'react-popper';

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteAction, setPrepared, updateSpellCardShow } from './ActionsSlice';
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
	let cardID = props.cardID
	const [showPopover, setShowPopover] = useState([false,cardID])
	useEffect(() => {
		if(showPopover[1] != cardID) {
			setShowPopover([showPopover[0], cardID])
		}
	}, [showPopover, cardID])
	const handleRowClick = (event, id) => {
		setCurrentBody(props.bodies.find((body, index) => (body.id === id)))
		let test
		cardID = props.cardID
		test = `${props.offCanvas}-action-table-row-id-${id}`
		setReferenceElement(document.getElementById(test))
		props.setCardID(id)
		cardID = id
		
		//dispatch(updateSpellCardShow([id, props.offCanvas]))
		if(showPopover[1] === id) {
			setShowPopover([!showPopover[0], id])
		}
		else {
			if(showPopover[0]) {
				setShowPopover([showPopover[0], id])
				props.setCardID(id)
			}
			else {
				setShowPopover([!showPopover[0], id])
			}
		}
	}
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [arrowElement, setArrowElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: place,
    	modifiers: [{ name: 'arrow', options: { element: arrowElement } },
					{ name: "offset", options: { offset: [ 0,10]} }],
  	});
	//const ref = useOutsideClick(handleRowClick)
	const convertTemplate =(damageAtHigherLevel, id) => {
		let keys
		let object = []
		let singleValue = 1
		if(id === "dmgHigherLevel") {
			keys = Object.keys(damageAtHigherLevel)
			for(let key of keys) {
				object.push({value: damageAtHigherLevel[key], label: key})
			}
			return object
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
			{ false && showPopover[0] && showPopover[1] === currentBody.id && cardID === currentBody.id ?
				<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
					{props.spells ? 
						<SpellCard id={`spellcard-${currentBody.id}`} offCanvas={props.offCanvas} data={currentBody}/> :
						<ActionCard id ={`actioncard-${currentBody.id}`} data={currentBody}/>
					}
					<span
						ref={setArrowElement}
						style={styles.arrow}
						{...attributes.arrow}
						className={`arrow arrow-${place}`}
					/>
				</div> : null
			}
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
						(props.offCanvas ? body.filtered : true) ?
							<>
								<tr className="action-table" key={`${props.offCanvas}-action-table-row-id-${body.id}`} id={`${props.offCanvas}-action-table-row-id-${body.id}`} onBlur={event => setShowPopover([false, body.id])} onClick={(event) => handleRowClick(event, body.id)} >
									{props.spells ? 
										<td  style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
											<div className={`checkbox-wrapper ${props.offCanvas ? "letter-k" : "letter-p"}`}>
												<input type="checkbox" id={body.name} value="prepared" onClick={handlePrepared} defaultChecked={body.isPrepared}></input>
											</div>
										</td> : ""
									}
									<>
										<td>{body.name}</td>
										{props.spells ? "" : <td>{ body.damage != "None" && body.damage != "none" ? (body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)) : "-" } </td>}
										{props.offCanvas ? "" : (props.spells ? 
											<td> 
												{ !(props.header === "Cantrip") ?
													<div style={{display:"flex", flexWrap:"wrap"}}> {body.damage != "None" ?  
														<DiceRollButton passData={handleRoll} name={`${body.name}`} options={convertTemplate(body.damageAtHigherLevel, "dmgHigherLevel")} spellBonus={scalingBonus(spellCastingAttribute)} /> : body.damage} {body.damageType != "None" ? "(" + body.damageType + ")" : ""} 
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
										<td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end", zIndex:"2", height:"2.25em", width:"3em"}}>
											<button className="react-icons-button" onClick={(event) => startEdit(event, body)} aria-label={`edit ${props.spells ? "spell":"action"}`}>
												<RiFileEditFill size="1.5em" className="edit-button" />
											</button>
											<button className="react-icons-button" onClick={(event) => handleDelete(event, body.id, index)} aria-label={`delete ${props.spells ? "spell":"action"}`}>
												<AiFillCloseSquare size="1.5em" className="delete-button" /> 
											</button>
										</td>
										}
									</>
								</tr>
								{showPopover[0] && showPopover[1] === body.id && cardID === body.id ?
									<tr>
										{props.spells ? 
											<td colSpan={5}>
												<SpellCard id={`spellcard-${currentBody.id}`} offCanvas={props.offCanvas} data={currentBody}/>
											</td> :
											<td colSpan={5}>
												<ActionCard id ={`actioncard-${currentBody.id}`} data={currentBody}/>
											</td>
										}
									</tr> : null
								}
							</>
						: "" ))
					}
				</tbody>
			</Table>
		</div>
	)
}
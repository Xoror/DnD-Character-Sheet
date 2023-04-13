import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from 'react-bootstrap/Table';
import { usePopper } from 'react-popper';

import "../styles.css"

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteAction } from './ActionsSlice';
import { setPrepared } from './ActionsSlice';
import { SpellCard } from '../../components/SpellCard';
import { updateSpellCardShow } from './ActionsSlice';
import { reference } from '@popperjs/core';


export const ActionsTable = (props) => {
	const dispatch = useDispatch()
	const charAttributes = useSelector(state => state.attributes.charAttributes)
	const proficiency = useSelector(state => state.attributes.proficiency)
	const spells = useSelector(state => state.actions.spells)
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
	/*
	const [showSpellCard, setShowSpellCard] = useState(false)
	const [show, setShow] = useState(false);
  	const target = useRef(null);
	
	const useOutsideClick = (callback) => {
		const ref = useRef();
		useEffect(() => {
		  const handleClick = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
			  callback();
			}
		  }
	  
		  document.addEventListener('click', handleClick);
	  
		  return () => {
			document.removeEventListener('click', handleClick);
		  };
		}, [ref])
	  
		return ref
	}
	*/
	let place = props.offCanvas ? "left" : "right"
	const [showPopover, setShowPopover] = useState([])
	const handleRowClick = (event, id, index) => {
		
		let test = `${props.offCanvas}-action-table-row-${index}`
		setReferenceElement(document.getElementById(test))
		dispatch(updateSpellCardShow([id, props.offCanvas]))
		if(showPopover[1] === index) {
			setShowPopover([!showPopover[0], index])
		}
		else {
			if(showPopover[0]) {
				setShowPopover([showPopover[0], index])
			}
			else {
				setShowPopover([!showPopover[0], index])
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
	return (
		<div key={props.index} style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
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
						(props.offCanvas ? body.filtered :true) ?
							<tr className="action-table" key={`action-table-row-${index}`} id={`${props.offCanvas}-action-table-row-${index}`} onClick={(event) => handleRowClick(event, body.id, index)}>
								{props.spells ? 
									<td className="prepared-check" style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
										<input type="checkbox" id={body.name} value="prepared" onChange={handlePrepared} checked={body.isPrepared}></input>
									</td> : ""}
								<td>
									{body.name}
									{props.spells && showPopover[0] && showPopover[1] === index ?
									<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
										<SpellCard id={`spellcard-${index}`} data={body}/>
										<span
											ref={setArrowElement}
											style={styles.arrow}
											{...attributes.arrow}
											className={`arrow arrow-${place}`}
										/>
									</div> : null}
								</td>
								{props.spells ? "" : <td>{body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)} </td>}
								{props.offCanvas ? "" : (props.spells ? <td>{body.damage != "" ? body.damage : "N/A"} ({body.damageType != "" ? body.damageType : "N/A"}) </td> : <td>{body.damage} + {scalingBonus(body.scaling)} ({body.damageType}) </td>)}
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
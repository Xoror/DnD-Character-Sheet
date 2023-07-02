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
import { ActionCard } from '../../components/ActionCard';
import { updateSpellCardShow } from './ActionsSlice';


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
		event.stopPropagation()
		dispatch(deleteAction(type, index, props.id))
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
	let cardID = props.cardID
	const [showPopover, setShowPopover] = useState([false,cardID])
	useEffect(() => {
		if(showPopover[1] != cardID) {
			setShowPopover([showPopover[0], cardID])
		}
	}, [showPopover, cardID])
	const handleRowClick = (event, id) => {
		let test
		cardID = props.cardID
		/*
		if(showPopover=== "0") {
			setShowPopover([showPopover[0], id])
		}
		*/
		test = `${props.offCanvas}-action-table-row-id-${id}`
		setReferenceElement(document.getElementById(test))
		props.setCardID(id)
		cardID = id
		
		dispatch(updateSpellCardShow([id, props.offCanvas]))
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

	return (
		<div key={props.index} style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
			<h5> {props.header} {props.spells ? (props.header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}} >
				<thead>
					<tr>
						{props.spells ? <td>{props.offCanvas ? "Learn" : ""}</td> : ""}
						<td> Name </td>
						{props.spells ? "" : <td> Hit </td>}
						{props.offCanvas ? "" : <td> Damage (Type) </td>}
						{props.offCanvas ? <td> School </td> : <td> Range </td>}
						{props.offCanvas ? "" : <td> </td>}
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						(props.offCanvas ? body.filtered : true) ?
							<tr className="action-table" key={`${props.offCanvas}-action-table-row-id-${body.id}`} id={`${props.offCanvas}-action-table-row-id-${body.id}`} onClick={(event) => handleRowClick(event, body.id)} >
								{props.spells ? 
									<td  style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
										<div className="checkbox-wrapper letter-k">
											<input type="checkbox" id={body.name} value="prepared" onClick={handlePrepared} defaultChecked={body.isPrepared}></input>
										</div>
									</td> : ""
								}
								<>
									<td>
										{body.name}
										{ showPopover[0] && showPopover[1] === body.id && cardID === body.id ?
										<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
											{props.spells ? 
												<SpellCard id={`spellcard-${body.id}`} offCanvas={props.offCanvas} data={body}/> :
												<ActionCard id ={`actioncard-${body.id}`} data={body}/>
											}
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
									{props.offCanvas ? <td>{body.school}</td> : <td>{body.range}</td> }
									{props.offCanvas ? "" : 
									<td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end", zIndex:"2" }}> 
										<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" />
										<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, props.header, index)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/> 
									</td>
									}
								</>
							</tr>
						: "" ))
					}
				</tbody>
			</Table>
		</div>
	)
}
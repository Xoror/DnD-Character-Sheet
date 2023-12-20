import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from '../BootstrapReplace/Table';
import { usePopper } from 'react-popper';


import { AiFillCloseSquare } from "@react-icons/all-files/ai/AiFillCloseSquare";
import { RiFileEditFill } from "@react-icons/all-files/ri/RiFileEditFill";

import { deleteAction, setPrepared } from './ActionsSlice';
import { SpellCard } from '../../components/SpellCard';
import { ActionCard } from '../../components/ActionCard';

export const CardTable = (props) => {
    let cardID = props.cardID
    const setCardID = props.setCardID
    const setOldData = props.setOldData
    const setEditing = props.setEditing
    const setDefaultValues = props.setDefaultValues
    const offCanvas = props.offCanvas
    const id = props.id
    const header = props.header
    const bodies = props.bodies

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
		dispatch(deleteAction(type, index, id))
	}
	const handlePrepared = (event) => {
		let id = event.target.id
		let checked = event.target.checked
		dispatch(setPrepared(id, checked, offCanvas))
	}
	const startEdit = (event, body) => {
		setDefaultValues(body)
		setOldData(body)
		setEditing(true)
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

	let place = offCanvas ? "left" : "right"
	const [showPopover, setShowPopover] = useState([false,cardID])
	useEffect(() => {
		if(showPopover[1] != cardID) {
			setShowPopover([showPopover[0], cardID])
		}
	}, [showPopover, cardID])
	const handleRowClick = (event, id) => {
		let test = `${offCanvas}-action-table-row-id-${id}`
		setReferenceElement(document.getElementById(test))
		setCardID(id)
		cardID = id
		
		if(showPopover[1] === id) {
			setShowPopover([!showPopover[0], id])
		}
		else {

			if(showPopover[0]) {
				setShowPopover([showPopover[0], id])
				setCardID(id)
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
			<h5> {header} {id ? (header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}} >
				<thead>
					<tr>
						{id ? <td>{offCanvas ? "Learn" : ""}</td> : ""}
						<td> Name </td>
						{id ? "" : <td> Hit </td>}
						{offCanvas ? "" : <td> Damage (Type) </td>}
						{offCanvas ? <td> School </td> : <td> Range </td>}
						{offCanvas ? "" : <td> </td>}
					</tr>
				</thead>
				<tbody>
					{bodies.map( (body, index) => (
						(offCanvas ? body.filtered : true) ?
							<tr className="action-table" key={`${offCanvas}-action-table-row-id-${body.id}`} id={`${offCanvas}-action-table-row-id-${body.id}`} onClick={(event) => handleRowClick(event, body.id)} >
								{id ? 
									<td  style={{height:"1.5em", width:"1.5em", zIndex:"2"}}>
										<div className="checkbox-wrapper">
											<input className="letter-k" type="checkbox" id={body.name} value="prepared" onChange={handlePrepared} checked={body.isPrepared}></input>
										</div>
									</td> : ""
								}
								<>
									<td>
										{body.name}
										{showPopover[0] && showPopover[1] === body.id && cardID === body.id ?
										<div className="popover-test" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
											{id ? 
												<SpellCard id={`spellcard-${body.id}`} offCanvas={offCanvas} data={body}/> :
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
									{id ? "" : <td>{body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)} </td>}
									{offCanvas ? "" : (id ? <td>{body.damage != "" ? body.damage : "N/A"} ({body.damageType != "" ? body.damageType : "N/A"}) </td> : <td>{body.damage} + {scalingBonus(body.scaling)} ({body.damageType}) </td>)}
									{offCanvas ? <td>{body.school}</td> : <td>{body.range}</td> }
									{offCanvas ? "" : <td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end"}}> 
										<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" />
										<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, header, index)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/> 
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
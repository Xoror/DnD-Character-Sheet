import React, { useContext} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from 'react-bootstrap/Table';

import "../styles.css"

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteAction } from './ActionsSlice';
import { setPrepared } from './ActionsSlice';

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
	return (
		<div key={props.index} style={{marginLeft:"8px", marginRight:"8px"}}>
			<h5> {props.header} {props.spells ? (props.header === "Cantrip" ? "": "Level") :""} </h5>
			<Table size="sm" style={{color:"white", border:"black"}}>
				<thead>
					<tr>
						{props.spells ? <td></td> : ""}
						<td> Name </td>
						{props.spells ? "" : <td> Hit </td>}
						{props.spells ? "" : <td> Damage </td>}
						<td> Range </td>
						<td> </td>
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						<tr key={index}>
							{props.spells ? 
								<td className="prepared-check" style={{height:"1.5em", width:"1.5em"}}> 
									<input type="checkbox" id={body.name} value="prepared"  onChange={handlePrepared} checked={body.isPrepared}></input>
								</td> : ""}
							<td>{body.name}</td>
							{props.spells ? "" : <td>{body.isProficient ? proficiency.value + scalingBonus(body.scaling) : 0 + scalingBonus(body.scaling)} </td>}
							{props.spells ? "" : <td>{body.damage} + {scalingBonus(body.scaling)} ({body.damageType}) </td>}
							<td>{body.range}</td>
							<td style={{paddingRight:"0",paddingLeft:"0", justifyItems:"end"}}> 
								<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" />
								<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, props.header, index)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/> 
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
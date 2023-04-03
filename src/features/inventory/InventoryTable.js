import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Table from 'react-bootstrap/Table';

import "../styles.css"

import { AiFillCloseSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";

import { deleteItem, equipItem } from './InventorySlice';

export const InventoryTable = (props) => {
    const dispatch = useDispatch()
	const charAttributes = useSelector(state => state.attributes.charAttributes)
	const proficiency = useSelector(state => state.attributes.proficiency)
	
	const handleDelete = (event, type, index) => {
		dispatch(deleteItem(type, index))
	}
	const startEdit = (event, body) => {
		props.setDefaultValues(body)
		props.setOldData(body)
		props.setEditing(true)
	}
	const handleEquipped = (event, body) => {
        let checked = event.target.checked
		dispatch(equipItem(body, checked))
	}

	return (
		<div key={props.index} style={{marginLeft:"8px", marginRight:"8px"}}>
			<h5> {props.header} </h5>
			<Table size="sm" style={{color:"white", border:"black", textAlign:"right", alignVertical:"middle"}}>
				<thead>
					<tr>
						<td></td>
						<td> Name </td>
						<td> Qty </td>
						<td> Weight </td>
						<td> Worth </td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{props.bodies.map( (body, index) => (
						<tr key={index}>
							<td className="prepared-check" style={{height:"1.5em", width:"1.5em"}}> 
								<input type="checkbox" id={body.name} value="prepared"  onChange={(event) => handleEquipped(event, body)} checked={body.isEquipped}></input>
							</td>
							<td> {body.name} </td>
							<td> {body.qty} </td>
							<td> {body.weight} </td>
							<td> {body.worth} </td>
							<td style={{ alignItems:"center" }}>
								<div style={{float:"right", marginTop:"2.5px"}}>
									<RiFileEditFill type="button" color="black" size="23" id="edit-button" onClick={(event) => startEdit(event, body)} className="edit-button" /> 
									<AiFillCloseSquare type="button" color="#dc3545" size="23" id="delete-button" onClick={(event) => handleDelete(event, body.type, index)} className="edit-button" style={{backgroundColor:"white", padding:"0px"}}/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux"

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { editResource, deleteResource } from './ResourcesSlice';

export const ResourceBox = (props) => {
	const dispatch = useDispatch()
	const [validator, setValidator] = useState(false)

	const changeResource = (event) => {
		if(event.target.name === "dice") {
			console.log(event.target.value[0])
		}
		dispatch(editResource([event.target.name, event.target.value, event.target.id]))
	}
	const delResource = () => {
		dispatch(deleteResource(props.id))
	}

	const popoverCurrent = (
		<Tooltip id="dice-popover">
			<label id="resource-current-label"> Current {props.resource.name} </label>
		</Tooltip>
	)
	const popoverDice = (
		<Tooltip id="dice-popover">
			<label id="resource-dice-box-label"> Dice: </label> Must have the format like "d20" or "d8" so the letter "d" and a number appended
		</Tooltip>
	)
	const popoverMaximum = (
		<Tooltip id="dice-popover">
			<label id="resource-maximum-label"> Maximum {props.resource.name} </label>
		</Tooltip>
	)

	return (
		<div key={props.id} className="resourceBox">
			<InputGroup>
				<InputGroup.Text  style={{width:"50%"}}>{props.resource.name}</InputGroup.Text>
				<Button style={{width:"50%"}} variant="danger" aria-label="Remove" onClick={delResource}>Remove</Button>
			</InputGroup>
		
			<br></br>
			<OverlayTrigger trigger="focus" placement="top" overlay={popoverCurrent}>
				<input aria-label={`current amount of resource ${props.resource.name}`} aria-labelledby="resource-current-label" required='required' type='number' value={props.resource.current} name={props.resource.name} id="current" className= "resourceBoxInside" onChange={changeResource}></input>
			</OverlayTrigger>
			<OverlayTrigger trigger="focus" placement="top" overlay={popoverDice}>
				<input aria-label={`dice associated with resource ${props.resource.name}`} aria-labelledby="resource-dice-box-label" required='required' type='text' value={props.resource.dice} name={props.resource.name} id="dice" className= "resourceBoxInside2" maxLength="4" onChange={changeResource}></input>
			</OverlayTrigger>
			<OverlayTrigger trigger="focus" placement="top" overlay={popoverMaximum}>
				<input aria-label={`maximum amount of resource ${props.resource.name}`} aria-labelledby="resource-maximum-label" required='required' type='number' value={props.resource.maximum} name={props.resource.name} id="maximum" className= "resourceBoxInside" onChange={changeResource}></input>
			</OverlayTrigger>
		</div>
	);
}
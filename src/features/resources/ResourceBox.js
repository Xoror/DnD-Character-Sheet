import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux"

import { AiFillCloseSquare } from "react-icons/ai";

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
		dispatch(editResource([props.resource.id, event.target.value, event.target.id]))
	}
	const delResource = () => {
		dispatch(deleteResource(props.resource.id))
	}

	const popoverCurrent = (
		<Tooltip style={{opacity:"1"}} id="dice-popover">
			<label id="resource-current-label"> Current {props.resource.name} </label>
		</Tooltip>
	)
	const popoverDice = (
		<Tooltip style={{opacity:"1"}} id="dice-popover">
			<label id="resource-dice-box-label"> Dice: </label> Should have the format like "d20" or "d8" so the letter "d" and a number appended
		</Tooltip>
	)
	const popoverMaximum = (
		<Tooltip style={{opacity:"1"}} id="dice-popover">
			<label id="resource-maximum-label"> Maximum {props.resource.name} </label>
		</Tooltip>
	)

	return (
		<div className="resource-list-item">
			<div className="resource-box">
				<div role="heading" aria-level={6} id={`resource-${props.resource.name}-title`} className="resource-title mb-1">
					<label className="resource-label"> {props.resource.name} </label>
					<Button className="resource-remove-button" variant="danger" onClick={delResource}>Remove</Button>
				</div>

				<div aria-labelledby={`resource-${props.resource.name}-title`} className="resource-body">
					<label id="resource-current-label" style={{gridArea:"current-label"}}>Current</label>
					<OverlayTrigger trigger="focus" placement="top" overlay={popoverCurrent}>
						<input 
							aria-label={`current amount of resource ${props.resource.name}`} aria-labelledby="resource-current-label"
							required='required' type='number' value={props.resource.current} name={props.resource.name} id="current" 
							className= "resource-input current" onChange={changeResource}
						></input>
					</OverlayTrigger>
					<label id="resource-dice-box-label" style={{gridArea:"dice-label"}}>Dice</label>
					<OverlayTrigger trigger="focus" placement="top" overlay={popoverDice}>
						<input 
							aria-label={`dice associated with resource ${props.resource.name}`} aria-labelledby="resource-dice-box-label"
							required='required' type='text' value={props.resource.dice} name={props.resource.name} id="dice" 
							className= "resource-input dice" maxLength="4" onChange={changeResource}
						></input>
					</OverlayTrigger>
					<label id="resource-maximum-label" style={{gridArea:"max-label"}}>Maximum</label>
					<OverlayTrigger trigger="focus" placement="top" overlay={popoverMaximum}>
						<input 
							aria-label={`maximum amount of resource ${props.resource.name}`} aria-labelledby="resource-maximum-label" 
							required='required' type='number' value={props.resource.maximum} name={props.resource.name} id="maximum" 
							className= "resource-input max" onChange={changeResource}></input>
					</OverlayTrigger>
				</div>
			</div>
		</div>
	);
}
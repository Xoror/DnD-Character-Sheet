import React from 'react';
import { useDispatch } from "react-redux"

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


import { editResource, deleteResource } from './ResourcesSlice';

export const ResourceBox = (props) => {
	const dispatch = useDispatch()

	const changeResource = (event) => {
		dispatch(editResource([event.target.name, event.target.value, event.target.id]))
	}
	const delResource = () => {
		dispatch(deleteResource(props.id))
	}

	return (
		<div key={props.id} className="resourceBox">
			<InputGroup>
				<InputGroup.Text>{props.resource.name}</InputGroup.Text>
				<Button variant="danger" aria-label="Remove" onClick={delResource}>Remove</Button>
			</InputGroup>
		
			<br></br>
			<input required='required' type='text' value={props.resource.current} name={props.resource.name} id="current" className= "resourceBoxInside" onChange={changeResource}></input>
			<input required='required' type='text' value={props.resource.dice} name={props.resource.name} id="dice" className= "resourceBoxInside2" onChange={changeResource}></input>
			<input required='required' type='text' value={props.resource.maximum} name={props.resource.name} id="maximum" className= "resourceBoxInside" onChange={changeResource}></input>
			
		</div>
	);
}
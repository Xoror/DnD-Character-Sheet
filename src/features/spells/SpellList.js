import React, { useState} from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { ActionsTable } from '../actions/ActionsTable';
import "../styles.css"

export const SpellList = (props) => {
	const sortedSpellList= useSelector(state => state.actions.sortedSpellList)
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	}
	
	
	/*
	{props.headers.map((header, index) => (
		<ActionTable id={props.id} key={index} header={header} bodies={props.actions.filter((action) => {return action.type === header})} spells={props.spells}/>
	))}
	*/
	let headers = ["Cantrip","1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
	return(
		<>
			<span style={{justifyContent:"end", textAlign:"right"}}> testing</span>
			<Button variant="primary" onClick={handleShow} className="md-2">
				Open Spell List
			</Button>

			<Offcanvas border="dark" style={{backgroundColor:"#6c757d"}} show={show} onHide={handleClose} placement="end" scroll="true">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Spell List</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{headers.map((header, index) => (
						<ActionsTable offCanvas={true} id={props.id} key={index} header={header} bodies={sortedSpellList.filter((action) => {return action.type === header})} spells="true"/>
					))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
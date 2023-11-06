import React from 'react';
import { useDispatch, useSelector } from "react-redux"

//import Card from 'react-bootstrap/Card';
import Card from '../../BootstrapReplace/Card';
//import Form from 'react-bootstrap/Form';
import Form from '../../BootstrapReplace/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from '../../BootstrapReplace/FloatingLabel';

import { changeNotes } from './NotesSlice';


export default function Notes () {
	const notes = useSelector(state => state.notes.data)
    const dispatch = useDispatch()
	const handleNotesChange = (event) => {
		dispatch(changeNotes(event.target.value))
	}
	return (
		<Card bg="secondary">
			<Card.Header> Any Notes </Card.Header>
			<Card.Body style={{padding:"0.5em"}}>
				 <FloatingLabel controlId="notes-textarea" label="Notes">
					<Form.Control as="textarea" value={notes} aria-label="With textarea" onChange={handleNotesChange}/>
				</FloatingLabel>
			</Card.Body>
		</Card>
	)
}
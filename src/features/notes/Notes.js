import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { changeNotes } from './NotesSlice';

import "../styles.css"

export const Notes = () => {
	const notes = useSelector(state => state.notes.data)
    const dispatch = useDispatch()
	const handleNotesChange = (event) => {
		dispatch(changeNotes(event.target.value))
	}
	return (
		<Card bg="secondary">
			<Card.Header> Any Notes </Card.Header>
			<Card.Body>
				 <InputGroup>
					<Form.Control as="textarea" value={notes} aria-label="With textarea" onChange={handleNotesChange}/>
				</InputGroup>
			</Card.Body>
		</Card>
	)
}
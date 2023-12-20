import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from '../../BootstrapReplace/Card';
import Form from '../../BootstrapReplace/Form';
import FloatingLabel from '../../BootstrapReplace/FloatingLabel';

import { changeNotes } from './NotesSlice';


const Notes = () => {
	const notes = useSelector(state => state.notes.data)
    const dispatch = useDispatch()
	const handleNotesChange = (event) => {
		dispatch(changeNotes(event.target.value))
	}
	return (
		<Card className="main-element-sub-card">
			<div style={{padding:"0.5em"}}>
				<h5 className="mb-3"> Any Notes </h5>
				<FloatingLabel controlId="notes-textarea" label="Notes">
					<Form.Control as="textarea" value={notes} onChange={handleNotesChange}/>
				</FloatingLabel>
			</div>
		</Card>
	)
}

export default Notes
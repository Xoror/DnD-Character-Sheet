import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import { changeDetails } from './CharDetailsSlice';

export const CharacterClass = () => {
	const dispatch = useDispatch()
	const charClass= useSelector(state => state.charDetails.charClass)
	const charSubclass = useSelector(state => state.charDetails.charSubclass);
	
	const handleClassChange = (event) => {
		let id = event.target.id;
		if(id === "Class") {
			id = "ClassChange";
		}
		else if (id === "subClass") {
			id = "SubClassChange";
		}
		const class_change = event.target.value;
		dispatch(changeDetails([class_change, id]))
	}
	
	return (
		<div id="charClass" /*className='alert alert-secondary'*/ >
			<label id="character-class-label" >Class:</label>
			<br></br>
			<input aria-labelledby="character-class-label" required='required' type='text' id='Class' value={charClass} placeholder="Insert Character Class here" onChange={handleClassChange}></input>
			<br></br>
			<label id="character-subclass-label" >Sublass:</label>
			<br></br>
			<input aria-labelledby="character-subclass-label" required='required' type='text' id='subClass' value={charSubclass} placeholder="Insert Character Sublass here" onChange={handleClassChange}></input>
		</div>
	);
}
import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import Form from '../../BootstrapReplace/Form';

import { changeDetails } from './CharDetailsSlice';
import { changeIsCaster } from '../attributes/AttributesSlice';
import { useScreenSize } from '../../components/CustomHooks';

export const CharacterName = () => {
	const dispatch  = useDispatch()
	const charName = useSelector(state => state.charDetails.charName)
    const casting = useSelector(state => state.attributes.casting)
	
	const width = useScreenSize().width
	
	const handleNameChange = (event) => {
		const name_change = event.target.value;
		dispatch(changeDetails([name_change, "NameChange"]))
	}
	
	const handleChecked = (event) => {
		dispatch(changeIsCaster(event.target.checked))
	}
	
	return (
		<div id="CharacterName" /*className='alert alert-secondary'*/>
			<label htmlFor="character-name-input" id="character-name-label">Character Name: {width} </label>
			<br></br>
			<input type='text' id='character-name-input' value={charName} placeholder="Insert Character name here" onChange={handleNameChange}></input>
			<br></br>
			<Form.Check type="checkbox" checked={casting.isCaster} id="is-caster-check" label="Is character spellcaster?" onChange={handleChecked}></Form.Check>
		</div>
	);
}


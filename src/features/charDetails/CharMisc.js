import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { changeDetails } from './CharDetailsSlice'
import { updateProficiency, updateProficiencies, computeHitDC } from '../attributes/AttributesSlice';

export const MiscInfo = () => {
	const dispatch = useDispatch()
    const charLevel = useSelector(state => state.charDetails.charLevel)
    const charExperience = useSelector(state => state.charDetails.charExperience)
    const charLineage = useSelector(state => state.charDetails.charLineage)
    const charBackground = useSelector(state => state.charDetails.charBackground)
	
	const handleChange = (event) => {
		let level_change = event.target.value;
		let id = event.target.id;
		dispatch(changeDetails([level_change, id]))
		if(id === "Level") {
			dispatch(updateProficiency(level_change))
			dispatch(updateProficiencies())
			dispatch(computeHitDC())
		}
	}
	
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col style={{justifyContent:"right"}}>
					<label id="character-lineage-label">Lineage: </label>
					<br></br>
					<input aria-labelledby="character-lineage-label" required="required" type="text" id="Lineage" value={charLineage} onChange={handleChange}></input> 
					<br></br>
					<input aria-labelledby="character-level-label" required="required" type="number" min="1" max="20" id="Level" value={charLevel} onChange={handleChange}></input> 
					<br></br>
					<label id="character-level-label">Character Level: </label>
				</Col>
				<Col>
					<label id="character-background-label">Background: </label>
					<br></br>
					<input aria-labelledby="character-background-label" required="required" type="text" id="Background" value={charBackground} onChange={handleChange}></input> 
					<br></br>
					<input aria-labelledby="character-xp-label" required="required" type="text" id="Experience Points" value={charExperience} onChange={handleChange}></input> 
					<br></br>
					<label id="character-xp-label">Experience Points: </label>
				</Col>
			</Row>
		</Container>
	);
}
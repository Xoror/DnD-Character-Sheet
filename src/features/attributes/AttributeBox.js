import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { Attribute } from './AttributeSolo';
import { changeJackOfAllTrades } from './AttributesSlice';
import { updateProficiencies } from './AttributesSlice';

import "../styles.css"


export const Attributes = () => {
	const dispatch = useDispatch()
    const charAttributes = useSelector(state => state.attributes.charAttributes)
    const jackOfAllTrades = useSelector(state => state.attributes.jackOfAllTrades)

	const handleChecked = (event) => {
		dispatch(changeJackOfAllTrades(event.target.checked))
		dispatch(updateProficiencies())
	}
	return (
	<Card border ="dark" bg="secondary">
		<Form.Check style={{paddingLeft:"2em", paddingTop:"0.3em"}} type="checkbox" checked={jackOfAllTrades} id="jack-of-all-trades-check" label="Jack of All Trades" onChange={handleChecked}></Form.Check>
		<table className="table" style={{color: '#ffffff'}}>
			<thead>
				<tr>
				  <th scope="col">Attributes</th>
				  <th scope="col">Skills</th>
				</tr>
			</thead>
			<tbody>
			{charAttributes.map((charAttribute) => (
				<Attribute key={charAttribute.id} attribute={charAttribute}/>
			))}
			</tbody>
		</table>
	</Card>
	);
}
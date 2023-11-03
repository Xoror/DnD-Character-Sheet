import React from 'react';
import { useDispatch, useSelector } from "react-redux"

//import Card from 'react-bootstrap/Card';
import Card from '../../BootstrapReplace/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import { Attribute } from './AttributeSolo';
import { changeJackOfAllTrades, updateProficiencies } from './AttributesSlice';



export const Attributes = () => {
	const dispatch = useDispatch()
    const charAttributes = useSelector(state => state.attributes.charAttributes)
	const skills = useSelector(state => state.attributes.skills)
    const jackOfAllTrades = useSelector(state => state.attributes.jackOfAllTrades)

	const handleChecked = (event) => {
		dispatch(changeJackOfAllTrades(event.target.checked))
		dispatch(updateProficiencies())
	}
	return (
	<Card className="main-element-card">
		<Form.Check style={{paddingLeft:"2em", paddingTop:"0.3em"}} type="checkbox" checked={jackOfAllTrades} id="jack-of-all-trades-check" label="Jack of All Trades" onChange={handleChecked}></Form.Check>
		<Table style={{color: '#ffffff', border:"black"}}>
			<thead>
				<tr>
				  <th scope="col">Attributes</th>
				  <th scope="col" style={{paddingLeft:"0"}}>Skills</th>
				</tr>
			</thead>
			<tbody>
			{charAttributes.map((charAttribute) => (
				<Attribute key={charAttribute.id} id={charAttribute.id} attribute={charAttribute} skills={skills.filter((skill) => {return skill.supSkill === charAttribute.name})}/>
			))}
			</tbody>
		</Table>
	</Card>
	);
}
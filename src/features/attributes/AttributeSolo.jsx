import React from 'react';
import { useDispatch, useSelector } from "react-redux"

import ListGroup from 'react-bootstrap/ListGroup';

import { SkillItem } from './AttributeSkills'
import { attributeChange } from './AttributesSlice'

export const Attribute = (props) => {
	const dispatch = useDispatch()
	
	const handleAttrChange = (event) => {
		dispatch(attributeChange([event.target.value,  props.attribute.id], dispatch))
	}
	return (
		<tr>
			<td className="AttributeBox">
				<label id="attribute-name">{props.attribute.name}</label>
				<input required='required' aria-labelledby="attribute-name" type='number' min="1" value={props.attribute.value} className="AttributeBoxInside" /*style={{textAlign:"center", height:"40%", width:"50%", padding:"auto"}}*/
					onChange={handleAttrChange}
				></input>
				
				<div /*style={{paddingTop:"10%"}}*/>
					<span>Bonus: </span>
					<br></br>
					<span style={{paddingTop:"1.25em"}}>{props.attribute.bonus}</span>
				</div>
			</td>
			<td style={{paddingInline:"0"}}>
				{props.skills.map((skill3) => (
					<SkillItem attrSkills={true} key={skill3.id} skill2={skill3}/>
				))}
			</td>
		</tr>
	);
}
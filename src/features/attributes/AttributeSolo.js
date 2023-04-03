import React, { useEffect} from 'react';
import { useDispatch, useSelector, useStore } from "react-redux"

import "../styles.css"

import { SkillItem } from './AttributeSkills'
import { attributeChange, updateProficiencies, computeAC } from './AttributesSlice'

export const Attribute = (props) => {
	const dispatch = useDispatch()
	const skills = useSelector(state => state.attributes.skills)
	
	const handleAttrChange = (event) => {
		
		dispatch(attributeChange([event.target.value,  props.attribute.name], dispatch))
	}
	return (
		<tr>
			<td className="AttributeBox">
				{props.attribute.name}
				<input required='required' type='number' min="1" value={props.attribute.value} className="AttributeBoxInside" /*style={{textAlign:"center", height:"40%", width:"50%", padding:"auto"}}*/
					onChange={handleAttrChange}
				></input>
				
				<div /*style={{paddingTop:"10%"}}*/>
					<span>Bonus: </span>
					<br></br>
					<span style={{paddingTop:"20px"}}>{props.attribute.bonus}</span>
				</div>
			</td>
			<td >
				
				{skills.filter((skill) => {return skill.supSkill === props.attribute.name}).map((skill3) => (
					<SkillItem key={skill3.id} skill2={skill3}/>
				))}
			</td>
		</tr>
	);
}
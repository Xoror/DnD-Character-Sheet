import React, { useState } from 'react';
import { useDispatch } from "react-redux"


import { proficiencyChange, updateProficiencies } from "./AttributesSlice"

export const SkillItem = (props) => {
	const dispatch = useDispatch()
	const [advDisadv, setAdvDisadv] = useState("none")
	const handleAdvDiadv = (event) => {
		setAdvDisadv(() => {
			if(advDisadv === "none") {
				return "advantage"
			}
			else if(advDisadv === "advantage") {
				return "disadvantage"
			}
			else if(advDisadv === "disadvantage") {
				return "none"
			}
		})
	}

	const handleExpertise = (event) => {
		dispatch(proficiencyChange([event.target.checked, props.skill2.name, event.target.id]))
		dispatch(updateProficiencies())
	}

	return (
		<div className="row">
			<div className="checkbox-wrapper skills-layout" >
				<input aria-label="expertise checkbox" type="checkbox" id="Expertise" name={props.skill2.name + " proficiency"} onChange={handleExpertise} checked={props.skill2.expertise}></input>
				<input aria-label="proficiency checkbox" type="checkbox" id="Proficiency" name={props.skill2.name + " expertise"} onChange={handleExpertise} checked={props.skill2.proficient}></input>
				<label className="skills-text">  {props.skill2.bonus} {props.skill2.shortName}  </label>
				{props.attrSkills ? 
					<input aria-label="advantage/disadvatage checkbox" type="checkbox" id={advDisadv} name={props.skill2.name +" advantage/disadvantage"} onChange={handleAdvDiadv} checked={advDisadv != "none"} style={{marginRight:"0.25em"}}></input>
					: null
				}
			</div>
		</div>
	)	
}
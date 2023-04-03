import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import "../styles.css"

import { proficiencyChange, updateProficiencies } from "./AttributesSlice"

export const SkillItem = (props) => {
	const dispatch = useDispatch()

	const handleExpertise = (event) => {
		dispatch(proficiencyChange([event.target.checked, event.target.name, event.target.id]))
		dispatch(updateProficiencies())
	}

	return (
		<div className="row">
			<div className="checkbox-wrapper skills-layout" >
				<input type="checkbox" id="Expertise" name={props.skill2.name} value="expertise" onChange={handleExpertise} checked={props.skill2.expertise}></input>
				<input type="checkbox" id="Proficiency" name={props.skill2.name} value="proficiency" onChange={handleExpertise} checked={props.skill2.proficient}></input>
				<label className="skills-text">  {props.skill2.bonus} {props.skill2.shortName}  </label>
			</div>
		</div>
	)	
}
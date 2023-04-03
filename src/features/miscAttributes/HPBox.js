import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import "../styles.css"
import { RiFileEditFill } from "react-icons/ri";

import { changeHP } from './MiscAttributesSlice';

export const HPBox = (props) => {
	const dispatch = useDispatch()
    
	const handleHPChange = (event) => {
		dispatch(changeHP([event.target.id, event.target.value]))
	}
	return (
		<div className="hpBox">
			<label>Current</label><label>Max</label><label>Temp</label>
			<br></br>
			<input id="currentHP" type='number' value={props.charHP.current} className= "hpBoxInside" onChange={handleHPChange}></input>
			<input id="maxHP" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange}></input>
			<input id="tempHP" type='number' value={props.charHP.temp} className= "hpBoxInside" onChange={handleHPChange}></input>
			<br></br>
			<RiFileEditFill type="button" color="black" size="23" /*onClick={handleShow}*/ className="edit-button" />
		</div>
	);
}
import React from 'react';
import { useDispatch } from "react-redux"

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
			<div style={{display:"flex", flexWrap:"wrap", justifyContent:"middle"}}>
				<div id="current-hp" >
					<div style={{textAlign:"center"}}> <label>Current</label> </div>
					<div> <input id="currentHP" aria-label="current-hp-input" aria-labelledby="current-hp" type='number' value={props.charHP.current} className= "hpBoxInside" onChange={handleHPChange}></input> </div>
				</div>
				<div id="max-hp">
					<div> <label>Max</label> </div>
					<div> <input id="maxHP" aria-label="max-hp-input" aria-labelledby="max-hp" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange}></input> </div>
				</div>
				<div id="temp-hp">
					<div> <label>Temp</label> </div>
					<div> <input id="tempHP" aria-label="temporary-hp-input" aria-labelledby="temporary-hp" type='number' value={props.charHP.temp} className= "hpBoxInside" onChange={handleHPChange}></input> </div>
				</div>
			</div>
			<RiFileEditFill type="button" color="black" size="23" /*onClick={handleShow}*/ className="edit-button" />
		</div>
	);
}
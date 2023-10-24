import React from 'react';
import { useDispatch } from "react-redux"

import { RiFileEditFill } from "react-icons/ri";

import { changeHP } from './MiscAttributesSlice';

export const HPBox = (props) => {
	const dispatch = useDispatch()
    
	const handleHPChange = (event) => {
		dispatch(changeHP([event.target.id, event.target.value]))
	}
	return (
		<div className="hpBox">
			<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"0.25em"}}>
				<div id="current-hp" >
					<div style={{textAlign:"center"}}> <label id="current-hp-label">Current HP</label> </div>
					<div> <input id="currentHP" aria-labelledby="current-hp-label" type='number' value={props.charHP.current} className= "hpBoxInside" onChange={handleHPChange} min="0"></input> </div>
				</div>
				<div id="max-hp">
					<div> <label id="max-hp-label">Max HP</label> </div>
					<div> <input id="maxHP" aria-labelledby="max-hp-label" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange} min="0"></input> </div>
				</div>
				<div id="temp-hp">
					<div> <label id="temp-hp-label">Temp HP</label> </div>
					<div> <input id="tempHP" aria-labelledby="temp-hp-label" type='number' value={props.charHP.temp} className= "hpBoxInside" onChange={handleHPChange} min="0"></input> </div>
				</div>
			</div>
			<button className="react-icons-button edit" aria-label="edit hp button" /*onClick={handleShow}*/ style={{float: "left"}}>
				<RiFileEditFill size="1.5em" className="edit-button" />
			</button>
		</div>
	);
}
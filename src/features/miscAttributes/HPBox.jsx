import React from 'react';
import { useDispatch } from "react-redux"

import Container from '../../BootstrapReplace/Container';
import Row from '../../BootstrapReplace/Row';
import Col from '../../BootstrapReplace/Col';

import { RiFileEditFill } from "react-icons/ri";

import { changeHP } from './MiscAttributesSlice';

export const HPBox = (props) => {
	const dispatch = useDispatch()
    
	const handleHPChange = (event) => {
		dispatch(changeHP([event.target.id, event.target.value]))
	}
	return (
		<div className="hpBox">
			{true ? 
				<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"0.25em"}}>
					<div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}} id="current-hp" >
						<label htmlFor="currentHP">Current HP</label>
						<input id="currentHP" aria-labelledby="current-hp-label" type='number' value={props.charHP.current} className= "hpBoxInside" onChange={handleHPChange} min="0"></input>
					</div>
					<div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}} id="max-hp">
						<label htmlFor="maxHP">Max HP</label>
						<input id="maxHP" aria-labelledby="max-hp-label" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange} min="0" />
					</div>
					<div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}} id="temp-hp">
						<label htmlFor="tempHP">Temp HP</label>
						<input id="tempHP" aria-labelledby="temp-hp-label" type='number' value={props.charHP.temp} className= "hpBoxInside" onChange={handleHPChange} min="0" />
					</div>
				</div>:
				<Container>
					<Row>
						<Col style={{padding:"0"}}> <label id="current-hp-label">Current HP</label> </Col>
						<Col style={{padding:"0"}}> <label id="max-hp-label">Max HP</label> </Col>
						<Col style={{padding:"0"}}> <label id="temp-hp-label">Temp HP</label> </Col>
					</Row>
					<Row>
						<Col style={{padding:"0"}}> <input id="currentHP" aria-labelledby="current-hp-label" type='number' value={props.charHP.current} className= "hpBoxInside" onChange={handleHPChange} min="0" /> </Col>
						<Col style={{padding:"0"}}> <input id="maxHP" aria-labelledby="max-hp-label" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange} min="0" /></Col>
						<Col style={{padding:"0"}}> <input id="maxHP" aria-labelledby="max-hp-label" type='number' value={props.charHP.max} className= "hpBoxInside" onChange={handleHPChange} min="0" /> </Col>
					</Row>
				</Container>
			}
			<button className="react-icons-button edit" aria-label="edit hp button" /*onClick={handleShow}*/ style={{float: "left"}}>
				<RiFileEditFill size="1.5em" className="edit-button" />
			</button>
		</div>
	);
}
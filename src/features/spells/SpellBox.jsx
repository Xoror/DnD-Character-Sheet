import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"


//import Card from 'react-bootstrap/Card';
import Card from '../../BootstrapReplace/Card.jsx';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//import Container from 'react-bootstrap/Container'
import Container from '../../BootstrapReplace/Container.jsx';
//import Row from 'react-bootstrap/Row'
import Row from '../../BootstrapReplace/Row.jsx';
//import Col from 'react-bootstrap/Col'
import Col from '../../BootstrapReplace/Col.jsx';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { HiOutlineInformationCircle } from "react-icons/hi";
import { changeCasterType, changeCastingAttribute, computeHitDC } from '../attributes/AttributesSlice.js';
import { SpellSlotTable } from "./SpellSlotTable.jsx"
import { updateSpellListScaling } from '../actions/ActionsSlice.js';

export const SpellBox = () => {
	const dispatch = useDispatch()
    const casting = useSelector(state => state.attributes.casting)
    const charLevel = useSelector(state => state.charDetails.charLevel)
	const handleCastingAttributeSelect = (event) => {
		dispatch(changeCastingAttribute(event.target.value))
		dispatch(updateSpellListScaling(event.target.value))
		dispatch(computeHitDC())
	}
	const handleCasterTypeChange = (event) => {
		dispatch(changeCasterType(event.target.value))
	}

	const [popoverShow, setPopoverShow] = useState(false)
	const popoverShowTest = (event, id) => {
		if(id === "show") {
			setPopoverShow(event)
		}
		else if(id === "close") {
			setPopoverShow(false)
		}
	}
	
	const popover = (
		<Popover className="popover-container" id="popover-caster-type" onClick={event => event.stopPropagation()}>
			<Popover.Header className="popover-header" as="h3">
				Caster Type Legend
				<CloseButton onClick={event => popoverShowTest(event, "close")} style={{float:"right"}} aria-label="close caster type legend" variant="white"/>
			</Popover.Header>
			<Popover.Body className="popover-body">
				<span> <b>Full Caster:</b> Casters like Wizards, Sorcerers, Bards that get spellslots up to 9th level.</span>
				<br></br>
				<span> <b>Half Caster:</b> Casters like Rangers, Paladins that get spellslots up to 5th level</span>
				<br></br>
				<span> <b>Third Level Caster:</b> Casters as a result of a sublass like Fighter: Eldritch Knight that get spellslots up to 4th level </span>
				<br></br>
				<span> <b>Pact Caster:</b>  Casters that have Pact Spellcasting like Warlocks</span>
				<br></br>
				<span> <b>Half Pact Caster:</b> Casters that have Pact Spellcasting from a subclass like Blood Hunter: Order of the Profane Soul </span>
			</Popover.Body>
		</Popover>
	)

	return (
		<Container fluid className={casting.isCaster ? "collapse show" : "collapse"} style={{padding:"0"}}>
			<Card className="main-element-card">
				<InputGroup style={{color:"black", marginBottom:"0.5em"}}>
					<InputGroup.Text style={{padding:"0"}}>
						<OverlayTrigger defaultShow={false} show={popoverShow} onToggle={event => popoverShowTest(event, "show")} trigger="click" placement="auto" overlay={popover}>
							<button className="react-icons-button" style={{borderRadius:"100%", height:"1.5em"}}>
								 <HiOutlineInformationCircle size="1.5em" style={{position:"relative", bottom:"2px"}}/>
							</button>
						</OverlayTrigger>
					</InputGroup.Text>
					<FloatingLabel controlId="casterType" label="Caster Type">
						<Form.Select
							value={casting.type} id="CasterType" placeholder="" aria-label="caster type select"
							onChange={handleCasterTypeChange} style={{paddingRight:"0em", textOverflow:"fade"}}
						> 
							<option value=""> Choose Caster Type </option>
							<option value="full"> Full Caster </option>
							<option value="half"> Half Caster </option>
							<option value="third"> Third Level Caster </option>
							<option value="pact"> Pact Caster </option>
							<option value="halfpact"> Half Pact Caster </option>
						</Form.Select> 
					</FloatingLabel>
					<FloatingLabel controlId="caster-type" label="Casting Attribute">
						<Form.Select placeholder="" value={casting.spellAttribute} id="CastingAttribute" onChange={handleCastingAttributeSelect}> 
							<option> Choose Casting Attribute </option>
							<option value="Intelligence"> Intelligence </option>
							<option value="Wisdom"> Wisdom </option>
							<option value="Charisma"> Charisma </option>
						</Form.Select> 
					</FloatingLabel>
				</InputGroup>
				<Row sm={2} xs={1}>
					<Col md="auto" className="spellbox-column left">
						<div className="spellCard">
							<Row>
								<Col style={{paddingRight:"0", textAlign:"center"}}> <label id="spellHitLabel">Spell Hit</label></Col>
								<Col style={{paddingLeft:"0", textAlign:"center"}}> <label id="spellDCLabel">Spell DC</label></Col>
							</Row>
							<Row>
								<Col style={{paddingRight:"0"}}>
									{false ? 
										<input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellHit}></input>
										:
										<div className="AttributeBoxNotInput spellCardInside" aria-labelledby="spellHitLabel">{casting.spellHit}</div>
									}
								</Col>
								<Col style={{paddingLeft:"0"}}>
									{false ? 
										<input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellDC}></input>
										:
										<div className="AttributeBoxNotInput spellCardInside" aria-labelledby="spellDCLabel">{casting.spellDC}</div>
									}
								</Col>
							</Row>
						</div>
					</Col>
					<Col md className="spellbox-column right">
						<SpellSlotTable casting={casting} level={charLevel} />
					</Col>
				</Row>
			</Card>
		</Container>
	)
}
import React from 'react';
import { useDispatch, useSelector } from "react-redux"


import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton'

import { HiOutlineInformationCircle } from "react-icons/hi";
import { changeCasterType, changeCastingAttribute, computeHitDC } from '../attributes/AttributesSlice';
import { SpellSlotTable } from "./SpellSlotTable.js"
import { updateSpellListScaling } from '../actions/ActionsSlice';

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
	const handlePopoverClick = (event) => {
		event.stopPropagation()
	}
	const popover = (
		<Popover className="popover-container" id="popover-basic" onClick={event => event.stopPropagation()}>
			<Popover.Header className="popover-header" as="h3">
				Legend
				<CloseButton aria-label="close caster type legend" variant="white"/>
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
			<Card bg="secondary" border="dark">
				<InputGroup>
					<InputGroup.Text style={{padding:"0"}}>
						<OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
							<button className="react-icons-button" style={{borderRadius:"100%", height:"1.5em"}}> <HiOutlineInformationCircle size="1.5em" style={{position:"relative", bottom:"2px"}}/> </button>
						</OverlayTrigger>
					</InputGroup.Text>
					<Form.Select value={casting.type} id="CasterType" onChange={handleCasterTypeChange} style={{paddingRight:"0em", textOverflow:"fade"}}>
						<option> Choose Caster Type </option>
						<option value="full"> Full Caster </option>
						<option value="half"> Half Caster </option>
						<option value="third"> Third Level Caster </option>
						<option value="pact"> Pact Caster </option>
						<option value="halfpact"> Half Pact Caster </option>
					</Form.Select>
					
					<Form.Select value={casting.spellAttribute} id="CastingAttribute" onChange={handleCastingAttributeSelect}>
						<option> Choose Casting Attribute </option>
						<option value="Intelligence"> Intelligence </option>
						<option value="Wisdom"> Wisdom </option>
						<option value="Charisma"> Charisma </option>
					</Form.Select>
					
				</InputGroup>
				<Row>
					<Col md="auto" style={{paddingRight:"0"}}>
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
										<div className="AttributeBoxNotInput" aria-labelledby="spellHitLabel">{casting.spellHit}</div>
									}
								</Col>
								<Col style={{paddingLeft:"0"}}>
									{false ? 
										<input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellDC}></input>
										:
										<div className="AttributeBoxNotInput" aria-labelledby="spellDCLabel">{casting.spellDC}</div>
									}
								</Col>
							</Row>
						</div>
					</Col>
					<Col md style={{paddingLeft:"0", fontSize:"0.9em"}}>
						<SpellSlotTable casting={casting} level={charLevel} />
					</Col>
				</Row>
			</Card>
		</Container>
	)
}
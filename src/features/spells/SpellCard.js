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

import "../styles.css"
import { HiOutlineInformationCircle } from "react-icons/hi";
import { changeCasterType, changeCastingAttribute, computeHitDC } from '../attributes/AttributesSlice';
import { SpellSlotTable } from "./SpellSlotTable.js"

export const SpellCard = () => {
	const dispatch = useDispatch()
    const casting = useSelector(state => state.attributes.casting)
    const charLevel = useSelector(state => state.charDetails.charLevel)
	const handleCastingAttributeSelect = (event) => {
		dispatch(changeCastingAttribute(event.target.value))
		dispatch(computeHitDC())
	}
	const handleCasterTypeChange = (event) => {
		dispatch(changeCasterType(event.target.value))
	}
	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Legend</Popover.Header>
			<Popover.Body>
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
	);
	let doesShow = "collapse"
	if(casting.isCaster)
		doesShow = "collapse show"
	return (
		<Container fluid className={doesShow}>
			<Card bg="secondary" border="dark">
				<InputGroup>
					<InputGroup.Text style={{padding:"0"}}>
						<OverlayTrigger trigger="click" placement="auto" overlay={popover}>
							<button className="button-react-icons-style"> <HiOutlineInformationCircle size="25"/> </button>
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
								<Col style={{paddingRight:"0", alignText:"center"}}>Spell Hit</Col>
								<Col style={{paddingLeft:"0", alignText:"center"}}>Spell DC</Col>
							</Row>
							<Row>
								<Col style={{paddingRight:"0"}}><input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellHit}></input></Col>
								<Col style={{paddingLeft:"0"}}><input readOnly required='required' type='text' className= "spellCardInside" value={casting.spellDC}></input></Col>
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
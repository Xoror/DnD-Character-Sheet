import React, { useState} from 'react';
import { useDispatch } from "react-redux"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';

import { RiFileEditFill } from "react-icons/ri";

import { changeMiscAttribute } from './MiscAttributesSlice';
import { changeAC, computeAC, changeInitiative, computeInitiative } from "../attributes/AttributesSlice.js"

export const AttributeBox = (props) => {
	const dispatch = useDispatch()
	
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleKeyDown = (event) => {
		if(event.code === "Space" || event.code === "Enter") {
			handleShow()
		}
	}
	
	let testName = props.name
	const handleSubmit = (event) => {
		event.preventDefault()
		let data = {}
		if(props.name === "Speed") {
			data = {displayed: event.target[0].value, ground: event.target[1].value, swim: event.target[2].value, climb: event.target[3].value, fly: event.target[4].value}
			dispatch(changeMiscAttribute(data, testName))
		}
		else if(props.name === "AC") {
			if(event.target[0].value === "1") {
				data = {wearsArmor: true, unarmoredDefense: false, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, maxBonus: event.target[3].value, stealthDisadvantage: event.target[4].value}
			}
			if(event.target[0].value === "2") {
				data = {wearsArmor: false, unarmoredDefense: true, baseAC: event.target[1].value, scalingPrimary: event.target[2].value, scalingSecondary: event.target[3].value}
			}
			dispatch(changeAC(data, testName))
			dispatch(computeAC())
		}
		else if(props.name === "Initiative") {
			data = {scalingPrimary: event.target[0].value, scalingSecondary: event.target[1].value, flatBonus: event.target[2].value}
			dispatch(changeInitiative(data, testName))
			dispatch(computeInitiative())
		}
		
	}
	return (
		<div className="AttributeBox2">
			<Modal contentClassName="modal-custom" size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> Edit {props.name} </Modal.Title>
				</Modal.Header>
				
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						{props.name === "Initiative" ? (
							<InitiativeModal attribute={props.attribute}/>
							) : ( testName === "AC" ? (
								<ACModal attribute={props.attribute}/>
								) : ( testName === "Speed" ? 
									<SpeedModal attribute={props.attribute}/>
								: "" )
							)
						}	
					</Modal.Body>

					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary" onClick={handleClose}>
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		
			
			{false ? 
				<>
					<span>{props.name}</span>
					<br></br>
					<input readOnly type='text' value={props.attribute.value} className= "AttributeBoxInside2" ></input>
					<br></br>
					{props.name != "Proficiency Bonus" ? <RiFileEditFill type="button" color="black" size="23" onClick={handleShow} className="edit-button" /> : ""}	
				</> :
				<div className="hpBox">
					<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"0.25em"}}>
						<label id={`${props.name}-label`}> {props.name} {props.name === "Speed" ? "(" + props.attribute.displayed + ")" : null} </label> 
					</div>
					<div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
						<div aria-labelledby={`${props.name}-label`} className="AttributeBoxNotInput"> {props.attribute.value}</div>
					</div>
					{props.name != "Proficiency Bonus" ?
						<button className="react-icons-button edit" onClick={handleShow} style={{float: "left"}} aria-labelledby={`edit ${props.name} button`}>
							<RiFileEditFill title="edit button graphic" size="1.5em" className="edit-button"/> 
							<label className="visually-hidden" id={`edit ${props.name} button`}>{`Edit ${props.name} button`}</label>
						</button>
						: null}
				</div>
			}
		</div>
	)
}

const InitiativeModal = (props) => {
	return (
		<div>
			<FloatingLabel controlId="primary-scaling" label="Primary Scaling">
				<Form.Select required aria-describedby="primary-scaling" className="top-right-group top-left-group">
					<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
					{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingPrimary ? <option key={`scaling-primary-option-${attribute}`} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</FloatingLabel>
			<FloatingLabel controlId="secondary-scaling" label="Secondary Scaling">
			<Form.Select required aria-describedby="secondary-scaling" className="middle-right-group middle-left-group">
					<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
					{["None", "Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingSecondary ? <option key={`scaling-secondary-option-${attribute}`} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</FloatingLabel>
			<FloatingLabel controlId="flat-bonus" label="Flat Bonus (like from feats)">
				<Form.Control type="number" min="0" required defaultValue={props.attribute.flatBonus} aria-describedby="flat-bonus" className="bottom-right-group bottom-left-group"/>
			</FloatingLabel>
		</div>
	)
}
const ACModal = (props) => {
	const [showOptions, setShowOptions] = useState(props.attribute.wearsArmor ? "1" : (props.attribute.unarmoredDefense ? "2" : "0"))
	const handleShowOptions = (event) => setShowOptions(event.target.value)
	return(
		<div>
			<FloatingLabel controlId="armor-type" label="Armor Type">
				<Form.Select className="top-left-group top-right-group" defaultValue={props.attribute.wearsArmor ? "1" : "2"} required aria-describedby="armor-type" onChange={handleShowOptions}>
					<option value=""> Choose Armor Type </option>
					<option value="1" id="wearsArmor"> Equippable Armor </option>
					<option value="2" id="unarmoredDefense"> Unarmored Defense </option>
				</Form.Select>
			</FloatingLabel>
			{showOptions === "1" ? ( /*stealthDisadvantage*/
				<div>
					<InputGroup>
						<FloatingLabel controlId="base-ac" label="Armor Base AC">
							<Form.Control className="middle-left-group" type="number" required defaultValue={props.attribute.baseAC} placeholder="Input Armor's base AC" aria-labelledby="base-ac"/>
						</FloatingLabel>
						<FloatingLabel controlId="scaling-attribute" label="Scaling Attribute">
							<Form.Select required className="middle-right-group" aria-labelledby="scaling-attribute">
								<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
								{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
									attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
								))}
							</Form.Select>
						</FloatingLabel>
					</InputGroup>
					<InputGroup>
						<FloatingLabel controlId="max-bonus" label="Maximum Attribute Bonus">
							<Form.Control className="bottom-left-group" type="number" required defaultValue={props.attribute.maxBonus} placeholder="Input Maximum Bonus" aria-labelledby="max-bonus"/>
						</FloatingLabel>
						<FloatingLabel controlId="stealth-disadvantage" label="Gives Stealth Disadvantage">
							<Form.Select className="bottom-right-group" aria-labelledby="stealth-disadvantage">
								<option value={props.attribute.stealthDisadvantage}> {props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
								<option value={!props.attribute.stealthDisadvantage}> {!props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
							</Form.Select>
						</FloatingLabel>
					</InputGroup>
				</div>) : 
				<div>
					<FloatingLabel controlId="unarmored-base-ac" label="Base AC">
						<Form.Control className="middle-left-group middle-right-group" type="number" required defaultValue={props.attribute.baseAC} placeholder="Choose Base AC"  aria-labelledby="unarmored-base-ac"/>
					</FloatingLabel>
					<FloatingLabel controlId="primary-scaling" label="Primary Scaling">
						<Form.Select required aria-label="choose-primary-scaling" aria-labelledby="primary-scaling" className="middle-left-group middle-right-group">
							<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
							{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
								attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
							))}
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel controlId="secondary-scaling" label="Secondary Scaling">
						<Form.Select requried  className="bottom-left-group bottom-right-group" aria-labelledby="secondary-scaling">
							<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
							{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
								attribute != props.attribute.scalingSecondary ? <option key={index} value={attribute}> {attribute} </option> : ""
							))}
						</Form.Select>
					</FloatingLabel>
				</div>
			}
		</div>
	)
}
const SpeedModal = (props) => {
	return(
		<div>
			<FloatingLabel controlId="displayed-speed" label="Displayed Speed">
				<Form.Select required aria-label="choose-displayed-speed" aria-labelledby="primary-displayed-speed">
					<option value={props.attribute.displayed}>{props.attribute.displayed}</option>
					{["Ground", "Swim", "Climb", "Fly"].map((attribute, index) => (
						attribute != props.attribute.displayed ? <option key={`displayed-speed-option-${attribute}`} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</FloatingLabel>
			<InputGroup>
				<FloatingLabel controlId="ground-speed" label="Ground Speed">
					<Form.Control type="number" required defaultValue={props.attribute.ground} placeholder="Choose Ground Speed" aria-labelledby="ground-speed"/>
				</FloatingLabel>
				<FloatingLabel controlId="swim-speed" label="Swim Speed">
					<Form.Control type="number" required defaultValue={props.attribute.swim} placeholder="Choose Swim Speed" aria-labelledby="swim-speed"/>
				</FloatingLabel>
			</InputGroup>
			<InputGroup>
				<FloatingLabel controlId="climb-speed" label="Climb Speed">
					<Form.Control type="number" required defaultValue={props.attribute.climb} placeholder="Choose Climb Speed" aria-labelledby="climb-speed"/>
				</FloatingLabel>
				<FloatingLabel controlId="fly-speed" label="Fly Speed">
					<Form.Control type="number" required defaultValue={props.attribute.fly} placeholder="Choose Fly Speed"aria-labelledby="fly-speed"/>
				</FloatingLabel>
			</InputGroup>
		</div>
	)
}
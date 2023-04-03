import React, { useState} from 'react';
import { useDispatch } from "react-redux"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import "../styles.css"
import { RiFileEditFill } from "react-icons/ri";

import { changeMiscAttribute } from './MiscAttributesSlice';
import { changeAC, computeAC, changeInitiative, computeInitiative } from "../attributes/AttributesSlice.js"

export const AttributeBox = (props) => {
	const dispatch = useDispatch()
	
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	
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
			<Modal size="lg" show={show} onHide={handleClose}>
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
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		
			<span>{props.name}</span>
			<br></br>
			<input readOnly type='text' value={props.attribute.value} className= "AttributeBoxInside2" ></input>
			<br></br>
			{props.name != "Proficiency Bonus" ? <RiFileEditFill type="button" color="black" size="23" onClick={handleShow} className="edit-button" /> : ""}
		</div>
	)
}

const InitiativeModal = (props) => {
	return (
		<div>
			<InputGroup>
				<InputGroup.Text id="primary-scaling">Primary Scaling</InputGroup.Text>
				<Form.Select required aria-label="choose-primary-scaling" aria-describedby="primary-scaling">
					<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
					{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="secondary-scaling">Secondary Scaling</InputGroup.Text>
				<Form.Select required aria-label="choose-secondary-scaling" aria-describedby="secondary-scaling">
					<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
					{["None", "Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
						attribute != props.attribute.scalingSecondary ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="flat-bonus">Flat Bonus (like from feats) </InputGroup.Text>
				<Form.Control required defaultValue={props.attribute.flatBonus} aria-label="change-flat-bonus" aria-describedby="flat-bonus"/>
			</InputGroup>
		</div>
	)
}
const ACModal = (props) => {
	const [showOptions, setShowOptions] = useState("0")
	const handleShowOptions = (event) => setShowOptions(event.target.value)
	return(
		<div>
			<InputGroup>
				<InputGroup.Text id="armor-type"> Armor Type </InputGroup.Text>
				<Form.Select required aria-label="choose-armor-type" aria-describedby="armor-type" onChange={handleShowOptions}>
					<option value=""> Choose Armor Type </option>
					<option value="1" id="wearsArmor"> Equippable Armor </option>
					<option value="2" id="unarmoredDefense"> Unarmored Defense </option>
				</Form.Select>
			</InputGroup>
			{showOptions === "1" ? ( /*stealthDisadvantage*/
				<div>
					<InputGroup>
						<InputGroup.Text id="base-ac"> Armor Base AC </InputGroup.Text>
						<Form.Control type="number" required defaultValue={props.attribute.baseAC} placeholder="Input Armor's base AC" aria-label="base-armor-ac" aria-describedby="base-ac"/>
						<InputGroup.Text id="scaling-attribute"> Scaling Attribute </InputGroup.Text>
						<Form.Select required aria-label="choose-scaling-attribute" aria-describedby="scaling-attribute">
							<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
							{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
								attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
							))}
						</Form.Select>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text id="max-bonus"> Maximum Attribute Bonus </InputGroup.Text>
						<Form.Control type="number" required defaultValue={props.attribute.maxBonus} placeholder="Input Maximum Bonus" aria-label="choose-max-bonus" aria-describedby="max-bonus"/>
					</InputGroup>
					<InputGroup>
						<InputGroup.Text id="stealth-disadvantage"> Gives Stealth Disadvantage </InputGroup.Text>
						<Form.Select required aria-label="choose-stealth-disadvantage" aria-describedby="stealth-disadvantage">
							<option value={props.attribute.stealthDisadvantage}> {props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
							<option value={!props.attribute.stealthDisadvantage}> {!props.attribute.stealthDisadvantage ? "Yes" : "No"} </option>
						</Form.Select>
					</InputGroup>
				</div>) : (showOptions === "2" ? (
					<div>
						<InputGroup>
							<InputGroup.Text id="unarmored-base-ac"> Base AC </InputGroup.Text>
							<Form.Control type="number" required defaultValue={props.attribute.baseAC} placeholder="Choose Base AC" aria-label="choose-unarmored-base-ac" aria-describedby="unarmored-base-ac"/>
							<InputGroup.Text id="primary-scaling"> Primary Scaling </InputGroup.Text>
							<Form.Select required aria-label="choose-primary-scaling" aria-describedby="primary-scaling">
								<option value={props.attribute.scalingPrimary}>{props.attribute.scalingPrimary}</option>
								{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
									attribute != props.attribute.scalingPrimary ? <option key={index} value={attribute}> {attribute} </option> : ""
								))}
							</Form.Select>
							<InputGroup.Text id="secondary-scaling"> Secondary Scaling </InputGroup.Text>
							<Form.Select required aria-label="choose-secondary-scaling" aria-describedby="secondary-scaling">
								<option value={props.attribute.scalingSecondary}>{props.attribute.scalingSecondary}</option>
								{["None","Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"].map((attribute, index) => (
									attribute != props.attribute.scalingSecondary ? <option key={index} value={attribute}> {attribute} </option> : ""
								))}
							</Form.Select>
						</InputGroup>
					</div>
				) : "")
			}
		</div>
	)
}
const SpeedModal = (props) => {
	return(
		<div>
			<InputGroup>
				<InputGroup.Text id="displayed-speed">Displayed Speed</InputGroup.Text>
				<Form.Select required aria-label="choose-displayed-speed" aria-describedby="primary-displayed-speed">
					<option value={props.attribute.displayed}>{props.attribute.displayed}</option>
					{["Ground", "Swim", "Climb", "Fly"].map((attribute, index) => (
						attribute != props.attribute.displayed ? <option key={index} value={attribute}> {attribute} </option> : ""
					))}
				</Form.Select>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="ground-speed"> Ground Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.ground} placeholder="Choose Ground Speed" aria-label="choose-ground-speed" aria-describedby="ground-speed" id="ground"/>
				<InputGroup.Text id="swim-speed"> Swim Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.swim} placeholder="Choose Swim Speed" aria-label="choose-swim-speed" aria-describedby="swim-speed" id="swim"/>
			</InputGroup>
			<InputGroup>
				<InputGroup.Text id="climb-speed"> Climb Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.climb} placeholder="Choose Climb Speed" aria-label="choose-climb-speed" aria-describedby="climb-speed" id="climb"/>
				<InputGroup.Text id="fly-speed"> Fly Speed </InputGroup.Text>
				<Form.Control type="number" required defaultValue={props.attribute.fly} placeholder="Choose Fly Speed" aria-label="choose-fly-speed" aria-describedby="fly-speed" id="fly"/>
			</InputGroup>
		</div>
	)
}
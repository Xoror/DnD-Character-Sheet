import React, { useContext, useState, useRef,} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import "../styles.css"

import { ActionsTable } from "./ActionsTable"
import { addAction, editAction } from './ActionsSlice';
import { SpellList } from '../spells/SpellList';


const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}
export const ActionsBox = (props) => {
	const dispatch = useDispatch()
	const actions = useSelector(state => state.actions.actions)
	const sortedSpellList = useSelector(state => state.actions.sortedSpellList)


	const [defaultValues, setDefaultValues] = useState(props.id === "Spells" ? {id: "", name: "", range: "", damage: "", type: "", scaling: "", isPrepared: "", damageType: ""} : {id: "", name: "", range: "", damage: "", type: "", scaling: "", isProficient: "", damageType: ""})
	const [oldData, setOldData] = useState({})
	const [editing, setEditing] = useState(false)
	const [show, setShow] = useState(false);
	const [inputRef, setInputFocus] = useFocus()

	//could maybe be more efficient?
	const handleSubmit = (event) => {
		event.preventDefault()
		var data = {}
		if (props.id === "Spells") {
			data = {id: "", name: event.target[0].value, range: event.target[1].value, damage: event.target[2].value, type: event.target[3].value, 
						scaling: event.target[4].value, isPrepared: true, damageType: event.target[6].value};
		}
		else {
			data = {id: "", name: event.target[0].value, range: event.target[1].value, damage: event.target[2].value, type: event.target[3].value, 
						scaling: event.target[4].value, isProficient: event.target[5].value, damageType: event.target[6].value};
		}
		if(editing) {
			data.id = oldData.id
			dispatch(editAction(data, oldData, props.id))
			setEditing(false)
			
		}
		else {
			if(actions.filter(action => {return action.name === event.target[0].value}).length != 0 || sortedSpellList.filter(action => {return action.name === event.target[0].value}).length != 0) {
				event.stopPropagation()
				setShow(true)
				setInputFocus()
			}
			else {
				dispatch(addAction(data, props.id))
			}
		}
		setDefaultValues({id: "", name: "", range: "", damage: "", type: "", scaling: "", isProficient: "", damageType: ""})
	}
	const handleSelectValues = (event, id) => {
		let copy = structuredClone(defaultValues)
		copy[id] = event.target.value
		setDefaultValues(copy)
	}
	
	return (
		<Card bg="secondary" id="ActionsPart">
			{props.id === "Spells" ? <SpellList /> : "" }
			{props.headers.map((header, index) => (
				<ActionsTable setOldData={setOldData} setEditing={setEditing} passState={setDefaultValues} offCanvas={props.offCanvas} id={props.id} key={index} header={header} bodies={props.actions.filter((action) => {return action.type === header})} spells={props.spells}/>
			))}
			<InputGroup.Text> {editing ? ("Currently editing: " + defaultValues.name) : (props.spells ? "Add New Spell" : "Add New Action/Bonus Action/etc:") } </InputGroup.Text>
			<Form onSubmit={handleSubmit}>
				<InputGroup>
					
						<Form.Control ref={inputRef} required value={defaultValues.name} placeholder="Name" aria-label="Name"onChange={event => handleSelectValues(event, "name")}/>
						<Overlay target={inputRef.current} show={show} placement="top">
						  <Tooltip id="overlay-example">
								Please enter unique Name.
						  </Tooltip>
						</Overlay>
					
					<Form.Control required value={defaultValues.range} placeholder="Range" aria-label="Range" aria-describedby="range" onChange={event => handleSelectValues(event, "range")}/>
					<Form.Control required value={defaultValues.damage} placeholder="Damage" aria-label="damage-dice" aria-describedby="damage-dice" onChange={event => handleSelectValues(event, "damage")}/>
				</InputGroup>
				<InputGroup>
					<Form.Select required value={defaultValues.type} aria-label="action-type-select" onChange={event => handleSelectValues(event, "type")}>
						{props.id === "Actions" ? <option key="0" value="">Choose Action Type</option>:<option key="0" value="">Choose Spell Slot</option>}
						{props.options.map((option1, index) => 
							<option key={index+1} value={option1}>{option1}</option>
						)}
					</Form.Select>
					<Form.Select required value={defaultValues.scaling} aria-label="scaling-attribute" onChange={event => handleSelectValues(event, "scaling")}>
						<option value="">Choose Scaling Attribute</option>
						<option value="Strength">Strength</option>
						<option value="Dexterity">Dexterity</option>
						<option value="Constitution">Constitution</option>
						<option value="Intelligence">Intelligence</option>
						<option value="Wisdom">Wisdom</option>
						<option value="Charisma">Charisma</option>
						<option value="None">None</option>
					</Form.Select>
				</InputGroup>
				<InputGroup>
					{props.spells ? 
					""
					: <Form.Select required value={defaultValues.isProficient} type="boolean" aria-label="is-proficient" onChange={event => handleSelectValues(event, "isProficient")}> 
						<option value="">Is proficient?</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</Form.Select> }
					<Form.Select required value={defaultValues.damageType} aria-label="damage-type" onChange={event => handleSelectValues(event, "damageType")}>
						<option value="">Choose Damage Type</option>
						<option value="Bludgeoning">Bludgeoning</option>
						<option value="Slashing">Slashing</option>
						<option value="Piercing">Piercing</option>
						<option value="Fire">Fire</option>
						<option value="Cold">Cold</option>
						<option value="Lightning">Lightning</option>
						<option value="Thunder">Thunder</option>
						<option value="Acid">Acid</option>
						<option value="Poison">Poison</option>
						<option value="Necrotic">Necrotic</option>
						<option value="Radiant">Radiant</option>
						<option value="Psychic">Psychic</option>
						<option value="Force">Force</option>
					</Form.Select>
					<Button variant="success" aria-label="submit" type="submit">Submit</Button>
				</InputGroup>
			</Form>
		</Card>
	)
}
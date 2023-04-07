import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import "../styles.css"

import { InventoryTable } from './InventoryTable'
import { addItem, editItem } from './InventorySlice';

export const InventoryBox = (props) => {
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.inventory)
	var itemTemplate = {name: "", type: "", qty: "", worth: "", weight: "", isEquipped: ""}
	const [editing, setEditing] = useState(false)
	const [defaultValues, setDefaultValues] = useState(itemTemplate)
	const [oldData, setOldData] = useState({})
	
	var data = {}
	const handleSubmit = (event) => {
		event.preventDefault();
		if(editing) {
			data = {name: event.target[0].value, type: event.target[1].value, qty: event.target[2].value, worth: event.target[3].value, 
							weight: event.target[4].value, isEquipped: event.target[5].value === "true" ? true:false};
			dispatch(editItem(data, oldData))
			setEditing(false)
		}
		else {
			data = {name: event.target[0].value, type: event.target[1].value, qty: event.target[2].value, worth: event.target[3].value, 
							weight: event.target[4].value, isEquipped: event.target[5].value === "true" ? true:false};
			dispatch(addItem(data))
		}
		setDefaultValues(itemTemplate)
	}
	const handleSelectValues = (event, id) => {
		let copy = structuredClone(defaultValues)
		copy[id] = event.target.value
		setDefaultValues(copy)
	}
	
	const headers = ["Weapon", "Armor", "Misc"]
	return (
		<Card bg="secondary" id="Inventory">
			{headers.map((header, index) => (
				<InventoryTable setOldData={setOldData} setEditing={setEditing} setDefaultValues={setDefaultValues} key={index} header={header} bodies={inventory.filter((item) => {return item.type === header})}/>
			))}
			<InputGroup>
				<InputGroup.Text style={{flexGrow:"2"}}> {editing ? ("Currently editing: " + defaultValues.name) : "Add New Item" } </InputGroup.Text> 
				{editing ? <Button onClick={() => (setEditing(false), setDefaultValues(itemTemplate))}>Cancel</Button> : ""}
			</InputGroup>
			<Form onSubmit={handleSubmit}>
				<InputGroup>
					<Form.Control value={defaultValues.name} required placeholder="Name" aria-label="Name" aria-describedby="name" onChange={event => handleSelectValues(event, "name")}/>
					<Form.Select value={defaultValues.type} required aria-label="item-type-select" onChange={event => handleSelectValues(event, "type")}>
						<option value="">Choose Item Type</option>
						<option value="Weapon">Weapon</option>
						<option value="Armor">Armor</option>
						<option value="Misc">Misc</option>
					</Form.Select>
				</InputGroup>
				<InputGroup>
					<Form.Control value={defaultValues.qty} onChange={event => handleSelectValues(event, "qty")} required type="number" min="0" placeholder="Qty" aria-label="Quantity" aria-describedby="quantity"/>
					<Form.Control value={defaultValues.worth} onChange={event => handleSelectValues(event, "worth")} required placeholder="Worth" aria-label="worth" aria-describedby="worth"/>
					<Form.Control value={defaultValues.weight} onChange={event => handleSelectValues(event, "weight")} required placeholder="Weight" aria-label="Weight" aria-describedby="Weight"/>
				</InputGroup>
				<InputGroup>
					<Form.Select type="boolean" value={defaultValues.isEquipped} required aria-label="is-wearing" onChange={event => handleSelectValues(event, "isEquipped")}>
						<option value="">Is wearing?</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</Form.Select>
					<Button variant="success" aria-label="submit" type="submit">Submit</Button>
				</InputGroup>
			</Form>
		</Card>
	)
}
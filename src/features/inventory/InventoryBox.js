import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card'


import { InventoryTable } from './InventoryTable'
import { addItem, editItem, getClassStartingItems } from './InventorySlice';
import { InventoryAdd } from './InventoryAdd';
import { ItemList } from './ItemList';

var _ = require('lodash')

export const InventoryBox = (props) => {
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.inventory)

	//dispatch(getClassStartingItems())

	var itemTemplate = {
		filtered:true, 
		id: "", 
		name: "", 
		container: "",
		category: "",
		qty: "", 
		worth: "", 
		weight: "", 
		isEquipped: "",
		rarity: "",
		attunable: "",
		attuned: "",
		attuneRequirement: "",
		description: ""
	}

	const [editing, setEditing] = useState(false)
	const [defaultValues, setDefaultValues] = useState(itemTemplate)
	const [oldData, setOldData] = useState({})
	const [cardID, setCardID] = useState("0")
	const containers = useSelector(state => state.inventory.containers)
	
	const handleSubmit = (event) => {
		event.preventDefault()
		var data = defaultValues
		data["container"] = data.container.id
		//data["container"] = selectedType.value
		if(editing) {
			if (!_.isEqual(data, oldData)) {
				data.id = oldData.id
				dispatch(editItem(data))
				setEditing(false)
			}
			else {
				setEditing(false)
			}
		}
		else {
			dispatch(addItem(data))
		}
		setDefaultValues(itemTemplate)
	}
	const handleSelectValues = (event, id) => {
		let copy = structuredClone(defaultValues)
		let testValue
		if(id === "container") {
			testValue = event
		}
		else {
			testValue = event.target.value
		}
		if(testValue === "true") {
			testValue = true
		}
		else if(testValue === "false") {
			testValue = false
		}
		copy[id] = testValue
		setDefaultValues(copy)
	}
	
	return (
		<Card bg="secondary" id="Inventory">
			{containers.map((container, index) => (
				inventory.filter((item) => {return item.container === container.id}).length != 0 || index === 0 ? 
					<InventoryTable
						cardID={cardID}
						setCardID={setCardID}
						setOldData={setOldData} 
						setEditing={setEditing} 
						setDefaultValues={setDefaultValues} 
						key={index} 
						container={container} 
						bodies={inventory.filter((item) => {return item.container === container.id})}
					/> : null
			))}
			<InventoryAdd
				handleSubmit = {handleSubmit}
				editing = {editing}
				setEditing = {setEditing}
				defaultValues = {defaultValues}
				setDefaultValues = {setDefaultValues}
				handleSelectValues = {handleSelectValues}
				itemTemplate = {itemTemplate}
			/>
			<ItemList/>
		</Card>
	)
}
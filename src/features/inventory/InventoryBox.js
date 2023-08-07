import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { InventoryTable } from './InventoryTable'
import { addItem, editItem, updateMoney, getClassStartingItems } from './InventorySlice';
import { InventoryAdd } from './InventoryAdd';
import { ItemList } from './ItemList';
import { MoneyPouch } from '../../components/MoneyPouch';

const _ = require('lodash')

export const InventoryBox = (props) => {
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.inventory)
	const currency = useSelector(state => state.inventory.currency)

	//dispatch(getClassStartingItems())

	let itemTemplate = {
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
		description: [""]
	}

	const [showItemList, setShowItemList] = useState(false)
	const [showAddItem, setShowAddItem] = useState(false)
	const [showQuickAddItem, setShowQuickAddItem] = useState(false)
	const [editing, setEditing] = useState(false)
	const [defaultValues, setDefaultValues] = useState(itemTemplate)
	const [oldData, setOldData] = useState({})
	const [cardID, setCardID] = useState("0")
	const containers = useSelector(state => state.inventory.containers)
	
	const handleSubmit = (event) => {
		event.preventDefault()
		let data = defaultValues
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
	const changeEditing = (editChange) => {
		setEditing(editChange)
		setShowQuickAddItem(editChange)
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
		if(id==="description") {
			testValue = [testValue]
		}
		copy[id] = testValue
		setDefaultValues(copy)
	}
	const handleCounter = (event, id, currency) => {
		if(id === "change") {
			console.log(currency)
		}
		else {
			dispatch(updateMoney([id, currency]))
		}
	}
	const currencies_shortnames = {platinum:"pt", electrum:"ep", gold:"gp", silver:"sp", copper:"cp"}
	return (
		<Card bg="secondary" id="Inventory">
			<div>
				<MoneyPouch moneyPouch={currency} currencies_shortnames={currencies_shortnames} handleCounter={handleCounter}/>
			</div>
			{containers.map((container, index) => (
				inventory.filter((item) => {return item.container === container.id}).length != 0 || index === 0 ? 
					<InventoryTable
						cardID={cardID}
						setCardID={setCardID}
						setOldData={setOldData} 
						changeEditing={changeEditing} 
						setDefaultValues={setDefaultValues} 
						key={`inventory-table-${container.value}`} 
						container={container} 
						bodies={inventory.filter((item) => {return item.container === container.id})}
					/> : null
			))}
			<ButtonGroup>
				<Button onClick={(event) => (setShowAddItem(!showAddItem))}>Add Item</Button>
				<Button onClick={(event) => (setShowQuickAddItem(!showQuickAddItem))}>Quick Add Item</Button>
				<Button onClick={(event) => (setShowItemList(!showItemList))}>Browse Item List</Button>
			</ButtonGroup>
			<ItemList inheritShow={showItemList} setInheritShow={setShowItemList}/>
			<InventoryAdd
				handleSubmit = {handleSubmit}
				editing = {editing}
				setEditing = {setEditing}
				defaultValues = {defaultValues}
				setDefaultValues = {setDefaultValues}
				handleSelectValues = {handleSelectValues}
				itemTemplate = {itemTemplate}

				showAddItem={showAddItem}
				setShowAddItem={setShowAddItem}
				showQuickAddItem={showQuickAddItem}
				setShowQuickAddItem={setShowQuickAddItem}
			/>
		</Card>
	)
}
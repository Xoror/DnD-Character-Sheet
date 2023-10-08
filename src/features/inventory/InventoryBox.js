import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';

import { InventoryTable } from './InventoryTable'
import { addItem, editItem, updateMoney, getClassStartingItems, editContainer, addContainer } from './InventorySlice';
import { InventoryAdd } from './InventoryAdd';
import { ContainerAdd } from './ContainerAdd';
import { ItemList } from './ItemList';
import { MoneyPouch } from '../../components/MoneyPouch';
import { useFocus } from '../../components/CustomHooks';

const _ = require('lodash')

export const InventoryBox = (props) => {
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.inventory)
	const currency = useSelector(state => state.inventory.currency)
	const [inputRef, setInputFocus] = useFocus()

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
	let containerTemplate = {id: "", value: "", label: "", weight:0, containsWeight:0, maxWeightIn:0}

    const handleContainerSelectValues = (event, id) => {
		let copy = structuredClone(defaultContainerValues)
		if(id === "weight") {
			copy[id] = parseFloat(event.target.value)
		}
		else if(id === "maxWeightIn") {
			copy[id] = parseFloat(event.target.value)
		}
		else {
			copy[id] = event.target.value
		}
		setDefaultContainerValues(copy)
	}

	const [showItemList, setShowItemList] = useState(false)
	const [showAddItem, setShowAddItem] = useState(false)
	const [showQuickAddItem, setShowQuickAddItem] = useState(false)
	const [showAddContainer, setShowAddContainer] = useState(false)

	const [editing, setEditing] = useState(false)
	const [containerEditing, setContainerEditing] = useState(false)

	const [defaultValues, setDefaultValues] = useState(itemTemplate)
	const [defaultContainerValues, setDefaultContainerValues] = useState(containerTemplate)

	const [oldData, setOldData] = useState({})
	const [cardID, setCardID] = useState("0")
	const containers = useSelector(state => state.inventory.containers)
	
	const handleContainerClick = (event, oldData1) => {
		event.preventDefault()
		if(containerEditing) {
			defaultContainerValues.id = oldData1.id
			dispatch(editContainer(defaultContainerValues))
			setContainerEditing(false)
		}
		else{
			defaultContainerValues["value"] = defaultContainerValues.label.toLowerCase()
			dispatch(addContainer(defaultContainerValues))
		}
		setDefaultContainerValues(containerTemplate)
	}
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
		let testValue = event.target.value

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
			false?<div>
				<MoneyPouch moneyPouch={currency} currenciesShortnames={currencies_shortnames} colors={["#E5E4E2", "#FFD700", "#F2E279", "#C0C0C0", "#B87333"]} handleCounter={handleCounter}/>
			</div>
			<div style={{marginLeft:"0.5em", marginRight:"0.5em"}}>
				<Table size="sm" style={{color:"white", border:"black"}}>
					{containers.map((container, index) => (
						<InventoryTable
							key={`inventory-contained-in-${container.value}-id-${container.id}`}
							index={index}
							containersLength={containers.length}
							cardID={cardID}
							setCardID={setCardID}
							setOldData={setOldData} 
							changeEditing={changeEditing}
							setContainerEditing={setContainerEditing}
							setShowAddContainer={setShowAddContainer}
							setDefaultValues={setDefaultValues}
							setDefaultContainerValues={setDefaultContainerValues}
							container={container} 
							bodies={inventory.filter((item) => {return item.container === container.id})}
							inputRef={inputRef}
							setInputFocus={setInputFocus}
						/>
					))}
				</Table>
			</div>
			<Button 
				style={{width:"fit-content", marginBottom:"0.75em", marginRight:"auto", marginLeft:"auto"}}
				onClick={event => setShowAddContainer(true)}
			>Add Container</Button>
			<ContainerAdd 
				containerTemplate={containerTemplate}
				showAddContainer={showAddContainer} 
				setShowAddContainer={setShowAddContainer}
				defaultContainerValues={defaultContainerValues}
				setDefaultContainerValues={setDefaultContainerValues}
				containerEditing={containerEditing}
				setContainerEditing={setContainerEditing}
				handleContainerSelectValues={handleContainerSelectValues}
				handleContainerClick={handleContainerClick}
			/>
			
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
				inputRef={inputRef}

				showAddItem={showAddItem}
				setShowAddItem={setShowAddItem}
				showQuickAddItem={showQuickAddItem}
				setShowQuickAddItem={setShowQuickAddItem}
			/>
		</Card>
	)
}
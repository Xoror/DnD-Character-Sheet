import React, { useState, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { ActionsTable } from "./ActionsTable"
import { addAction, editAction } from './ActionsSlice';
import { ActionsAdd } from './ActionsAdd';
import { SpellList } from './SpellList';
import { useFocus } from '../../components/CustomHooks';

const _ = require('lodash')

const isEqualsJson = (obj1,obj2)=>{
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}


export const ActionsBox = (props) => {
	const dispatch = useDispatch()
	let actionTemplate = props.id === "Spells" ? 
		{
			showCard:false,
			filtered:true, 
			id: "", 
			name: "", 
			range: "", 
			damage: "", 
			type: "", 
			scaling: "", 
			isPrepared: false, 
			damageType: "", 
			description: "", 
			school: "", 
			ritual: "", 
			classes: "", 
			components: "",
			duration: "", 
			castingTime: ""
		} : 
		{
			id: "", 
			name: "", 
			range: "", 
			damage: "", 
			type: "", 
			scaling: "", 
			isProficient: "", 
			damageType: "", 
			description: ""
		}
	const actions = useSelector(state => state.actions.actions)
	const sortedSpellList = useSelector(state => state.actions.sortedSpellList)

	const [showSpellList, setShowSpellList] = useState(false)
	const [showAddAction, setShowAddAction] = useState(false)
	const [showQuickAddAction, setShowQuickAddAction] = useState(false)
	const [defaultValues, setDefaultValues] = useState(actionTemplate)
	const [oldData, setOldData] = useState({})
	const [editing, setEditing] = useState(false)
	const [show, setShow] = useState(false);
	const [cardID, setCardID] = useState("0")
	const [inputRef, setInputFocus] = useFocus()

	//could maybe be more efficient?
	const handleSubmit = (event) => {
		event.preventDefault()
		let data = defaultValues
		let sameName = false
		if(editing) {
			if (!_.isEqual(data, oldData)) {
				data.id = oldData.id
				dispatch(editAction(data, props.id, oldData.name))
				setEditing(false)
			}
			else {
				setEditing(false)
			}
		}
		else {
			if(actions.filter(action => {return action.name === event.target[0].value}).length != 0 || sortedSpellList.filter(action => {return action.name === event.target[0].value}).length != 0) {
				event.stopPropagation()
				setShow(true)
				setInputFocus()
				sameName = true
			}
			else {
				dispatch(addAction(data, props.id))
			}
		}
		if(!sameName) {
			setDefaultValues(actionTemplate)
			setShow(false)
			setShowAddAction(false)
		}
	}
	const handleSelectValues = (event, id) => {
		let copy = structuredClone(defaultValues)
		copy[id] = event.target.value
		setDefaultValues(copy)
	}
	//<FloatingLabel label="Name" style={{color:"black"}}>
	return (
		<Card bg="secondary" id="ActionsPart">
			{props.headers.map((header, index) => (
				<ActionsTable 
					cardID={cardID}
					setCardID={setCardID}
					setOldData={setOldData} 
					setEditing={setEditing}
					setShowQuickAddAction={setShowQuickAddAction}
					setDefaultValues={setDefaultValues} 
					offCanvas={props.offCanvas} 
					id={props.id} 
					key={`actions-table-${header}`} 
					header={header} 
					bodies={props.actions.filter((action) => {return action.type === header})} 
					spells={props.spells}
				/>
			))}
			<ButtonGroup>
				<Button onClick={(event) => (setShowAddAction(!showAddAction))}>Add {props.id === "Spells" ? "Spell" : "Action"}</Button>
				<Button onClick={(event) => (setShowQuickAddAction(!showQuickAddAction))}>Quick Add {props.id === "Spells" ? "Spell" : "Action"}</Button>
				{props.id === "Spells" ? <Button onClick={(event) => (setShowSpellList(!showSpellList))}>Browse Spell List</Button> : null}
			</ButtonGroup>
			{props.id === "Spells" ? <SpellList inheritShow={showSpellList} setInheritShow={setShowSpellList} /> : "" }
			<ActionsAdd 
				show={show} 
				editing={editing} 
				setEditing={setEditing} 
				defaultValues={defaultValues} 
				setDefaultValues={setDefaultValues} 
				inputRef={inputRef} 
				spells={props.spells} 
				actionTemplate={actionTemplate} 
				handleSubmit={handleSubmit} 
				handleSelectValues={handleSelectValues} 
				options={props.options}

				showAddAction={showAddAction}
				setShowAddAction={setShowAddAction}
				showQuickAddAction={showQuickAddAction}
				setShowQuickAddAction={setShowQuickAddAction}
			/>
		</Card>
	)
}